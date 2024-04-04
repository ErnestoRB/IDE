pub mod state;

use std::{
    io::Read,
    process::Command,
    str::from_utf8,
    sync::{Arc, RwLock},
    thread::spawn,
};

use portable_pty::{native_pty_system, CommandBuilder, PtySize};
use tauri::{async_runtime::Mutex, command, Manager, State};

use crate::structures::Terminal;

use self::state::TerminalState;

#[command]
pub fn get_available_shells() -> Vec<String> {
    if cfg!(target_os = "windows") {
        return vec!["cmd.exe".to_string(), "powershell.exe".to_string()];
    } else {
        let output = Command::new("sh")
            .arg("-c")
            .arg("cat /etc/shells")
            .output()
            .expect("failed to execute process");
        let mut result: Vec<String> = Vec::new();
        if let Ok(text) = String::from_utf8(output.stdout) {
            for line in text.lines() {
                if line.starts_with("/") {
                    result.push(line.to_owned());
                }
            }
        }
        return result;
    }
}

#[command]
pub async fn resize_pty(
    id: u8,
    rows: u16,
    cols: u16,
    state: State<'_, TerminalState>,
) -> Result<(), String> {
    if let Some(terminal) = state.ptys.lock().await.get(&id) {
        let master = terminal.master.lock().await;
        master
            .resize(PtySize {
                rows,
                cols,
                ..Default::default()
            })
            .map_err(|e| e.to_string())
    } else {
        return Err("No shell to resize".to_string());
    }
}

#[command]
pub async fn write_tty(
    id: u8,
    text: String,
    state: State<'_, TerminalState>,
) -> Result<(), String> {
    if let Some(terminal) = state.ptys.lock().await.get(&id) {
        let mut writer = terminal.writer.lock().await;
        writer
            .write_fmt(format_args!("{}", text))
            .map_err(|e| e.to_string())
    } else {
        return Err("No shell to write to".to_string());
    }
}

#[command]
pub async fn kill_shell(id: u8, state: State<'_, TerminalState>) -> Result<(), String> {
    if let Some(terminal) = state.ptys.lock().await.get(&id) {
        println!("Trying to kill shell");
        let mut mutex = terminal.killer.lock().await;
        let killer = mutex.as_mut();
        let result = killer.kill().map_err(|e| e.to_string());
        result
    } else {
        return Err("No shell to kill".to_string());
    }
}

#[command]
pub async fn create_shell(
    shell: String,
    state: State<'_, TerminalState>,
    app_handle: tauri::AppHandle,
) -> Result<u8, String> {
    // Use the native pty implementation for the system
    let pty_system = native_pty_system();

    // Create a new pty
    match pty_system.openpty(PtySize {
        rows: 24,
        cols: 80,
        // Not all systems support pixel_width, pixel_height,
        // but it is good practice to set it to something
        // that matches the size of the selected font.  That
        // is more complex than can be shown here in this
        // brief example though!
        pixel_width: 0,
        pixel_height: 0,
    }) {
        Ok(pair) => {
            let slave = pair.slave;
            // Create a new pty
            // Spawn a shell into the pty
            let shell: Vec<&str> = shell.split(" ").collect();
            let mut cmd = CommandBuilder::new(shell[0]);
            #[cfg(target_os = "windows")]
            cmd.env("TERM", "cygwin");
            #[cfg(not(target_os = "windows"))]
            cmd.env("TERM", "xterm-256color");
            let mut child = slave.spawn_command(cmd).map_err(|e| e.to_string())?;

            let writer = pair.master.take_writer().unwrap();
            let mut reader = pair.master.try_clone_reader().unwrap();
            let terminal = Terminal {
                killer: Mutex::new(child.clone_killer()),
                master: Mutex::new(pair.master),
                slave: Mutex::new(slave),
                writer: Mutex::new(writer),
            };

            let mut created = state.created.lock().await;

            *created += 1;

            let mut hash = state.ptys.lock().await;
            hash.insert(*created, terminal);

            let id = created.clone();
            let hash = state.ptys.clone();
            let app_handle_1 = app_handle.to_owned();
            let alive = Arc::new(RwLock::new(true));
            let alive_writer = alive.clone();
            spawn(move || {
                // reader
                let mut buffer: Vec<u8> = vec![0u8; 1024];
                let event = format!("tty-{}", id);

                while *alive.read().unwrap() {
                    if let Ok(bytes) = reader.read(&mut buffer) {
                        match from_utf8(&buffer[0..bytes]) {
                            Ok(text) => {
                                println!("Data {} sent", text);
                                let _ = app_handle.clone().emit_all(&event, text);
                            }
                            Err(e) => println!("Error during terminal reading: {}", e),
                        };
                    }
                }
                println!("No more emits");
            });
            spawn(move || -> Result<(), ()> {
                // wait for end
                let status = child.wait().unwrap();
                let mut alive_writer = alive_writer.write().unwrap();
                *alive_writer = false;
                hash.blocking_lock().remove(&id);
                let event = format!("tty-exit-{}", id);
                app_handle_1.to_owned().emit_all(&event, status.exit_code());
                println!("Child exited");
                Ok(())
            });

            Ok(*created)
        }
        Err(_) => Err("Error creating the pseudoterminal".to_string()),
    }
}

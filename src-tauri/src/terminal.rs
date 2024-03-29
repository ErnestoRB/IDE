pub mod state;

use std::thread::spawn;

use portable_pty::{native_pty_system, CommandBuilder, PtyPair, PtySize};
use tauri::{command, Manager, State};

use self::state::TerminalState;

pub fn create_pty() -> Result<PtyPair, String> {
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
        Ok(pair) => Ok(pair),
        Err(_) => Err("Error creating the pseudoterminal".to_string()),
    }
}

#[command]
pub fn resize_pty(rows: u16, cols: u16, state: State<'_, TerminalState>) -> Result<(), ()> {
    state
        .pty
        .master
        .lock()
        .unwrap()
        .resize(PtySize {
            rows,
            cols,
            ..Default::default()
        })
        .map_err(|_| ())
}

#[command]
pub fn write_pty(text: String, ptys: State<TerminalState>) -> Result<(), String> {
    if !*ptys.is_running.lock().unwrap() {
        return Ok(());
    }
    let mut writer = ptys.pty.writer.lock().unwrap();
    writer
        .write_fmt(format_args!("{}", text))
        .map_err(|e| e.to_string())
}

#[command]
pub fn kill_shell(ptys: State<TerminalState>) -> Result<(), String> {
    let mut guard = ptys.child_killer.lock().unwrap();
    if let Some(child) = guard.as_mut() {
        println!("Trying to kill shell");
        let result = child.kill().map_err(|e| e.to_string());
        *guard = None;
        result
    } else {
        return Err("No shell to kill".to_string());
    }
}

#[command]
pub fn create_shell(
    ptys: State<TerminalState>,
    app_handle: tauri::AppHandle,
) -> Result<(), String> {
    if *ptys.is_running.lock().unwrap() {
        return Err("A shell is already created".to_string());
    }
    let slave = ptys.pty.slave.lock().unwrap();
    // Create a new pty
    // Spawn a shell into the pty
    #[cfg(target_os = "windows")]
    let mut cmd = CommandBuilder::new("powershell.exe");
    #[cfg(target_os = "windows")]
    cmd.env("TERM", "cygwin");
    #[cfg(not(target_os = "windows"))]
    let mut cmd = CommandBuilder::new("bash");
    #[cfg(not(target_os = "windows"))]
    cmd.env("TERM", "xterm-256color");
    let mut child = slave.spawn_command(cmd).map_err(|e| e.to_string())?;

    ptys.child_killer
        .lock()
        .unwrap()
        .insert(child.clone_killer());
    *ptys.is_running.lock().unwrap() = true;
    let is_running_mutex = ptys.is_running.clone();
    spawn(move || -> Result<(), ()> {
        let status = child.wait().unwrap();
        *is_running_mutex.lock().unwrap() = false;
        app_handle
            .clone()
            .emit_all("shell-exit", status.exit_code());
        Ok(())
    });

    Ok(())
}

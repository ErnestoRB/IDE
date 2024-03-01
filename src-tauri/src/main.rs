// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use tauri::{CustomMenuItem, Manager, Menu, Submenu};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn main() {
    let quit = CustomMenuItem::new("quit".to_string(), "Quit");
    let close = CustomMenuItem::new("close".to_string(), "Close");
    let open = CustomMenuItem::new("open_file".to_string(), "Open");
    let save = CustomMenuItem::new("save_file".to_string(), "Save");
    let save_as = CustomMenuItem::new("save_file_as".to_string(), "Save As");

    let file_sub = Submenu::new(
        "File",
        Menu::new()
            .add_item(open)
            .add_item(save)
            .add_item(save_as)
            .add_item(close),
    );

    let lexico = CustomMenuItem::new("lexico".to_string(), "Lexico");
    let sintactico = CustomMenuItem::new("sintactico".to_string(), "Sintactico");
    let semantico = CustomMenuItem::new("semantico".to_string(), "Semantico");
    let build = CustomMenuItem::new("build".to_string(), "Build");
    let build_sub = Submenu::new(
        "Build and debug",
        Menu::new()
            .add_item(build)
            .add_item(lexico)
            .add_item(sintactico)
            .add_item(semantico),
    );

    let edit_sub = Submenu::new("Editar", Menu::new());
    let menu = Menu::new()
        .add_submenu(Submenu::new("", Menu::new().add_item(quit)))
        .add_submenu(file_sub)
        .add_submenu(edit_sub)
        .add_submenu(build_sub);
    tauri::Builder::default()
        .setup(|app| {
            #[cfg(debug_assertions)] // only include this code on debug builds
            {
                let window = app.get_window("main").unwrap();
                window.open_devtools();
                window.close_devtools();
            }
            Ok(())
        })
        .menu(menu)
        .on_menu_event(|event| match event.menu_item_id() {
            "quit" => {
                std::process::exit(0);
            }
            "close" => {
                event.window().close().unwrap();
            }
            _ => {}
        })
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

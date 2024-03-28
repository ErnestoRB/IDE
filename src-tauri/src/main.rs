// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use std::env::Vars;

use scanner::tokenize;
use tauri::{CustomMenuItem, Manager, Menu, MenuItem, Submenu};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn get_env(name: &str) -> String {
    std::env::var(String::from(name)).unwrap_or(String::from(""))
}
#[tauri::command]
fn get_envs() -> Vec<(String, String)> {
    let mut vars: Vec<(String, String)> = vec![];
    for (key, value) in std::env::vars() {
        vars.push((key, value));
    }
    vars
}

#[tauri::command]
fn vainilla_tokenize(contents: String) -> (Vec<scanner::data::Token>, Vec<scanner::data::Error>) {
    tokenize(&contents[..])
}

fn main() {
    let close = CustomMenuItem::new("close".to_string(), "Close");
    let close_file = CustomMenuItem::new("close_file".to_string(), "Close file");
    let open = CustomMenuItem::new("open_file".to_string(), "Open").accelerator("CmdOrControl+O");
    let save = CustomMenuItem::new("save_file".to_string(), "Save").accelerator("CmdOrControl+S");
    let save_as = CustomMenuItem::new("save_file_as".to_string(), "Save As")
        .accelerator("CmdOrControl+Shift+S");

    let file_sub = Submenu::new(
        "File",
        Menu::new()
            .add_item(open)
            .add_item(save)
            .add_item(save_as)
            .add_item(close_file),
    );

    let edit_sub = Submenu::new(
        "Edit",
        Menu::new()
            .add_native_item(MenuItem::Paste)
            .add_native_item(MenuItem::Copy)
            .add_native_item(MenuItem::Cut),
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

    let toggle_nav = CustomMenuItem::new("toggle_nav", "Toggle nav").accelerator("CmdOrControl+H");

    let view_menu = Submenu::new("View", Menu::new().add_item(toggle_nav));

    let default_menu = Menu::new().add_native_item(MenuItem::Quit).add_item(close);
    let menu = Menu::new()
        .add_submenu(Submenu::new("", default_menu))
        .add_submenu(file_sub)
        .add_submenu(edit_sub)
        .add_submenu(view_menu)
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
        .invoke_handler(tauri::generate_handler![
            greet,
            get_env,
            get_envs,
            vainilla_tokenize
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

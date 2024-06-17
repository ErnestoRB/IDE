use parser::structures::ParseError;
use scanner::data::Error as ScanError;
use serde::{Deserialize, Serialize};
use std::io::Write;
use tauri::async_runtime::Mutex as AsyncMutex;

use portable_pty::{ChildKiller, MasterPty, SlavePty};
pub struct Terminal {
    pub slave: AsyncMutex<Box<dyn SlavePty + Send>>,
    pub master: AsyncMutex<Box<dyn MasterPty + Send>>,
    pub writer: AsyncMutex<Box<dyn Write + Send>>,
    pub killer: AsyncMutex<Box<dyn ChildKiller + Send + Sync>>,
}

#[derive(Serialize, Deserialize, Debug, Clone, PartialEq)]
pub enum CompilationError {
    Scan(Vec<ScanError>),
    Parse(Vec<ParseError>),
}

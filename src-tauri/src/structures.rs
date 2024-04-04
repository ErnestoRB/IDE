use std::io::Write;
use tauri::async_runtime::Mutex as AsyncMutex;

use portable_pty::{ChildKiller, MasterPty, SlavePty};
pub struct Terminal {
    pub slave: AsyncMutex<Box<dyn SlavePty + Send>>,
    pub master: AsyncMutex<Box<dyn MasterPty + Send>>,
    pub writer: AsyncMutex<Box<dyn Write + Send>>,
    pub killer: AsyncMutex<Box<dyn ChildKiller + Send + Sync>>,
}

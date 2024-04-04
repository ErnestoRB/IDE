use std::{collections::HashMap, sync::Arc};

use crate::structures::Terminal;
use tauri::async_runtime::Mutex as AsyncMutex;

pub struct TerminalState {
    pub ptys: Arc<AsyncMutex<HashMap<u8, Terminal>>>,
    pub created: AsyncMutex<u8>,
}

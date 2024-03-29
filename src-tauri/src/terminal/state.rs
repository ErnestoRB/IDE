use std::sync::{Arc, Mutex};

use portable_pty::{Child, ChildKiller};

use crate::structures::Terminal;

pub struct TerminalState {
    pub pty: Terminal,
    pub is_running: Arc<Mutex<bool>>,
    pub child_killer: Mutex<Option<Box<dyn ChildKiller + Send + Sync>>>,
}

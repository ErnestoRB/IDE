use std::{io::Write, sync::Mutex};

use portable_pty::{MasterPty, SlavePty};
pub struct Terminal {
    pub slave: Mutex<Box<dyn SlavePty + Send>>,
    pub master: Mutex<Box<dyn MasterPty + Send>>,
    pub writer: Mutex<Box<dyn Write + Send>>,
}

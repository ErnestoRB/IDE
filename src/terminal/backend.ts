import { invoke } from "@tauri-apps/api";

export const getDefaultShell = async (): Promise<string> => {
  return (await getAvailableShells())[0];
};

export const getAvailableShells = async (): Promise<string[]> => {
  return invoke(`get_available_shells`);
};

export const createShell = async (shell: string): Promise<number> => {
  return invoke("create_shell", { shell });
};

export const buildShellFunctions = (id: number) => {
  return {
    sendDataShell: async (data: string): Promise<void> => {
      return invoke(`write_tty`, { id, text: data });
    },
    resizePty: async (rows: number, cols: number): Promise<void> => {
      return invoke("resize_pty", { id, rows, cols });
    },
    killShell: async (): Promise<void> => {
      return invoke("kill_shell", { id });
    },
  };
};

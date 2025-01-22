import { invoke } from "@tauri-apps/api";
import { listen } from "@tauri-apps/api/event";
import { ITerminalItem } from "../stores/terminal";
import { TerminalComponent } from "./TerminalInstance";

export const getDefaultShell = async (): Promise<string> => {
  return (await getAvailableShells())[0];
};

export const getAvailableShells = async (): Promise<string[]> => {
  return invoke(`get_available_shells`);
};

export const createShell = async (shell: string): Promise<number> => {
  return invoke("create_shell", { shell });
};

export const createTerminalItem = async (shell: string) => {
  return createShell(shell).then((id) => {
    const functions = buildShellFunctions(id);
    const item: ITerminalItem = {
      shell,
      ttyId: id,
      ttyFunctions: functions,
      component: (
        <TerminalComponent ttyId={id} funcs={functions}></TerminalComponent>
      ),
    };
    return item;
  });
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
    listenExit: (callback: (code: number) => void) => {
      return listen(`tty-exit-${id}`, (e) => callback(e.payload as number));
    },
    listenTty: (callback: (data: string) => void) => {
      return listen(`tty-${id}`, (e) => callback(e.payload as string));
    },
  };
};

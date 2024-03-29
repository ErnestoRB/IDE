import { invoke, os, process } from "@tauri-apps/api";
import { Command } from "@tauri-apps/api/shell";
import { useTerminalStore } from "../stores/terminal";
import { getEnv, getEnvs } from "../utils/env";

const SHELLS: { [key: string]: string[] } = {
  linux: ["bash", "sh"],
  netbsd: ["bash", "sh"],
  openbsd: ["bash", "sh"],
  darwin: ["zsh", "bash", "sh"],
  solaris: ["bash", "sh"],
  win32: ["pwsh", "cmd"],
};

export const getDefaultShell = async (): Promise<string> => {
  return SHELLS[await os.platform()][0];
};

export const getAvailableShells = async (): Promise<string[]> => {
  return SHELLS[await os.platform()];
};

export const getShellCommand = async (): Promise<Command> => {
  const plataform = await os.platform();
  const executingShell = plataform == "win32" ? "cmd" : "sh";
  const realShell = useTerminalStore.getState().terminal!;
  const executingArgs = plataform == "win32" ? [realShell] : ["-c", realShell];
  const env = await getEnvs().then((envs) => Object.fromEntries(envs));
  console.log({ env });

  return new Command(executingShell, [], {});
};

export function isPrintable(key: string) {
  // Revisa si el código de la tecla está en el rango ASCII imprimible (32-126)
  return key.charCodeAt(0) >= 32 && key.charCodeAt(0) <= 126;
}

export const createShell = async (): Promise<void> => {
  return invoke("create_shell");
};

export const sendDataShell = async (data: string): Promise<void> => {
  return invoke("write_pty", { text: data });
};

export const resizePty = async (rows: number, cols: number): Promise<void> => {
  return invoke("resize_pty", { rows, cols });
};

export const killShell = async (): Promise<void> => {
  return invoke("kill_shell", {});
};

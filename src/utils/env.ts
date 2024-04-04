import { invoke } from "@tauri-apps/api";

export async function getEnv(name: string): Promise<string> {
  return await invoke<string>("get_env", { name });
}

export async function getEnvs(): Promise<[string, string][]> {
  return await invoke<[string, string][]>("get_envs");
}

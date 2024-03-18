import { invoke } from "@tauri-apps/api";

export function scanFile(string: String) {
  return invoke("vainilla_tokenize", { contents: string }).then((result) =>
    console.log(result)
  );
}

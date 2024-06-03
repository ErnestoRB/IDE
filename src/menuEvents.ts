import { appWindow } from "@tauri-apps/api/window";
import { open, save } from "@tauri-apps/api/dialog";
import { fs, path } from "@tauri-apps/api";
import { IFileContent, useFileStore } from "./stores/files";
import { writeTextFile } from "@tauri-apps/api/fs";
import { useEditor } from "./stores/editor";
import { useLayoutStore } from "./stores/layout";
import { scanFile } from "./build/scan";
import { parseFile } from "./build/parse";

export const openEditorFile = async () => {
  // Open a selection dialog for image files
  const selected = await open({
    multiple: false,
  });
  if (Array.isArray(selected)) {
    // user selected multiple files
  } else if (selected === null) {
    // user cancelled the selection
  } else {
    try {
      const content = await fs.readTextFile(selected);
      const file: IFileContent = {
        name: await path.basename(selected),
        path: selected,
        content,
      };
      console.log(file);

      useFileStore.setState({ files: [file] });
      useFileStore.setState({ activeFile: file });
    } catch (error) {
      console.log({ error });
    }
  }
};

export const saveEditorFileAs = async () => {
  const content = useEditor.getState().editor?.getValue() ?? "";

  const savePath = await save();
  if (savePath) {
    await writeTextFile(savePath, content);
    const file: IFileContent = {
      content,
      name: await path.basename(savePath),
      path: savePath,
    };
    useFileStore.setState({ activeFile: file, files: [file] });
  }
};

export const saveEditorFile = async () => {
  const file = useFileStore.getState().activeFile;
  if (!file) {
    await saveEditorFileAs();
    return;
  }
  const content = useEditor.getState().editor?.getValue() ?? "";
  await writeTextFile(file.path, content);
};

export const closeFile = async () => {
  useFileStore.setState({ activeFile: undefined, files: [] });
  useEditor.getState().editor?.setValue("");
};

export const lexico = async () => {
  try {
    const result = await scanFile(
      useEditor.getState().editor?.getValue() ?? ""
    );
    useFileStore.setState({ lexicoResult: result });
  } catch (error) {
    console.error(error);
  }
};

export const sintactico = async () => {
  try {
    const result = await parseFile(
      useEditor.getState().editor?.getValue() ?? ""
    );
    console.log(result);
    useFileStore.setState({ sintacticoResult: result });
  } catch (error) {
    console.error(error);
  }
};

//@ts-ignore
if (window.__TAURI_IPC__) {
  appWindow.onMenuClicked(async ({ payload: menuId }) => {
    switch (menuId) {
      case "open_file":
        await openEditorFile();
        break;
      case "save_file":
        await saveEditorFile();
        break;
      case "save_file_as":
        await saveEditorFileAs();
        break;
      case "close_file":
        await closeFile();
        break;
      case "toggle_nav":
        useLayoutStore.getState().toggleNavbar();
        break;
      case "lexico":
        await lexico();
        break;
      case "sintactico":
        await sintactico();
        break;
    }
  });
}

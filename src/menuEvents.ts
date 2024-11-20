import { appWindow } from "@tauri-apps/api/window";
import { open, save } from "@tauri-apps/api/dialog";
import { fs, path } from "@tauri-apps/api";
import { IFileContent, useFileStore } from "./stores/files";
import { readDir, writeTextFile } from "@tauri-apps/api/fs";
import { useEditor } from "./stores/editor";
import { useLayoutStore } from "./stores/layout";
import { scanFile } from "./build/scan";
import { parseFile } from "./build/parse";
import { analyzeFile } from "./build/analyze";
import { codegenFile } from "./build/codegen";
import { run } from "./build/run";

export const openFolder = async () => {
  const path = await open({
    directory: true,
    multiple: false,
  });
  if (!path) return;
  useFileStore.getState().setFolder(path as string);
  const files = await readDir(path as string);
  const files_to_open = files.filter((f) => !f.children).map((f) => f.path);
  await openFiles(files_to_open);
};

export const openEditorFile = async () => {
  // Open a selection dialog for image files
  const selected = await open({
    multiple: true,
    recursive: true,
  });
  await openFiles(selected);
};

async function openFiles(selected: string[] | string | null) {
  if (selected === null) {
    // user cancelled the selection
  } else if (Array.isArray(selected)) {
    const files = selected.map(
      async (file) =>
        ({
          name: await path.basename(file),
          path: file,
          // no leer el contenido, que se lea solo cuando se seleccione
        } as IFileContent)
    );
    useFileStore.getState().setFiles(await Promise.all(files));
    // user selected multiple files
  } else {
    try {
      const content = await fs.readTextFile(selected);
      const file: IFileContent = {
        name: await path.basename(selected),
        path: selected,
        content,
      };
      // console.log(file);

      useFileStore.setState({ files: [file] });
      useFileStore.setState({ activeFile: file }); // leer y poner como activo
    } catch (error) {
      console.log({ error });
    }
  }
}

export const saveEditorFileAs = async () => {
  const content = useEditor.getState().editor?.getValue() ?? "";

  const savePath = await save({
    filters: [{ name: "CAT", extensions: ["cat"] }],
  });

  if (savePath) {
    const ext = savePath.split(".").pop();
    const newPath = ext
      ? savePath.replace(/\.[^/.]+$/, ".cat")
      : `${savePath}.cat`;
    await writeTextFile(newPath, content);
    const file: IFileContent = {
      content,
      name: await path.basename(newPath),
      path: newPath,
    };
    useFileStore.getState().setFiles([file]);
    useFileStore.getState().setActiveFile(newPath);
  }
};

export const saveEditorFile = async () => {
  const file = useFileStore.getState().activeFile;
  if (!file) {
    await saveEditorFileAs();
    return;
  }
  const content = file.content;
  if (!content) {
    console.error("No content to save");
    return;
  }
  await writeTextFile(file.path, content);
  useFileStore.getState().setFileOriginalContents(file.path, content);
};

export const closeFile = async () => {
  useFileStore.setState({
    activeFile: undefined,
    files: [],
    folder: undefined,
  });
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

export const semantico = async () => {
  try {
    const result = await analyzeFile(
      useEditor.getState().editor?.getValue() ?? ""
    );
    useFileStore.setState({ semanticoResult: result });
  } catch (error) {
    console.error(error);
  }
};

export const codigoIntermedio = async () => {
  try {
    const result = await codegenFile(true);
    useFileStore.setState({ generatedCode: result });
  } catch (error) {
    console.error(error);
  }
};

export const runProgram = async () => {
  try {
    run();
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
      case "semantico":
        await semantico();
        break;
      case "run":
        await semantico();
        break;
    }
  });
}

import { SideBar } from "./side/SideBar";
import { ResizablePanel } from "./ResizablePanel";
import { SideBarContent } from "./side/SideBarContent";
import { Editor } from "./editor/Editor";
import { useEffect } from "react";

const handleKeyPresses: (ev: KeyboardEvent) => any = (evt: KeyboardEvent) => {
  if (evt.ctrlKey) {
    if (evt.key == "j") {
      console.log("CTRL J");
    }
  }
};

function App() {
  useEffect(() => {
    document.addEventListener("keydown", (evt) => {
      handleKeyPresses(evt);
    });

    () => {
      document.removeEventListener("keydown", handleKeyPresses);
    };
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-1 bg-black w-full ">
        <SideBar></SideBar>
        <ResizablePanel>
          <SideBarContent></SideBarContent>
          <Editor></Editor>
        </ResizablePanel>
      </div>
      <div className=" bg-stone-900 h-5 w-full"></div>
    </div>
  );
}

export default App;

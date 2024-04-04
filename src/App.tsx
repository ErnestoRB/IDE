import { SideBar } from "./side/SideBar";
import { SideBarContent } from "./side/SideBarContent";
import { Editor } from "./editor/Editor";
import { useCallback, useEffect, useRef } from "react";
import { TerminalPanel } from "./terminal/TerminalPanel";
import { useLayoutStore } from "./stores/layout";
import { NavBar } from "./side/NavBar";

import {
  ImperativePanelHandle,
  Panel,
  PanelGroup,
  PanelResizeHandle,
} from "react-resizable-panels";
import { StatusBar } from "./StatusBar";
import { loader } from "@monaco-editor/react";
import { setupVainilla } from "./monaco/vainilla";
import { AppModal } from "./AppModal";
import { useTerminalStore } from "./stores/terminal";
import { getAvailableShells } from "./terminal/backend";
loader.init().then(setupVainilla);

function App() {
  const lateralRef = useRef<ImperativePanelHandle>(null);
  const terminalRef = useRef<ImperativePanelHandle>(null);
  const [setAvailableTerminals] = useTerminalStore((s) => [
    s.setAvailableTerminals,
  ]);
  const { setLateralPanelRef, setTerminalPanelRef, showNavbar } =
    useLayoutStore();

  const toggleTerminal = () => {
    const panel = terminalRef.current;
    if (!panel) {
      return;
    }
    if (panel) {
      if (panel.isCollapsed()) {
        panel.expand();
      } else {
        panel.collapse();
      }
    }
  };

  const keyHandler = useCallback((evt: KeyboardEvent) => {
    if (evt.ctrlKey) {
      if (evt.key == "j") {
        console.log("toggle");
        toggleTerminal();
      }
    }
  }, []);
  useEffect(() => {
    document.addEventListener("keydown", keyHandler);
    () => {
      document.removeEventListener("keydown", keyHandler);
    };
  }, [keyHandler]);

  useEffect(() => {
    setLateralPanelRef(lateralRef.current!);
    setTerminalPanelRef(terminalRef.current!);
    getAvailableShells().then((v) => {
      console.log({ v });
      setAvailableTerminals(v);
    });
  }, []);

  return (
    <div className="flex flex-col h-screen max-h-screen overflow-hidden select-none">
      <AppModal />
      {showNavbar && <NavBar></NavBar>}
      <div className="flex bg-black w-full h-full flex-initial">
        <SideBar></SideBar>
        <PanelGroup autoSaveId="lateral" direction="horizontal">
          <Panel
            collapsible
            defaultSize={20}
            minSize={12}
            maxSize={40}
            ref={lateralRef}
          >
            <SideBarContent></SideBarContent>
          </Panel>
          <PanelResizeHandle />
          <Panel>
            <PanelGroup autoSaveId="terminal" direction="vertical">
              <Panel minSize={10}>
                <Editor></Editor>
              </Panel>
              <PanelResizeHandle />
              <Panel minSize={20} collapsible ref={terminalRef}>
                <TerminalPanel></TerminalPanel>
              </Panel>
            </PanelGroup>
          </Panel>
          <PanelResizeHandle />
        </PanelGroup>
      </div>
      <StatusBar></StatusBar>
    </div>
  );
}

export default App;

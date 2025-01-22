import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { useTerminalStore } from "../../stores/terminal";
import "@xterm/xterm/css/xterm.css";
import { useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { Tab } from "@headlessui/react";
import { GoTerminal, GoTrash } from "react-icons/go";
import { createTerminalItem, getDefaultShell } from "../backend";
import { useVainillaTheme } from "../../theme";

export function TerminalContainer() {
  const theme = useVainillaTheme();
  const [shell, setDefaultShell] = useTerminalStore((s) => [
    s.shell,
    s.setDefaultShell,
  ]);
  const availableShells = useTerminalStore((s) => s.availableShells);
  const terminals = useTerminalStore((s) => s.terminals);
  const addTerminal = useTerminalStore((s) => s.appendTerminal);
  const removeTerminal = useTerminalStore((s) => s.removeTerminal);
  // const activeTerminal = useTerminalStore((s) => s.activeTerminal);
  const activeTerminalIndex = useTerminalStore((s) => s.activeTerminalIndex);
  const setActiveTerminal = useTerminalStore((s) => s.setActiveTerminal);
  const setActiveTerminalIndex = useTerminalStore(
    (s) => s.setActiveTerminalIndex
  );

  // useEffect(() => {
  //   console.log("Terminals changed", terminals);
  // }, [terminals]);

  useEffect(() => {
    if (useTerminalStore.getState().terminals.length > 0) return;
    // construir shell por defecto
    getDefaultShell().then((s) => {
      setDefaultShell(s);
      createTerminalItem(s).then((item) => {
        addTerminal(item);
        item.ttyFunctions
          .listenExit((code) => {
            console.log(`Terminal ${item.ttyId} killed with code ${code}`);
            removeTerminal(item.ttyId);
          })
          .then(() => {
            console.log(`Unlistening for exit on terminal ${item.ttyId}`);
          });
      });
    });
  }, []);

  return (
    <Tab.Group
      selectedIndex={activeTerminalIndex}
      onChange={(tab) => {
        setActiveTerminalIndex(tab);
        setActiveTerminal(terminals[tab]);
      }}
    >
      <div
        className={`w-full  h-full flex flex-col justify-end overflow-y-auto overflow-x-hidden ${theme.selectedTheme.definition.terminalPanel}`}
      >
        <div
          id="terminal-select"
          className="h-10 flex flex-shrink-0 items-center gap-x-2 px-2"
        >
          Shells disponibles:
          <div className="relative">
            <select
              onChange={(e) => {
                e.preventDefault();
                setDefaultShell(e.target.value);
              }}
              className={`appearance-none flex items-center p-2  pointer cursor-pointer rounded-sm outline-none hover:opacity-90 ${theme.selectedTheme.definition["primary-5"]}`}
            >
              {availableShells?.map((shell, i) => (
                <option key={i} value={shell} className={`${theme.selectedTheme.definition["primary-5"]} `}>
                  {shell}
                </option>
              ))}
            </select>
            
          </div>
          <button
            onClick={() => {
              createTerminalItem(shell!).then((item) => {
                addTerminal(item);
                item.ttyFunctions
                  .listenExit((code) => {
                    console.log(
                      `Terminal ${item.ttyId} killed with code ${code}`
                    );
                    removeTerminal(item.ttyId);
                  })
                  .then(() => {
                    console.log(
                      `Unlistening for exit on terminal ${item.ttyId}`
                    );
                  });
              });
            }}
          >
            <FaPlus></FaPlus>
          </button>
        </div>
        <PanelGroup
          className="w-full"
          autoSaveId="terminal"
          direction="horizontal"
        >
          <Panel minSize={50}>
            <Tab.Panels className="w-full h-full flex flex-1 overflow-clip">
              {terminals.map(({ component, ttyId }) => (
                <Tab.Panel
                  unmount={false}
                  key={ttyId}
                  className="w-full overflow-y-auto bg-white"
                >
                  {component}
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Panel>
          <PanelResizeHandle />
          <Panel minSize={10} maxSize={20}>
            <Tab.List
              as={"div"}
              className={`flex flex-col overflow-y-auto text-white flex-shrink-0 h-full ${theme.selectedTheme.definition["primary-4"]}`}
            >
              {terminals.map(({ shell, ttyId, ttyFunctions }) => (
                <Tab
                  as="div"
                  key={ttyId}
                  className={`text-sm flex flex-grow-0 max-h-full px-2 py-1 transition-all ${theme.selectedTheme.definition.terminalInstance}`}
                >
                  <div className="flex flex-wrap items-center gap-x-2 h-full w-full">
                    <GoTerminal></GoTerminal>
                    <span className="flex-1">{shell}</span>
                    <button
                      onClick={() => {
                        console.log(`Killing terminal ${ttyId}`);
                        ttyFunctions.killShell().then(() => {
                          console.log(`Killed terminal ${ttyId}`);
                          // const terminalIndex = terminals.findIndex(
                          //   (t) => t.ttyId == ttyId
                          // );
                          // const newTerminals = [...terminals];
                          // newTerminals.splice(terminalIndex, 1);

                          // setTerminals(newTerminals);
                          // const newActiveIndex = Math.min(0, terminalIndex - 1);
                          // setActiveTerminalIndex(newActiveIndex);
                          // setActiveTerminal(newTerminals[newActiveIndex]);
                        });
                      }}
                    >
                      <GoTrash></GoTrash>
                    </button>
                  </div>
                </Tab>
              ))}
              {terminals.length == 0 && (
                <span className="text-xs text-center mt-2">
                  No hay terminales disponibles
                </span>
              )}
            </Tab.List>
          </Panel>
        </PanelGroup>
      </div>
    </Tab.Group>
  );
}

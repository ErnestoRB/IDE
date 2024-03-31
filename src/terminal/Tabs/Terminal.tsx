import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { useTerminalStore } from "../../stores/terminal";
import "@xterm/xterm/css/xterm.css";
import { ReactNode, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { TerminalComponent } from "../TerminalInstance";
import { Listbox, Tab } from "@headlessui/react";
import { GoChevronDown, GoTerminal, GoTrash } from "react-icons/go";
import { getDefaultShell } from "../backend";

interface ITerminalItem {
  shell: string;
  component: ReactNode;
}

export function TerminalContainer() {
  const [terminal, setTerminal] = useTerminalStore((s) => [
    s.terminal,
    s.setTerminal,
  ]);
  const avaialbeTerminals = useTerminalStore((s) => s.availableTerminals);
  const [terminals, setTerminals] = useState<ITerminalItem[]>([]);

  useEffect(() => {
    getDefaultShell().then((s) => {
      setTerminal(s);
      setTerminals((t) => [
        ...t,
        {
          shell: s,
          component: <TerminalComponent shell={s}></TerminalComponent>,
        },
      ]);
    });
  }, []);

  return (
    <Tab.Group>
      <div className=" text-white w-full bg-stone-800 h-full flex flex-col justify-end overflow-y-auto overflow-x-hidden ">
        <div
          id="terminal-select"
          className="h-10 flex flex-shrink-0 items-center gap-x-2 px-2"
        >
          Shells disponibles:{" "}
          <div className="relative">
            <Listbox value={terminal} onChange={setTerminal}>
              <Listbox.Button className="flex items-center p-2 bg-stone-900 rounded-sm">
                {terminal}
                <GoChevronDown></GoChevronDown>
              </Listbox.Button>
              <Listbox.Options className="absolute z-10 bg-stone-800 backdrop-opacity-60 backdrop-blur-sm">
                {avaialbeTerminals?.map((shell, i) => (
                  <Listbox.Option
                    className="px-2 py-1 hover:bg-stone-700 ui-selected:border-l-2  ui-not-selected:border-none border-white"
                    key={i}
                    value={shell}
                  >
                    {shell}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Listbox>
          </div>
          <button
            onClick={() => {
              const terminalItem = {
                shell: terminal!,
                component: (
                  <TerminalComponent shell={terminal!}></TerminalComponent>
                ),
              };

              setTerminals((t) => [...t, terminalItem]);
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
              {terminals.map(({ component }, i) => (
                <Tab.Panel
                  unmount={false}
                  key={i}
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
              className="flex flex-col overflow-y-auto bg-stone-900 text-white flex-shrink-0 h-full"
            >
              {terminals.map(({ shell }, i) => (
                <Tab
                  as="div"
                  key={i}
                  className="text-sm flex flex-grow-0 max-h-full px-2 py-1 ui-not-selected:border-none ui-selected:border-l-2 transition-all ui-selected:border-white"
                >
                  <div className="flex items-center gap-x-2 w-max h-full">
                    <GoTerminal></GoTerminal>
                    <span>{shell}</span>
                    <button
                      onClick={() => {
                        console.log(`Killing terminal ${i}`);

                        setTerminals((t) => {
                          t.splice(i, 1);
                          return [...t];
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

import { Tab } from "@headlessui/react";
import { Tabs } from "./TerminalTabs";
import { useDragScroll } from "../hooks/useDragScroll";
import { useLayoutStore } from "../stores/layout";

export function TerminalPanel() {
  const [ref] = useDragScroll();

  const activeTab = useLayoutStore((s) => s.activeTab);
  const setActiveTab = useLayoutStore((s) => s.setActiveTab);

  return (
    <div className="flex w-full h-full flex-col">
      <Tab.Group selectedIndex={activeTab} onChange={(e) => setActiveTab(e)}>
        <Tab.List
          as={"div"}
          ref={ref}
          className="flex overflow-x-scroll overflow-y-scroll scrollbar-hide bg-stone-800 text-white flex-shrink-0 h-12"
        >
          {Tabs.map(({ icon: Icon, name }, i) => (
            <Tab
              // onSelect={(e) => console.log(e)}
              key={i}
              className="text-sm flex flex-grow-0 max-h-full px-2 py-1 ui-selected:border-b-2 transition-all ui-selected:border-white"
            >
              <div className="flex items-center gap-x-2 w-max h-full">
                <Icon width={4} height={4}></Icon>
                <span>{name}</span>
              </div>
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="flex flex-1 overflow-auto">
          {Tabs.map(({ content }, i) => (
            <Tab.Panel key={i} className="w-full overflow-y-auto bg-white">
              {content}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

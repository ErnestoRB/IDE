import { Tab } from "@headlessui/react";
import { Tabs } from "./TerminalTabs";

export function TerminalPanel() {
  return (
    <div className="flex w-full bg-stone-00 h-full flex-col">
      <Tab.Group>
        <Tab.List className="flex bg-stone-800 text-white">
          {Tabs.map(({ icon: Icon, name }, i) => (
            <Tab
              key={i}
              className="flex items-center gap-2 px-2 py-1 ui-selected:border-b-2 transition-all ui-selected:border-white"
            >
              <Icon></Icon>
              {name}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="h-full w-full">
          {Tabs.map(({ content }, i) => (
            <Tab.Panel key={i} className="w-full h-full bg-white">
              {content}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

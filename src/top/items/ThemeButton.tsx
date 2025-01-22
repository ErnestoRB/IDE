import { Menu } from "@headlessui/react";
import { themes, useVainillaTheme } from "../../theme";
import { GoChevronDown } from "react-icons/go";

export function ThemeButton() {
  const theme = useVainillaTheme();

  return (
    <div className="flex ">
      <Menu as="div" className="relative">
        <Menu.Button
          className={`disabled:opacity-50 flex items-center gap-x-2 h-full bg-black ${theme.selectedTheme.definition.topBarButtons}`}
        >
          Tema: {theme.selectedTheme.name}
          <GoChevronDown></GoChevronDown>
        </Menu.Button>
        <Menu.Items
          className={`absolute top-10 left-0 z-10 grid gap-2 justify-center place-items-center ${theme.selectedTheme.definition.dropdown}`}
        >
          {themes.map((t) => (
            <Menu.Item>
              {({}) => (
                <button
                  onClick={() => {
                    theme.switchTheme(t.name);
                  }}
                  className={`${theme.selectedTheme.definition.dropdownItem} w-full h-full px-3 py-2 gap-4 place-items-center flex justify-between`}
                >
                  {t.name}
                </button>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Menu>
    </div>
  );
}

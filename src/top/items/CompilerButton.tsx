import { Menu } from "@headlessui/react";
import { BsPlayCircle } from "react-icons/bs";
import { BsAlphabetUppercase } from "react-icons/bs";
import { MdMenuBook } from "react-icons/md";
import { BsGear } from "react-icons/bs";
import { GoChevronDown } from "react-icons/go";
import {
  codigoIntermedio,
  lexico,
  runProgram,
  semantico,
  sintactico,
} from "../../menuEvents";
import { useFileStore } from "../../stores/files";
import { useVainillaTheme } from "../../theme";

export function CompilerButton() {
  const activeFile = useFileStore((s) => s.activeFile);
  const theme = useVainillaTheme();

  return (
    <div className="flex ">
      <button
        disabled={!activeFile}
        onClick={() => runProgram()}
        className={`grid place-items-center w-10 h-10 disabled:opacity-50 ${theme.selectedTheme.definition.topBarButtons}`}
      >
        <BsPlayCircle size={20} />
      </button>
      <Menu as="div" className="relative">
        <Menu.Button
          disabled={!activeFile}
          className={`disabled:opacity-50 grid place-items-center h-full bg-black ${theme.selectedTheme.definition.topBarButtons}`}
        >
          <GoChevronDown></GoChevronDown>
        </Menu.Button>
        <Menu.Items
          className={`absolute top-10 left-0 z-10 grid gap-2 justify-center place-items-center ${theme.selectedTheme.definition.dropdown}`}
        >
          <Menu.Item>
            {({}) => (
              <button
                onClick={lexico}
                className={`${theme.selectedTheme.definition.dropdownItem} w-full h-full px-3 py-2 gap-4 place-items-center flex justify-between`}
              >
                Léxico <BsAlphabetUppercase />
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({}) => (
              <button
                onClick={sintactico}
                className={`${theme.selectedTheme.definition.dropdownItem} w-full h-full px-3 py-2 gap-4 place-items-center flex justify-between`}
              >
                Sintático <BsGear />
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({}) => (
              <button
                onClick={semantico}
                className={`${theme.selectedTheme.definition.dropdownItem} w-full h-full px-3 py-2 gap-4 place-items-center flex justify-between`}
              >
                Semántico <MdMenuBook />
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({}) => (
              <button
                onClick={codigoIntermedio}
                className={`${theme.selectedTheme.definition.dropdownItem} w-full h-full px-3 py-2 gap-4 place-items-center flex justify-between`}
              >
                Generación de código
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Menu>
    </div>
  );
}

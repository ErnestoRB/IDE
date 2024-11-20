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

export function CompilerButton() {
  const activeFile = useFileStore((s) => s.activeFile);

  return (
    <div className="flex text-white bg-stone-900 hover:bg-black">
      <button
        disabled={!activeFile}
        onClick={() => runProgram()}
        className="grid place-items-center w-10 h-10 disabled:opacity-50"
      >
        <BsPlayCircle size={20} />
      </button>
      <Menu as="div" className="relative">
        <Menu.Button
          disabled={!activeFile}
          className="disabled:opacity-50 grid place-items-center h-full bg-black"
        >
          <GoChevronDown></GoChevronDown>
        </Menu.Button>
        <Menu.Items className="absolute top-10 left-0 z-10 grid gap-2 justify-center place-items-center text-white bg-stone-900">
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={lexico}
                className={`${
                  active && "hover:bg-black"
                } w-full h-full px-3 py-2 gap-4 place-items-center flex justify-between`}
              >
                Léxico <BsAlphabetUppercase />
              </button>
            )}
          </Menu.Item>{" "}
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={sintactico}
                className={`${
                  active && "hover:bg-black"
                } w-full h-full px-3 py-2 gap-4 place-items-center flex justify-between`}
              >
                Sintático <BsGear />
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={semantico}
                className={`${
                  active && "hover:bg-black"
                } w-full h-full px-3 py-2 gap-4 place-items-center flex justify-between`}
              >
                Semántico <MdMenuBook />
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={codigoIntermedio}
                className={`${
                  active && "hover:bg-black"
                } w-full h-full px-3 py-2 gap-4 place-items-center flex justify-between`}
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

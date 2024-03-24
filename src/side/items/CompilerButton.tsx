import { Menu } from "@headlessui/react";
import { BsPlayCircle } from "react-icons/bs";
import { BsAlphabetUppercase } from "react-icons/bs";
import { MdMenuBook } from "react-icons/md";
import { BsGear } from "react-icons/bs";
import { GoChevronDown } from "react-icons/go";
import { lexico } from "../../menuEvents";

export function CompilerButton() {
  return (
    <div className="flex text-white bg-stone-900 hover:bg-black">
      <button className="grid place-items-center w-10 h-10">
        <BsPlayCircle size={20} />
      </button>
      <Menu as="div" className="relative">
        <Menu.Button className="grid place-items-center h-full bg-black">
          <GoChevronDown></GoChevronDown>
        </Menu.Button>
        <Menu.Items className="absolute top-10 left-0 z-10 grid gap-2 justify-center place-items-center text-white bg-stone-900">
          <Menu.Item>
            {({ active }) => (
              <a
                className={`${
                  active && "hover:bg-black"
                } w-full h-full px-3 py-2 gap-4 place-items-center flex justify-between`}
              >
                Sintático <BsGear />
              </a>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <a
                className={`${
                  active && "hover:bg-black"
                } w-full h-full px-3 py-2 gap-4 place-items-center flex justify-between`}
              >
                Semántico <MdMenuBook />
              </a>
            )}
          </Menu.Item>
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
          </Menu.Item> 
        </Menu.Items>
      </Menu>
    </div>
  );
}

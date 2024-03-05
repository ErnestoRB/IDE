import { Menu } from '@headlessui/react';
import { BsPlayCircle } from 'react-icons/bs';
import { BsAlphabetUppercase } from "react-icons/bs";
import { MdMenuBook } from "react-icons/md";
import { BsGear } from "react-icons/bs";

export function CompilerButton() {
  return (
    <Menu as="div" className="relative">
      <Menu.Button className="w-10 h-10 grid place-items-center text-white bg-stone-900 hover:bg-black">
        <BsPlayCircle size={20} />
      </Menu.Button>
      <Menu.Items className="absolute top-10 left-0 z-10 grid gap-2 justify-center place-items-center text-white bg-stone-900">
        <Menu.Item>
          {({ active }) => (
            <a
              className={`${active && 'hover:bg-black'} w-full h-full px-3 py-2 gap-4 place-items-center flex justify-between`}
              href=""
            >
              Sintático <BsGear />
            </a>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <a
              className={`${active && 'hover:bg-black'} w-full h-full px-3 py-2 gap-4 place-items-center flex justify-between`}
              href=""
            >
              Semántico <MdMenuBook />
            </a>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <a
            className={`${active && 'hover:bg-black'} w-full h-full px-3 py-2 gap-4 place-items-center flex justify-between`}
              href=""
            >
              Léxico <BsAlphabetUppercase />
            </a>
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
}

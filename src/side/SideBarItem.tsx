import { IconType } from "react-icons";

interface ISideBarItem {
  onClick?: () => any;
  icon: IconType;
}

export function SideBarItem({ onClick = () => {}, icon: Icon }: ISideBarItem) {
  return (
    <button
      className="w-14 h-14 grid place-items-center text-white bg-stone-900 hover:bg-stone-950"
      onClick={onClick}
    >
      <Icon />
    </button>
  );
}

import { IconType } from "react-icons";
import { useLayoutStore } from "../stores/layout";

interface ISideBarItem {
  onClick?: () => any;
  icon: IconType;
}

export function SideBarItem({ onClick = () => {}, icon: Icon }: ISideBarItem) {
  const panel = useLayoutStore((s) => s.lateralPanelRef);

  return (
    <button
      className="w-14 h-14 grid place-items-center text-white bg-stone-950 hover:bg-black"
      onClick={() => {
        if (panel) {
          if (panel.isCollapsed()) {
            panel.expand();
          } else {
            panel.collapse();
          }
        }
        onClick?.();
      }}
    >
      <Icon />
    </button>
  );
}

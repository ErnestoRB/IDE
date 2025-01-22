import { IconType } from "react-icons";
import { useLayoutStore } from "../stores/layout";
import { useVainillaTheme } from "../theme";

interface ISideBarItem {
  onClick?: () => any;
  icon: IconType;
}

export function SideBarItem({ onClick = () => {}, icon: Icon }: ISideBarItem) {
  const panel = useLayoutStore((s) => s.lateralPanelRef);

  const theme = useVainillaTheme()
  return (
    <button
      className={`w-14 h-14 grid place-items-center ${theme.selectedTheme.definition["text"]} ${theme.selectedTheme.definition.sidebarButtons} `}
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

import { useVainillaTheme } from "../theme";

export interface TopBarButtonProps {
  icon: React.ReactNode;
  onClick?: () => unknown;
  title: string;
}

export function TopBarButton({ icon, title, onClick }: TopBarButtonProps) {
  const theme = useVainillaTheme();
  return (
    <button
      className={`w-10 h-10 grid place-items-center text-white ${theme.selectedTheme.definition.topBarButtons} `}
      onClick={onClick}
      title={title}
    >
      {icon}
    </button>
  );
}

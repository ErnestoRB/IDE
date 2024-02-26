interface ISideBarContentProps {
  show?: boolean;
}

export function SideBarContent({ show = true }: ISideBarContentProps) {
  return <div className="w-full h-full bg-stone-700"></div>;
}

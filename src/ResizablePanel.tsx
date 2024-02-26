import { useEffect } from "react";
import { UseResizableProps, useResizable } from "react-resizable-layout";
import { useLayoutStore } from "./stores/layout";

interface IResizablePanelProps {
  children: React.ReactNode[];
}

export function ResizablePanel({ children }: IResizablePanelProps) {
  const props: UseResizableProps = {
    axis: "x",
    initial: 200,
    min: 100,
    max: 500,
  };
  const { showLateral, toggleLateral } = useLayoutStore();

  const { position, separatorProps, isDragging, setPosition } =
    useResizable(props);

  useEffect(() => {
    if (position == 100 && showLateral) {
      toggleLateral();
      setPosition(200);
    }
  }, [position, showLateral]);

  if (children.length < 2) {
    return null;
  }

  return (
    <div
      id="wrapper"
      className={`flex-1 relative ${
        isDragging ? "cursor-e-resize" : "cursor-default"
      } flex h-full max-w-full overflow-hidden`}
    >
      <div
        className={`${showLateral ? "flex" : "hidden"} bg-green-100`}
        id="left-block"
        style={{ width: position }}
      >
        {children[0]}
      </div>
      <div
        className={`w-2 hover:cursor-e-resize ${
          showLateral ? "flex" : "hidden"
        } ${isDragging ? "bg-black " : "bg-stone-800 "}`}
        id="splitter"
        {...separatorProps}
      />
      <div
        id="right-block"
        className="bg-blue-500"
        style={{ width: `calc(100% - ${showLateral ? position : 0}px)` }}
      >
        {children[1]}
      </div>
    </div>
  );
}

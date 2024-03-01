const text = `
ernesto@MacBook-Air-de-Ernesto ~ % echo "Hola IDE"
Hola IDE
ernesto@MacBook-Air-de-Ernesto ~ %`;

export function Terminal() {
  return (
    <div className="p-2 font-mono text-white w-full bg-stone-800 h-full flex flex-col justify-end overflow-y-auto overflow-x-hidden ">
      {text.split("\n").map((l, i) => (
        <span key={i} className=" last:before:content-['>_'] w-full">
          {l}
        </span>
      ))}
    </div>
  );
}

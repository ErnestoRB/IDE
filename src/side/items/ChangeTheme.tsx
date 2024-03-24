import { FaEye } from "react-icons/fa";
import { useState } from "react";
import { setupVainilla, VAINILLA_THEME, VAINILLA_THEME_DARK } from "../../monaco/vainilla";
import { useMonaco } from "@monaco-editor/react"; // Importa useMonaco si es necesario

const ChangeTheme = () => {
  const [darkTheme, setDarkTheme] = useState(false);
  const monaco = useMonaco(); // Obtén la instancia de monaco

  const toggleTheme = () => {
    const newTheme = darkTheme ? VAINILLA_THEME : VAINILLA_THEME_DARK;
    setDarkTheme(prevTheme => !prevTheme);
    setupVainilla(monaco, darkTheme); // Pasa monaco y darkTheme como argumentos
  };

  return (
    <div className="flex text-white bg-stone-900 hover:bg-black">
      <button className="grid place-items-center w-10 h-10" onClick={toggleTheme}>
        <FaEye size={20} aria-label="Toggle theme" />
      </button>
    </div>
  );
};

export default ChangeTheme;

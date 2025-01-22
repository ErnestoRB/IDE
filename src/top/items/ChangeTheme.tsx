import { FaMoon, FaSun } from "react-icons/fa";
import { useEditor } from "../../stores/editor";
import { VAINILLA_THEME_DARK } from "../../monaco/vainilla";
import { useVainillaTheme } from "../../theme";

const ChangeTheme = () => {
  const [theme, toggleTheme] = useEditor((s) => [s.theme, s.toggleTheme]);
  const vtheme = useVainillaTheme();

  const isDark = theme == VAINILLA_THEME_DARK;

  return (
    <div className={`flex text-white  hover:opacity-90 ${vtheme.selectedTheme.definition["text"]} ${vtheme.selectedTheme.definition["topBarButtons"]}`  }>
      <button
        className="grid place-items-center w-10 h-10"
        onClick={() => toggleTheme(!isDark)}
      >
        {isDark ? (
          <FaSun size={20} aria-label="Toggle theme to light mode" />
        ) : (
          <FaMoon size={20} aria-label="Toggle theme to dark mode" />
        )}
      </button>
    </div>
  );
};

export default ChangeTheme;

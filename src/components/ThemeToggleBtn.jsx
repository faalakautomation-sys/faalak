import assets from "../assets/assets";

const ThemeToggleBtn = ({ theme, setTheme }) => {

  return (
    <button
      type="button"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className="inline-flex items-center justify-center"
    >
      {theme === "dark" ? (
        <img
          src={assets.sun_icon}
          alt="sun"
          className="size-8.5 p-1.5 border border-gray-500 rounded-full"
        />
      ) : (
        <img
          src={assets.moon_icon}
          alt="moon"
          className="size-8.5 p-1.5 border border-gray-500 rounded-full"
        />
      )}
    </button>
  );
};

export default ThemeToggleBtn;
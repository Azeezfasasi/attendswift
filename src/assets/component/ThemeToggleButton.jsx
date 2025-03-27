// import { useTheme } from "../contextAPI/ThemeContext";

// const ThemeToggleBtn = () => {
//   const { theme, toggleTheme } = useTheme();

//   return (
//     <div>
//       <button onClick={toggleTheme} className={`border p-2 rounded cursor-pointer ${theme}`}>
//         {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
//       </button>
//       <p>Current Theme: {theme}</p>
//   </div>
//   );
// };

// export default ThemeToggleBtn;

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure hydration works properly
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Prevent hydration mismatch

  return (
    <>
     <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="px-2 py-1 mt-0 rounded bg-blue-600 text-white"
      >
        <p className="hidden md:block">{theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}</p>
        <p className="block md:hidden">{theme === "light" ? "🌙" : "☀️"}</p>
      </button>
  </>
  );
};

export default ThemeToggle;

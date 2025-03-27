// import { useTheme } from "../contextAPI/ThemeContext";

// const ThemeToggle = () => {
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

// export default ThemeToggle;

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
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Dark Mode with next-themes</h1>

      <p>Current Theme: {theme}</p>

      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="px-4 py-2 mt-4 rounded bg-blue-600 text-white"
      >
        Toggle Theme
      </button>
    </div>
  );
};

export default ThemeToggle;

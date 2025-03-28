import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure hydration works properly
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col items-start justify-start mb-[20px]">
      <p>Current Theme: {theme} mode</p>
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="px-4 py-2 mt-4 rounded bg-blue-600 text-white"
      >
        Switch Theme
      </button>
    </div>
  );
};

export default ThemeToggle;

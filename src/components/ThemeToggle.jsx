import React, { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light")
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="fixed top-4 right-4 z-50 bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 p-2 rounded-full shadow-lg transition"
      aria-label="Przełącz motyw"
    >
      {theme === "dark" ? (
        <i className="fas fa-sun fa-lg"></i>
      ) : (
        <i className="fas fa-moon fa-lg"></i>
      )}
    </button>
  );
}

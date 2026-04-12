"use client";
import { useThemeStore } from "@/store/theme";

export default function ThemeToggle() {
  const { theme, toggle } = useThemeStore();
  const isLight = theme === "light";

  return (
    <button
      onClick={toggle}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all"
      style={{ background: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--text-sec)" }}
    >
      {isLight ? "LIGHT" : "DARK"}
      <span
        className="relative w-9 h-5 rounded-full transition-colors"
        style={{ background: isLight ? "#ccc" : "#333" }}
      >
        <span
          className="absolute top-0.5 w-4 h-4 rounded-full shadow transition-transform"
          style={{
            left: 2,
            background: isLight ? "#1a1a1a" : "#fff",
            transform: isLight ? "translateX(16px)" : "translateX(0)",
          }}
        />
      </span>
    </button>
  );
}

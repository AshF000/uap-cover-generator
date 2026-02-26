import { useState } from "react";
import Custom from "./components/Preview";
import Form from "./components/Form";
import { useTheme } from "./context/ThemeContext";

export default function App() {
  const [showPreview, setShowPreview] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="w-full h-dvh flex print:h-auto print:block">
      <div className="w-full md:w-6/12 h-full print:w-full print:h-auto print:block">
        <Form
          onPreviewToggle={() => setShowPreview(true)}
          isDark={isDark}
          onThemeToggle={toggleTheme}
        />
      </div>

      <div className="hidden md:block md:w-6/12 h-full print:w-full print:h-auto print:block">
        <Custom />
      </div>

      {showPreview && (
        <div className="fixed inset-0 z-50 bg-gray-200 md:hidden print:hidden">
          <button
            onClick={() => setShowPreview(false)}
            className="absolute top-4 right-4 z-10 px-4 py-2 bg-zinc-800 text-white rounded-full shadow-lg hover:bg-zinc-700 transition-colors"
          >
            ✕ Close
          </button>
          <Custom />
        </div>
      )}
    </div>
  );
}

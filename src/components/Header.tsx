import { Button } from "@/components/ui/button";
import { Theme } from "@/enums/theme";
import { useTheme } from "@/hooks/useTheme";
import { MoonIcon, SunIcon } from "lucide-react";

export function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold">Review Screen App</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => toggleTheme()}
          aria-label="Toggle dark mode"
        >
          {theme === Theme.DARK ? (
            <SunIcon className="h-5 w-5" />
          ) : (
            <MoonIcon className="h-5 w-5" />
          )}
        </Button>
      </div>
    </header>
  );
}

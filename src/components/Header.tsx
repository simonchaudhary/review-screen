import { Button } from "@/components/ui/button";
import { Theme } from "@/enums/theme";
import { useTheme } from "@/hooks/useTheme";
import { Icons } from "./Icons";

export function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-background sticky inset-x-0 top-0 isolate z-10  border-b h-14">
      <div className="container mx-auto px-4 flex shrink-0 items-center gap-2 justify-between py-2">
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
            <Icons.sun className="h-5 w-5" />
          ) : (
            <Icons.moon className="h-5 w-5" />
          )}
        </Button>
      </div>
    </header>
  );
}

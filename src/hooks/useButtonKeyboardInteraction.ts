import { useEffect } from "react";

/**
 * A custom hook that adds keyboard interaction support for buttons.
 *
 * This hook enables keyboard accessibility by handling Enter and Space
 * key presses on focused buttons while respecting the current navigation context.
 * It will only trigger button clicks when no section item is currently being navigated.
 */
export function useButtonKeyboardInteraction(isItemNavigating: boolean) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const activeElement = document.activeElement;

      // Only handle button interactions when not navigating items
      if (
        !isItemNavigating &&
        activeElement instanceof HTMLButtonElement &&
        (event.key === "Enter" || event.key === " ")
      ) {
        event.preventDefault();
        activeElement.click();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isItemNavigating]);
}

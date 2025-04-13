import { useEffect, useRef, useState } from "react";
import { useButtonKeyboardInteraction } from "./useButtonKeyboardInteraction";

type KeyboardNavigationOptions<T> = {
  items: T[];
  onItemHover: (id: number | null) => void;
  onItemToggle: (id: number) => void;
  onSelectAll?: () => void;
  onConfirm?: () => void; // Add this prop
  getId: (item: T) => number;
};

export function useKeyboardNavigation<T>({
  items,
  onItemHover,
  onItemToggle,
  onSelectAll,
  getId,
}: KeyboardNavigationOptions<T>) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const isNavigating = activeIndex !== null;

  useButtonKeyboardInteraction(isNavigating);

  const selectAllButtonRef = useRef<HTMLButtonElement>(null);
  const confirmButtonRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const scrollToItem = (index: number) => {
    if (itemRefs.current[index]) {
      itemRefs.current[index]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        document.activeElement instanceof HTMLInputElement ||
        document.activeElement instanceof HTMLTextAreaElement
      ) {
        return;
      }

      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          setActiveIndex((prevIndex) => {
            const newIndex =
              prevIndex === null
                ? 0
                : Math.min(prevIndex + 1, items.length - 1);
            onItemHover(getId(items[newIndex]));
            scrollToItem(newIndex);
            return newIndex;
          });
          break;

        case "ArrowUp":
          event.preventDefault();
          setActiveIndex((prevIndex) => {
            const newIndex =
              prevIndex === null
                ? items.length - 1
                : Math.max(prevIndex - 1, 0);
            onItemHover(getId(items[newIndex]));
            scrollToItem(newIndex);
            return newIndex;
          });
          break;

        case "Tab":
          if (event.shiftKey) {
            if (document.activeElement === selectAllButtonRef.current) {
              event.preventDefault();
              setActiveIndex(0);
              onItemHover(getId(items[0]));
              scrollToItem(0);
            }
          } else {
            if (activeIndex !== null) {
              event.preventDefault();
              setActiveIndex(null);
              selectAllButtonRef.current?.focus();
            } else if (document.activeElement === selectAllButtonRef.current) {
              event.preventDefault();
              confirmButtonRef.current?.focus();
            }
          }
          break;

        case "ArrowRight":
          if (activeIndex === null) {
            confirmButtonRef.current?.focus();
          }
          break;

        case "ArrowLeft":
          if (activeIndex === null) {
            selectAllButtonRef.current?.focus();
          }
          break;

        case " ": // Space key
          event.preventDefault();
          if (activeIndex !== null) {
            onItemToggle(getId(items[activeIndex]));
          }
          break;

        case "Enter":
          event.preventDefault();
          if (activeIndex !== null) {
            onItemToggle(getId(items[activeIndex]));
          }
          break;

        case "a":
          if ((event.ctrlKey || event.metaKey) && onSelectAll) {
            event.preventDefault();
            onSelectAll();
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [items, onItemHover, activeIndex, onItemToggle, onSelectAll, getId]);

  useEffect(() => {
    setActiveIndex(null);
  }, [items.length]);

  return {
    activeIndex,
    selectAllButtonRef,
    confirmButtonRef,
    itemRefs,
  };
}

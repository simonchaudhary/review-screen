import { Section } from "@/type/section";
import { useState } from "react";
import sectionsData from "@/data/sections.json";

function useSection() {
  const [sections, setSections] = useState<Section[]>(() => {
    return sectionsData.data.sections[0].children as Section[];
  });
  const [selectedSections, setSelectedSections] = useState<number[]>([]);
  const [hoveredSection, setHoveredSection] = useState<number | null>(null);

  const onSectionRemove = (id: number) => {
    const newSection = sections.filter((item) => item.id !== id);
    setSections(newSection);
  };

  const onSectionToggle = (id: number) => {
    setSelectedSections((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }

      return [...prev, id];
    });
  };

  const onSectionSelectAllToggle = () => {
    if (selectedSections.length === sections.length) {
      setSelectedSections([]);
    } else {
      setSelectedSections(sections.map((item) => item.id));
    }
  };

  return {
    sections,
    selectedSections,
    hoveredSection,
    setHoveredSection,
    onSectionRemove,
    onSectionToggle,
    onSectionSelectAllToggle,
  };
}

export default useSection;

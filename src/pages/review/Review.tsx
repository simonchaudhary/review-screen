import { useState } from "react";
import Preview from "./components/DocumentPreview";
import ReviewSidebar from "./components/ReviewSidebar";
import sectionsData from "@/data/sections.json";
import { Section } from "@/type/section";

function Review() {
  const [sections, setSections] = useState<Section[]>(() => {
    return sectionsData.data.sections[0].children as Section[];
  });

  const [selectedSections, setSelectedSections] = useState<number[]>([]);

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

  return (
    <div className="flex h-full">
      <Preview />

      <ReviewSidebar
        onSectionRemove={onSectionRemove}
        onSectionToggle={onSectionToggle}
        onSectionSelectAllToggle={onSectionSelectAllToggle}
        sections={sections}
        selectedSections={selectedSections}
      />
    </div>
  );
}

export default Review;

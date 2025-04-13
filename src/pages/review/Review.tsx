import DocumentPreview from "./components/documentPreview/DocumentPreview";
import ReviewSidebar from "./components/reviewSidebar/ReviewSidebar";
import useSection from "./hooks/useSection";

function Review() {
  const {
    sections,
    hoveredSection,
    selectedSections,
    setHoveredSection,
    onSectionRemove,
    onSectionToggle,
    onSectionSelectAllToggle,
  } = useSection();

  return (
    <div className="flex h-full">
      <DocumentPreview
        sections={sections}
        selectedSections={selectedSections}
        onSectionHover={setHoveredSection}
        hoveredSection={hoveredSection}
      />

      <ReviewSidebar
        onSectionRemove={onSectionRemove}
        onSectionToggle={onSectionToggle}
        onSectionSelectAllToggle={onSectionSelectAllToggle}
        sections={sections}
        selectedSections={selectedSections}
        hoveredSection={hoveredSection}
        onSectionHover={setHoveredSection}
      />
    </div>
  );
}

export default Review;

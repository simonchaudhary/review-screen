import pagesData from "@/data/pages.json";
import previewImage from "@/data/pages/a2cbec1124234a6d846f908ba9531a2e-1.jpg";
import { Section } from "@/type/section";
import { useState } from "react";
import SectionOverlayCard from "./SectionOverlayCard";
import SectionOverlayList from "./SectionOverlayList";
import ScaleControl from "./ZoomToolbar";

type DocumentPreviewProps = {
  selectedSections: number[];
  sections: Section[];
  onSectionHover: (id: number | null) => void;
  hoveredSection: number | null;
};

function DocumentPreview({
  selectedSections = [],
  sections,
  onSectionHover,
  hoveredSection,
}: DocumentPreviewProps) {
  const [scale, setScale] = useState(0.5);
  const imageData = pagesData.data.documents[0].pages[0].image;

  return (
    <div className="flex-1 flex flex-col">
      <ScaleControl scale={scale} onScaleChange={setScale} />

      <div className="flex-1">
        <div className="h-full flex items-center justify-center">
          <div
            className="overflow-auto"
            style={{
              width: "calc(100vw - 384px)",
              height: "calc(100vh - 104px)",
              maxWidth: "calc(100vw - 384px)",
              maxHeight: "calc(100vh - 104px)",
            }}
          >
            <div
              className="relative"
              style={{
                transform: `scale(${scale})`,
                transformOrigin: "top left",
                width: `${imageData.width}px`,
                height: `${imageData.height}px`,
              }}
            >
              <img
                src={previewImage}
                alt="Document Preview"
                className="w-full h-full object-contain"
              />

              <SectionOverlayList sections={sections}>
                {(section, index) => (
                  <SectionOverlayCard
                    key={section.id}
                    section={section}
                    index={index}
                    totalSections={sections.length}
                    onSectionHover={onSectionHover}
                    isSelected={selectedSections.includes(section.id)}
                    isHovered={hoveredSection === section.id}
                  />
                )}
              </SectionOverlayList>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DocumentPreview;

import pagesData from "@/data/pages.json";
import previewImage from "@/data/pages/a2cbec1124234a6d846f908ba9531a2e-1.jpg";
import { Section } from "@/type/section";
import { generateColorMap } from "@/utils/colors";

interface DocumentPreviewProps {
  selectedSections: number[];
  sections: Section[];
  onSectionHover: (id: number | null) => void;
  hoveredSection: number | null;
}

function DocumentPreview({
  selectedSections = [],
  sections,
  onSectionHover,
  hoveredSection,
}: DocumentPreviewProps) {
  const imageData = pagesData.data.documents[0].pages[0].image;

  return (
    <div className="flex-1 overflow-auto">
      <div
        className="relative"
        style={{
          height: imageData.height,
          width: imageData.width,
        }}
      >
        <img
          src={previewImage}
          alt="Document Preview"
          className="w-full h-full"
        />

        {sections.map((section, index) => {
          const [x1, y1, x2, y2] = section.content?.position || [0, 0, 0, 0];

          const isSelected = selectedSections.includes(section.id);

          if (!section.content?.position) return;

          return (
            <section
              className="cursor-pointer"
              style={{
                position: "absolute",
                left: `${x1}px`,
                top: `${y1}px`,
                width: `${x2 - x1}px`,
                height: `${y2 - y1}px`,
                backgroundColor:
                  isSelected || hoveredSection === section.id
                    ? generateColorMap(sections.length, { opacity: 0.5 })[
                        index + 1
                      ]
                    : "",
              }}
              onMouseEnter={() => onSectionHover(section.id)}
              onMouseLeave={() => onSectionHover(null)}
            />
          );
        })}
      </div>
    </div>
  );
}

export default DocumentPreview;

import pagesData from "@/data/pages.json";
import previewImage from "@/data/pages/a2cbec1124234a6d846f908ba9531a2e-1.jpg";
import { Section } from "@/type/section";
import { generateColorMap } from "@/utils/colors";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/Icons";

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
  const [scale, setScale] = useState(1);
  const imageData = pagesData.data.documents[0].pages[0].image;

  const handleZoom = (value: number | "fit") => {
    if (value === "fit") {
      setScale(1);
    } else {
      setScale(value);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Zoom controls */}
      <div className="flex items-center gap-2 p-4 border-b">
        <Button
          variant="outline"
          size="icon"
          onClick={() => handleZoom(Math.max(0.5, scale - 0.1))}
        >
          <Icons.minus className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => handleZoom(Math.min(2, scale + 0.1))}
        >
          <Icons.plus className="h-4 w-4" />
        </Button>
        <Button variant="outline" onClick={() => handleZoom("fit")}>
          Fit
        </Button>
        <Button variant="outline" onClick={() => handleZoom(0.5)}>
          50%
        </Button>
        <Button variant="outline" onClick={() => handleZoom(0.75)}>
          75%
        </Button>
        <Button variant="outline" onClick={() => handleZoom(1)}>
          100%
        </Button>
      </div>

      <div className="flex-1 overflow-hidden h-full">
        {/* <div className="min-h-full flex items-center justify-center p-4 h-full"> */}
        <div
          className="relative overflow-auto"
          style={{
            width: "800px", // Fixed width
            // width: "800px", // Fixed width
            // height: "1000px", // Fixed height
            height: "100%",
            border: "1px solid #eee",
          }}
        >
          <div
            className="relative"
            style={{
              transform: `scale(${scale})`,
              transformOrigin: "top left",
              // transformOrigin: "top left",
              width: imageData.width,
              height: imageData.height,
            }}
          >
            <img
              src={previewImage}
              alt="Document Preview"
              className="w-full h-full object-contain"
            />
            {sections.map((section, index) => {
              const [x1, y1, x2, y2] = section.content?.position || [
                0, 0, 0, 0,
              ];

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
        {/* </div> */}
      </div>
    </div>
  );
}

export default DocumentPreview;

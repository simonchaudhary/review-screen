import pagesData from "@/data/pages.json";
import previewImage from "@/data/pages/a2cbec1124234a6d846f908ba9531a2e-1.jpg";
import { Section } from "@/type/section";
import { generateColorMap } from "@/utils/colors";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/Icons";

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

  const handleZoom = (value: number | "fit") => {
    if (value === "fit") {
      setScale(0.5);
    } else {
      setScale(value);
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Zoom controls */}
      <div className="flex items-center gap-2 p-2 border-b">
        <Button
          variant={scale === Math.max(0.2, scale - 0.1) ? "default" : "outline"}
          size="icon"
          onClick={() => handleZoom(Math.max(0.2, scale - 0.1))}
        >
          <Icons.minus className="h-4 w-4" />
        </Button>
        <Button
          variant={scale === Math.min(2, scale + 0.1) ? "default" : "outline"}
          size="icon"
          onClick={() => handleZoom(Math.min(2, scale + 0.1))}
        >
          <Icons.plus className="h-4 w-4" />
        </Button>
        <Button
          variant={scale === 0.3 ? "default" : "outline"}
          onClick={() => handleZoom("fit")}
        >
          Fit
        </Button>
        <Button
          variant={scale === 0.5 ? "default" : "outline"}
          onClick={() => handleZoom(0.5)}
        >
          50%
        </Button>
        <Button
          variant={scale === 0.75 ? "default" : "outline"}
          onClick={() => handleZoom(0.75)}
        >
          75%
        </Button>
        <Button
          variant={scale === 1 ? "default" : "outline"}
          onClick={() => handleZoom(1)}
        >
          100%
        </Button>
      </div>

      <div className="flex-1">
        <div className="h-full flex items-center justify-center">
          <div
            className="overflow-auto"
            style={{
              width: "800px",
              height: "1000px",
              maxWidth: "calc(100vw - 80px)",
              // maxWidth: "95%",
              maxHeight: "calc(100vh - 80px)",
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
        </div>
      </div>
    </div>
  );
}

export default DocumentPreview;

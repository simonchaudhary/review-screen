import { Section } from "@/type/section";
import { generateColorMap } from "@/utils/colors";
import { useMemo } from "react";

type SectionOverlayCardProps = {
  section: Section;
  index: number;
  onSectionHover: (id: number | null) => void;
  totalSections: number;
  isSelected: boolean;
  isHovered: boolean;
};

function SectionOverlayCard(props: SectionOverlayCardProps) {
  const {
    section,
    index,
    totalSections,
    onSectionHover,
    isSelected,
    isHovered,
  } = props;
  const [x1, y1, x2, y2] = section.content?.position || [0, 0, 0, 0];

  const colors = useMemo(
    () => ({
      boxColor: generateColorMap(totalSections, { opacity: 0.5 })[index + 1],
    }),
    [totalSections, index]
  );

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
        backgroundColor: isSelected || isHovered ? colors.boxColor : "",
      }}
      onMouseEnter={() => onSectionHover(section.id)}
      onMouseLeave={() => onSectionHover(null)}
    />
  );
}

export default SectionOverlayCard;

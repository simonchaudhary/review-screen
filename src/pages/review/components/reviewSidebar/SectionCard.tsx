import { Button } from "@/components/ui/button";
import { en } from "@/language/en";
import { Section } from "@/type/section";

import { Icons } from "@/components/common/Icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { generateColorMap } from "@/utils/colors";
import { getElementId } from "@/utils/dom";
import { getAcronym } from "@/utils/string";
import { memo, useMemo } from "react";

type SectionCardProps = {
  index: number;
  section: Section;
  totalSections: number;
  isSelected: boolean;
  onSectionRemove: (id: number) => void;
  onSectionToggle: (id: number) => void;
  isHovered: boolean;
  onSectionHover: (id: number | null) => void;
  ref: React.Ref<HTMLDivElement>;
};

const SectionCard = memo(
  (props: SectionCardProps) => {
    const {
      index,
      totalSections,
      section,
      isSelected,
      onSectionRemove,
      onSectionToggle,
      isHovered,
      onSectionHover,
      ref,
    } = props;

    const colors = useMemo(
      () => ({
        boxColor: generateColorMap(totalSections, { lightness: 60 })[index + 1],
        barColor: generateColorMap(totalSections)[index + 1],
        cardColor: generateColorMap(totalSections, { opacity: 0.1 })[index + 1],
      }),
      [totalSections, index]
    );

    return (
      <Card
        ref={ref}
        className="cursor-pointer"
        key={section.id}
        style={{
          backgroundColor: isHovered ? colors.cardColor : "",
        }}
        onMouseEnter={() => onSectionHover(section.id)}
        onMouseLeave={() => onSectionHover(null)}
      >
        <CardContent className="flex items-center justify-between">
          <section className="flex items-start gap-x-3">
            <section
              style={{
                backgroundColor: colors.boxColor,
              }}
              className={cn(
                "w-10 min-w-10 h-10 rounded-md flex items-center overflow-hidden"
              )}
            >
              <section
                className="w-[6px] h-full"
                style={{
                  backgroundColor: colors.barColor,
                }}
              />

              <section className="flex items-center justify-center text-sm font-bold flex-1 text-white">
                {getAcronym(section.label)}
              </section>
            </section>

            <section className="">
              <CardTitle>{section.label}</CardTitle>

              <CardDescription>
                {section.content?.value || "No value"}
              </CardDescription>
            </section>
          </section>

          <section className="flex items-center gap-x-3">
            <Checkbox
              id={getElementId("section", section.id)}
              checked={isSelected}
              onCheckedChange={() => onSectionToggle(section.id)}
            />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="!px-0">
                  <Icons.moreVertical />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-32" side="left" align="center">
                <DropdownMenuLabel>
                  <Button
                    variant="ghost"
                    onClick={() => onSectionRemove(section.id)}
                  >
                    <Icons.remove
                      className="opacity-60 text-destructive"
                      size={16}
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                    {en.buttons.remove}
                  </Button>
                </DropdownMenuLabel>
              </DropdownMenuContent>
            </DropdownMenu>
          </section>
        </CardContent>
      </Card>
    );
  },

  (prevProps, nextProps) => {
    return (
      prevProps.isSelected === nextProps.isSelected &&
      prevProps.isHovered === nextProps.isHovered &&
      prevProps.section.id === nextProps.section.id &&
      prevProps.index === nextProps.index
    );
  }
);

export default SectionCard;

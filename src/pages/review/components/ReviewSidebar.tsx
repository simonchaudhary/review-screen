import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
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
import { en } from "@/language/en";
import { Section } from "@/type/section";
import { getElementId } from "@/utils/dom";
import { getAcronym } from "@/utils/string";

import ConfirmDialog from "@/components/ConfirmDialog";
import { cn } from "@/lib/utils";
import { generateColorMap } from "@/utils/colors";
import { toast } from "sonner";

type ReviewSidebarProps = {
  sections: Section[];
  selectedSections: number[];
  onSectionRemove: (id: number) => void;
  onSectionToggle: (id: number) => void;
  onSectionSelectAllToggle: () => void;
  hoveredSection: number | null;
  onSectionHover: (id: number | null) => void;
};

function ReviewSidebar(props: ReviewSidebarProps) {
  const {
    sections,
    selectedSections,
    onSectionRemove,
    onSectionToggle,
    onSectionSelectAllToggle,
    hoveredSection,
    onSectionHover,
  } = props;

  const onConfirm = () => {
    toast(en.toast.fieldConfirmedSuccessfully);
  };

  return (
    <div className="w-96 flex flex-col h-full border-l bg-primary-foreground">
      <section className="flex-1 overflow-y-auto flex flex-col gap-y-4 py-4 scrollbar-stable-both-edge pr-4">
        {sections.map((section, index) => {
          const boxColor = generateColorMap(sections.length, {
            lightness: 60,
          })[index + 1];

          const barColor = generateColorMap(sections.length)[index + 1];

          const cardColor = generateColorMap(sections.length, { opacity: 0.1 })[
            index + 1
          ];

          return (
            <Card
              className="cursor-pointer"
              key={section.id}
              style={{
                backgroundColor: hoveredSection === section.id ? cardColor : "",
              }}
              onMouseEnter={() => onSectionHover(section.id)}
              onMouseLeave={() => onSectionHover(null)}
            >
              <CardContent className="flex items-center justify-between">
                <section className="flex items-start gap-x-3">
                  <section
                    style={{
                      backgroundColor: boxColor,
                    }}
                    className={cn(
                      "w-10 min-w-10 h-10 rounded-md flex items-center overflow-hidden"
                    )}
                  >
                    <section
                      className="w-[6px] h-full"
                      style={{
                        backgroundColor: barColor,
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
                    checked={selectedSections.includes(section.id)}
                    onCheckedChange={() => onSectionToggle(section.id)}
                  />

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="!px-0">
                        <Icons.moreVertical />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-32"
                      side="left"
                      align="center"
                    >
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
        })}
      </section>

      <section className="bg-background border-t flex gap-2 items-center justify-between p-4">
        <Button
          variant="outline"
          className="w-fit"
          onClick={onSectionSelectAllToggle}
        >
          {selectedSections.length === sections.length
            ? en.buttons.deselectAll
            : en.buttons.selectAll}
        </Button>

        <ConfirmDialog
          trigger={
            <Button
              variant="default"
              className="w-fit"
              disabled={selectedSections.length === 0}
            >
              {en.buttons.confirm}
            </Button>
          }
          title={en.modal.confirmSelectedField}
          onConfirm={onConfirm}
        />
      </section>
    </div>
  );
}

export default ReviewSidebar;

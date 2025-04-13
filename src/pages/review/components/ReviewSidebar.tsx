import { Button } from "@/components/ui/button";
import { en } from "@/language/en";
import { Section } from "@/type/section";

import ConfirmDialog from "@/components/ConfirmDialog";
import { toast } from "sonner";
import SectionList from "./SectionList";
import SectionCard from "./SectionCard";

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
      <SectionList sections={sections}>
        {(section, index) => (
          <SectionCard
            index={index}
            section={section}
            totalSections={sections.length}
            isSelected={selectedSections.includes(section.id)}
            isHovered={hoveredSection === section.id}
            onSectionRemove={onSectionRemove}
            onSectionToggle={onSectionToggle}
            onSectionHover={onSectionHover}
          />
        )}
      </SectionList>

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

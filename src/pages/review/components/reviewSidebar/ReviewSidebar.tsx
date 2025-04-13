import { Button } from "@/components/ui/button";
import { en } from "@/language/en";
import { Section } from "@/type/section";

import ConfirmDialog from "@/components/common/ConfirmDialog";
import { useKeyboardNavigation } from "@/hooks/useKeyboardNavigation";
import { Any } from "@/type/common";
import { toast } from "sonner";
import SectionCard from "./SectionCard";
import SectionList from "./SectionList";

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

  const { selectAllButtonRef, confirmButtonRef, itemRefs } =
    useKeyboardNavigation({
      items: sections,
      onItemHover: onSectionHover,
      onItemToggle: onSectionToggle,
      onSelectAll: onSectionSelectAllToggle,
      getId: (section) => section.id,
    });

  const onConfirm = () => {
    toast(en.toast.fieldConfirmedSuccessfully);
  };

  return (
    <div className="w-96 flex flex-col h-full border-l bg-primary-foreground">
      <div className="flex-1 overflow-y-auto">
        <SectionList sections={sections}>
          {(section, index) => (
            <SectionCard
              key={section.id}
              ref={(el: Any) => (itemRefs.current[index] = el)}
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
      </div>

      <section className="bg-background border-t flex gap-2 items-center justify-between p-4">
        <Button
          variant="outline"
          className="w-fit"
          onClick={onSectionSelectAllToggle}
          ref={selectAllButtonRef}
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
              ref={confirmButtonRef}
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

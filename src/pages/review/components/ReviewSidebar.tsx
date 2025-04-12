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
import { toast } from "sonner";

type ReviewSidebarProps = {
  sections: Section[];
  selectedSections: number[];
  onSectionRemove: (id: number) => void;
  onSectionToggle: (id: number) => void;
  onSectionSelectAllToggle: () => void;
};

function ReviewSidebar(props: ReviewSidebarProps) {
  const {
    sections,
    selectedSections,
    onSectionRemove,
    onSectionToggle,
    onSectionSelectAllToggle,
  } = props;

  const onConfirm = () => {
    toast(en.toast.fieldConfirmedSuccessfully);
  };

  return (
    <div className="w-96 flex flex-col h-full border-l bg-primary-foreground">
      <section className="flex-1 overflow-y-auto flex flex-col gap-y-4 py-4 scrollbar-stable-both-edge pr-4">
        {sections.map((item) => (
          <Card key={item.id}>
            <CardContent className="flex items-center justify-between">
              <section className="flex items-start gap-x-3">
                <section className="w-10 min-w-10  h-10 rounded-md bg-amber-200 flex items-center overflow-hidden">
                  <section className="w-[6px] h-full bg-amber-400" />

                  <section className="flex items-center justify-center text-sm font-bold flex-1 text-white">
                    {getAcronym(item.label)}
                  </section>
                </section>

                <section className="">
                  <CardTitle>{item.label}</CardTitle>

                  <CardDescription>
                    {item.content?.value || "No value"}
                  </CardDescription>
                </section>
              </section>

              <section className="flex items-center gap-x-3">
                <Checkbox
                  id={getElementId("section", item.id)}
                  checked={selectedSections.includes(item.id)}
                  onCheckedChange={() => onSectionToggle(item.id)}
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
                        onClick={() => onSectionRemove(item.id)}
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
        ))}
      </section>

      <section className="bg-background border-t flex gap-2 items-center justify-between p-4">
        <Button
          variant="outline"
          className="w-fit"
          onClick={onSectionSelectAllToggle}
        >
          {en.buttons.selectAll}
        </Button>

        <ConfirmDialog
          trigger={
            <Button variant="default" className="w-fit">
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

import { Section } from "@/type/section";

type SectionListProps = {
  sections: Section[];
  children: (section: Section, index: number) => React.ReactNode;
};

function SectionList(props: SectionListProps) {
  const { sections, children } = props;

  return (
    <div className="flex-1 overflow-y-auto flex flex-col gap-y-4 py-4 scrollbar-stable-both-edge pr-4">
      {sections.map((section, index) => children(section, index))}
    </div>
  );
}

export default SectionList;

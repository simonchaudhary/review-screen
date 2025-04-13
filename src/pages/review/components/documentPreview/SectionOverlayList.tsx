import { Section } from "@/type/section";
import React from "react";

type SectionOverlayListProps = {
  sections: Section[];
  children: (section: Section, index: number) => React.ReactNode;
};

function SectionOverlayList(props: SectionOverlayListProps) {
  const { sections, children } = props;

  return <>{sections.map((section, index) => children(section, index))}</>;
}

export default SectionOverlayList;

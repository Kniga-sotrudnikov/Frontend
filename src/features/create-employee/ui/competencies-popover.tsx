import { CompetenciesContent } from "./competencies-content";
import type { CompetencyOption } from "../model/types";

interface CompetenciesPopoverContentProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  tempValue: string[];
  onToggleCompetency: (id: string) => void;
  displayedOptions: CompetencyOption[];
  onClear: () => void;
  onApply: () => void;
  onShowAll: () => void;
  hasMore: boolean;
  showAll: boolean;
  filteredCount: number;
  onAddTag: (tagName: string, color?: string) => void;
}

export const CompetenciesPopoverContent = ({
  displayedOptions,
  onAddTag,
  ...props
}: CompetenciesPopoverContentProps) => {
  return (
    <CompetenciesContent
      {...props}
      options={displayedOptions}
      variant="popover"
      onAddTag={onAddTag}
    />
  );
};

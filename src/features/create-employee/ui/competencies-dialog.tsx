import { Dialog, DialogContent } from "@ui/dialog";
import { CompetenciesContent } from "./competencies-content";

interface CompetenciesDialogContentProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  tempValue: string[];
  onToggleCompetency: (name: string) => void;
  filteredOptions: Array<{ id: string; label: string }>;
  onClear: () => void;
  onApply: () => void;
  onAddTag: (tagName: string) => void;
}

export const CompetenciesDialogContent = ({
  filteredOptions,
  onAddTag,
  ...props
}: CompetenciesDialogContentProps) => {
  return (
    <Dialog open={props.open} onOpenChange={props.onOpenChange}>
      <DialogContent className="!w-[451px] h-auto !max-w-none !p-4 !rounded-6 !border !border-gray-200 !shadow-md !bg-white">
        <CompetenciesContent
          {...props}
          options={filteredOptions}
          variant="dialog"
          onAddTag={onAddTag}
        />
      </DialogContent>
    </Dialog>
  );
};
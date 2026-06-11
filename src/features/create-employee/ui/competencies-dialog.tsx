import { Dialog, DialogContent } from "@ui/dialog";
import { CompetenciesContent } from "./competencies-content";
import type { CompetencyOption } from "../model/types";

interface CompetenciesDialogContentProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  tempValue: string[];
  onToggleCompetency: (id: string) => void;
  filteredOptions: CompetencyOption[];
  onClear: () => void;
  onApply: () => void;
}

export const CompetenciesDialogContent = ({
  filteredOptions,
  ...props
}: CompetenciesDialogContentProps) => {
  return (
    <Dialog open={props.open} onOpenChange={props.onOpenChange}>
      <DialogContent className="!w-[451px] h-auto !max-w-none !p-4 !rounded-6 !border !border-gray-200 !shadow-md !bg-white">
        <CompetenciesContent
          {...props}
          options={filteredOptions}
          variant="dialog"
        />
      </DialogContent>
    </Dialog>
  );
};

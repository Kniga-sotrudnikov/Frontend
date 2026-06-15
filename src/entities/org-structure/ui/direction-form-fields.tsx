import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";

const DESCRIPTION_MAX_LENGTH = 300;

interface DirectionFormFieldsProps {
  nameLabel: string;
  name: string;
  onNameChange: (value: string) => void;
  namePlaceholder?: string;
  headLabel: string;
  /** Селектор руководителя — подставляется фичей (EmployeeSelect живёт в соседнем entity) */
  headSlot: React.ReactNode;
  description: string;
  onDescriptionChange: (value: string) => void;
  descriptionPlaceholder?: string;
  descriptionMaxLength?: number;
}

/**
 * Общий блок полей формы направления/СИС: название, руководитель, описание.
 * Используется и в создании, и в редактировании.
 */
export function DirectionFormFields({
  nameLabel,
  name,
  onNameChange,
  namePlaceholder = "Введите название",
  headLabel,
  headSlot,
  description,
  onDescriptionChange,
  descriptionPlaceholder = "Введите описание",
  descriptionMaxLength = DESCRIPTION_MAX_LENGTH,
}: DirectionFormFieldsProps) {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="body-s-semibold text-gray-700">{nameLabel}</label>
          <Input
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder={namePlaceholder}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="body-s-semibold text-gray-700">{headLabel}</label>
          {headSlot}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="body-s-semibold text-gray-700">Описание</label>
        <Textarea
          value={description}
          onChange={(e) =>
            onDescriptionChange(e.target.value.slice(0, descriptionMaxLength))
          }
          placeholder={descriptionPlaceholder}
          className="min-h-24 resize-none"
        />
        <span className="body-s text-gray-500 self-end">
          {description.length}/{descriptionMaxLength}
        </span>
      </div>
    </>
  );
}

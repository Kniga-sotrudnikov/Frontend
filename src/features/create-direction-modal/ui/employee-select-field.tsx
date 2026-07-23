import { useEmployeesInfinite } from "@/entities/employee";
import { Select } from "@/shared/ui/select";

interface EmployeeSelectFieldProps {
  value: number | null;
  onChange: (id: number | null, name: string) => void;
  placeholder?: string;
}

export const EmployeeSelectField = ({
  value,
  onChange,
  placeholder = "Выберите руководителя",
}: EmployeeSelectFieldProps) => {
  const {
    data: employeesData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useEmployeesInfinite();

  const employeeOptions =
    employeesData?.pages.flatMap((page) =>
      page.results.map((employee) => ({
        value: String(employee.id),
        label: employee.full_name,
      })),
    ) ?? [];

  const stringValue = value ? String(value) : "";
  const selectedName =
    employeeOptions.find((option) => option.value === stringValue)?.label ?? "";

  const options =
    value &&
    selectedName &&
    !employeeOptions.some((option) => option.value === stringValue)
      ? [{ value: stringValue, label: selectedName }, ...employeeOptions]
      : employeeOptions;

  return (
    <Select
      value={stringValue}
      onValueChange={(newValue) => {
        const selectedOption = options.find(
          (option) => option.value === newValue,
        );
        onChange(
          newValue ? Number(newValue) : null,
          selectedOption?.label ?? "",
        );
      }}
      options={options}
      placeholder={placeholder}
      onScrollEnd={() => {
        if (hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      }}
    />
  );
};

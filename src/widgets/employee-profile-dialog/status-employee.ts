import WorkingIcon from "@/shared/assets/icons/working.svg";
import BizTripIcon from "@/shared/assets/icons/biz-trip.svg";
import VacationIcon from "@/shared/assets/icons/vacation.svg";
import SickIcon from "@/shared/assets/icons/sick.svg";

//TODO: ВЫНЕСТИ ТИПЫ ОТДЕЛЬНО
export type EmployeeStatus = "working" | "bizTrip" | "vacation" | "sick";

export const statusIconMap: Record<EmployeeStatus, string> = {
  working: WorkingIcon,
  bizTrip: BizTripIcon,
  vacation: VacationIcon,
  sick: SickIcon,
};

export const statusLabelMap: Record<EmployeeStatus, string> = {
  working: "Работает",
  bizTrip: "В командировке",
  vacation: "В отпуске",
  sick: "На больничном",
};
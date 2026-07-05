import WorkingIcon from "@/shared/assets/icons/working.svg";
import BizTripIcon from "@/shared/assets/icons/biz-trip.svg";
import VacationIcon from "@/shared/assets/icons/vacation.svg";
import SickIcon from "@/shared/assets/icons/sick.svg";
import type { TEmployeeStatus } from "./types";

export const statusIconMap: Record<TEmployeeStatus, string> = {
  working: WorkingIcon,
  business_trip: BizTripIcon,
  vacation: VacationIcon,
  sick_leave: SickIcon,
};

export const statusLabelMap: Record<TEmployeeStatus, string> = {
  working: "Работает",
  business_trip: "В командировке",
  vacation: "В отпуске",
  sick_leave: "На больничном",
};

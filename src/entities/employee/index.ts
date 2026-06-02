export type { TEmployee, EmployeeStatus, TEmployeeStatus, EmployeeData } from "./model/types";
export type { BirthdayPerson } from "./model/mock";
export { employees } from "./model/mock";
export { statusFilterOptions } from "./model/constants";
export { employeeTableColumns } from "./ui/employee-table-columns";
export { mapTEmployeeToEmployeeData } from "./utils/map-temployee-to-employee-data";
export {
  MOCK_BIRTHDAYS,
  getCurrentMonthBirthdays,
  getTodayBirthdays,
  getUpcomingBirthdays,
} from "./model/mock";

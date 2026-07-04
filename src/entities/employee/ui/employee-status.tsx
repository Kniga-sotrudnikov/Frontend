// import type { TEmployeeStatus } from "@/entities/employee/";
// import { Badge } from "@ui/badge";

// const employeeStatusConfig: Record<
//   TEmployeeStatus,
//   {
//     label: string;
//     className: string;
//   }
// > = {
//   working: {
//     label: "В работе",
//     className:
//       "border-[var(--color-green-700)] bg-[var(--color-green-100)] text-[var(--color-green-700)]",
//   },
//   vacation: {
//     label: "В отпуске",
//     className:
//       "border-[var(--color-yellow-700)] bg-[var(--color-yellow-100)] text-[var(--color-yellow-800)]",
//   },
//   sick_leave: {
//     label: "Больничный",
//     className:
//       "border-[var(--color-gray-700)] bg-[var(--color-gray-200)] text-[var(--color-gray-700)]",
//   },
//   maternity: {
//     label: "Декрет",
//     className:
//       "border-[var(--color-purple-500)] bg-[var(--color-purple-100)] text-[var(--color-purple-500)]",
//   },
// };

// type TEmployeeStatusProps = {
//   status: TEmployeeStatus;
// };

// export const EmployeeStatus = ({ status }: TEmployeeStatusProps) => {
//   const config = employeeStatusConfig[status];

//   return <Badge className={config.className}>{config.label}</Badge>;
// };

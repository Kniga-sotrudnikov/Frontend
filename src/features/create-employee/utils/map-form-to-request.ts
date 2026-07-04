// import { format } from "date-fns";
// import type { CreateEmployeeFormValues } from "../model/types";
// import type { CreateEmployeeRequest } from "@/entities/employee";

// function parseRoles(value: string): string[] {
//   return value
//     .split(",")
//     .map((item) => item.trim())
//     .filter(Boolean);
// }

// export function mapFormToCreateEmployeeRequest(
//   values: CreateEmployeeFormValues
// ): CreateEmployeeRequest {
//   return {
//     full_name: values.fullName,

//     job_title: values.position,

//     role_description: parseRoles(values.role),

//     email: values.emailCorporate,

//     phone: values.phoneCorporate || undefined,
//     personal_phone: values.phonePersonal || null,
//     personal_email: values.emailPersonal || null,

//     interests: values.competencies.join(", "),

// /*     birthday: values.birthday
//       ? format(values.birthday, "yyyy-MM-dd")
//       : undefined, */
    
//     birthday: "0001-01-01",

//     // department: values.department!, // тут лучше валидировать раньше

//     department: values.department!, //TODO: возможны баги, нужно проверять

//     // supervisor: values.leader || null,

//     city: values.city || null,

//     // employment_status: values.status,

//     crm_profile: values.crmProfileLink || null,
//     social_network: values.socialNetworkLink || null,
//     resume_link: values.resumeLink || null,
//   };
// }
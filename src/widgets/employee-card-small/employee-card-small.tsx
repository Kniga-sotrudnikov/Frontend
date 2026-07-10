import defaultPhoto from "@/shared/assets/images/avatar-placeholder.jpg";
import {
  statusIconMap,
  statusLabelMap,
} from "@/entities/employee/model/constants";
import { cn } from "@/shared/lib";
import type { TEmployeeStatus } from "@/entities/employee/model/types";

export type Employee = {
  id: string;
  name: string;
  position?: string;
  status?: TEmployeeStatus;
  photo?: string;
  isArchived?: boolean;
  franchise?: string;
  department?: string;
};

interface EmployeeCardSmallProps {
  employee: Employee;
}

export const EmployeeCardSmall = ({ employee }: EmployeeCardSmallProps) => {
  const {
    photo = defaultPhoto,
    isArchived = false,
    status,
    name,
    position,
  } = employee;

  return (
    <div className="flex gap-4">
      <div className="relative shrink-0">
        <div className="w-9 h-9 bg-gray-100 rounded-full overflow-hidden">
          <img
            src={photo}
            alt="Фото сотрудника"
            className={cn("size-full object-cover", isArchived && "grayscale")}
          />
        </div>

        {!isArchived && status && (
          <div className="absolute bottom-0 -right-1.5">
            <img
              src={statusIconMap[status]}
              alt={statusLabelMap[status]}
              className="size-4.5 rounded-full"
              title={statusLabelMap[status]}
            />
          </div>
        )}
      </div>

      <div className="flex flex-col justify-center">
        <span className="body-s-semibold text-gray-900 ">{name}</span>
        {position && (
          <span className="font-montserrat font-normal text-xs leading-[120%] text-gray-700 ">
            {position}
          </span>
        )}
      </div>
    </div>
  );
};

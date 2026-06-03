import defaultPhoto from "@/shared/assets/images/avatar-placeholder.jpg";
import {
  statusIconMap,
  statusLabelMap,
} from "@/entities/employee/model/constants";
import { cn } from "@/shared/lib";
import type { EmployeeStatus } from "@/entities/employee/model/types";

interface EmployeePrimaryInfoProps {
  photo?: string;
  isArchived?: boolean;
  status: EmployeeStatus;
  name: string;
  position: string;
  franchise: string;
  department: string;
}

export const EmployeePrimaryInfo = ({
  photo = defaultPhoto,
  isArchived = false,
  status,
  name,
  position,
  franchise,
  department,
}: EmployeePrimaryInfoProps) => {
  return (
    <div className="flex gap-4">
      <div className="relative shrink-0 w-26.5 h-23.5 bg-gray-100 rounded-8 overflow-hidden">
        <img
          src={photo}
          alt="Фото сотрудника"
          className={cn("size-full object-cover", isArchived && "grayscale")}
        />

        {!isArchived && (
          <div className="absolute bottom-0 right-0">
            <img
              src={statusIconMap[status]}
              alt={statusLabelMap[status]}
              className="size-6"
              title={statusLabelMap[status]}
            />
          </div>
        )}
      </div>
      <div className="flex-1  min-w-0">
        <h3 className="body-s-semibold text-black mb-2 wrap-break-word">
          {name}
        </h3>
        <p className="body-s mb-3 wrap-break-word text-gray-600">{position}</p>
        <p className="body-overline mb-2 wrap-break-word text-gray-600">
          {franchise}
        </p>
        <p className="body-overline wrap-break-word text-gray-600">
          {department}
        </p>
      </div>
    </div>
  );
};

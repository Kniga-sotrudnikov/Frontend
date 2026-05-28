import { ProfessionCard } from "@/widgets/profession-card";
import { VacancyCard } from "@/widgets/vacancy-card";
import { EmptyPlaceholder } from "@ui/empty-placeholder";
import { useState } from "react";
import type { VacancyData } from "./types";

interface VacanciesTabProps {
  vacancies: VacancyData[];
  viewType: "grid" | "list";
}

export const VacanciesTab = ({ vacancies, viewType }: VacanciesTabProps) => {
  const activeVacancies = vacancies.filter((vac) => !vac.isArchived);
  const [selectedVacancy, setSelectedVacancy] = useState<VacancyData | null>(
    null,
  );

  const handleRespond = (vacancy: VacancyData) => {
    setSelectedVacancy(vacancy);
  };

  if (activeVacancies.length === 0) {
    return <EmptyPlaceholder text="Нет активных вакансий" />;
  }

  return (
    <>
      <div
        className={
          viewType === "grid"
            ? "grid gap-6 grid-cols-[repeat(auto-fit,minmax(370px,1fr))]"
            : "flex flex-col gap-4"
        }
      >
        {activeVacancies.map((vacancy) => (
          <ProfessionCard
            key={vacancy.id}
            city={vacancy.city}
            profession={vacancy.profession}
            position={vacancy.position}
            franchise={vacancy.franchise}
            department={vacancy.department}
            isArchived={vacancy.isArchived}
            onRespond={() => handleRespond(vacancy)}
          />
        ))}
      </div>

      {selectedVacancy && (
        <VacancyCard
          open={!!selectedVacancy}
          onOpenChange={(open) => {
            if (!open) setSelectedVacancy(null);
          }}
          vacancy={{
            id: selectedVacancy.id,
            title: selectedVacancy.profession,
            location: selectedVacancy.city,
            employmentDetails: [],
            franchise: selectedVacancy.franchise,
            department: selectedVacancy.department,
            description: selectedVacancy.position,
            responsibilities: [],
            competencies: [],
          }}
          onRespond={() => {}}
          onExportPDF={() => {}}
        />
      )}
    </>
  );
};

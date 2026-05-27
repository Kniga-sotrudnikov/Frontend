import { ProfessionCard } from "@/widgets/profession-card";
import { EmptyPlaceholder } from "@ui/empty-placeholder";
import type { VacancyData } from "./types";

interface VacanciesTabProps {
  vacancies: VacancyData[];
  viewType: "grid" | "list";
}

export const VacanciesTab = ({ vacancies, viewType }: VacanciesTabProps) => {
  const activeVacancies = vacancies.filter((vac) => !vac.isArchived);

  if (activeVacancies.length === 0) {
    return <EmptyPlaceholder text="Нет активных вакансий" />;
  }

  return (
    <div
      className={
        viewType === "grid"
          ? "grid gap-6 grid-cols-[repeat(auto-fit,minmax(370px,1fr))]"
          : "flex flex-col gap-4"
      }
    >
      {activeVacancies.map(({ id, ...vacancyProps }) => (
        <ProfessionCard key={id} {...vacancyProps} />
      ))}
    </div>
  );
};

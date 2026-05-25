import type { TEmployeeStatus } from "@/entities/employee";

export type CreateEmployeeFormValues = {
  photo?: File | string;
  fullName: string;
  position: string;
  department: string;
  leader: string;
  emailCorporate: string;
  emailPersonal: string;
  phoneCorporate: string;
  phonePersonal: string;
  birthday: Date | undefined;
  city: string;
  status: TEmployeeStatus;
  competencies: string[];
};

export type CompetencyOption = {
  id: string;
  label: string;
};

export const COMPETENCY_OPTIONS: CompetencyOption[] = [
  { id: "alumni", label: "Alumni статус" },
  { id: "author", label: "Автор методических материалов" },
  { id: "english_b1", label: "Английский язык B1+" },
  { id: "presentation", label: "Ведущий презентаций для доноров" },
  { id: "business", label: "Взаимодействие с бизнесом" },
  { id: "volunteer", label: "Волонтёрский менеджмент" },
  { id: "flexible", label: "Гибкий график возможно" },
  { id: "travel", label: "Готов к командировкам" },
  { id: "public_speaking", label: "Готов к публичным выступлениям" },
  { id: "grant", label: "Грантовая заявка" },
  { id: "english", label: "Знание английского" },
  { id: "new_direction", label: "Запуск нового направления" },
  { id: "research", label: "Интерес к исследованиям" },
  { id: "methodology", label: "Интерес к методологии" },
  { id: "adult_education", label: "Интерес к обучению взрослых" },
  { id: "psychology", label: "Интерес к психологической поддержке" },
  { id: "fundraising", label: "Интерес к фандрайзингу" },
  { id: "digital_tools", label: "Интерес к цифровым инструментам" },
  { id: "research_work", label: "Исследовательская работа" },
  { id: "coach", label: "Коуч тимлидов" },
  { id: "scaling", label: "Масштабирование практики" },
  { id: "mentor", label: "Наставник" },
  { id: "expert", label: "Эксперт" },
  { id: "speaker", label: "Спикер" },
  { id: "teamlead", label: "Teamlead" },
];
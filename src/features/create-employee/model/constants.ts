import type { CompetencyOption } from "./types";

export const DEPARTMENT_OPTIONS = [
  { id: 1, value: "Отдел спецпроектов" },
  { id: 2, value: "Ивенты" },
  { id: 3, value: "Центр подготовки" },
  { id: 4, value: "Отдел регионального развития" },
  { id: 5, value: "Методология и аудит" },
  { id: 6, value: "Бизнес" },
  { id: 7, value: "Отдел поддержки" },
];

export const LEADER_OPTIONS = [
  { id: 1, value: "Ольга Смирнова" },
  { id: 2, value: "Анна Ковалева" },
  { id: 3, value: "Дмитрий Петров" },
  { id: 4, value: "Екатерина Михайлова" },
  { id: 5, value: "Сергей Иванов" },
];

export const CITY_OPTIONS = [
  { id: 1, value: "Москва" },
  { id: 2, value: "Санкт-Петербург" },
  { id: 3, value: "Казань" },
  { id: 4, value: "Уфа" },
  { id: 5, value: "Новосибирск" },
  { id: 6, value: "Екатеринбург" },
];

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
];
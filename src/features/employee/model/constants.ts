import type { TExpertiseFilterGroup } from "./types";
import type { TEmployeeStatus } from "@/entities/employee";

export const statusFilterOptions: { value: TEmployeeStatus; label: string }[] =
  [
    { value: "working", label: "В работе" },
    { value: "vacation", label: "В отпуске" },
    { value: "sick_leave", label: "На больничном" },
    { value: "business_trip", label: "В командировке" },
  ];

export const citiesFilterOptions: { value: string; label: string }[] = [
  { value: "moscow", label: "Москва" },
  { value: "saint-petersburg", label: "Санкт-Петербург" },
  { value: "voronezh", label: "Воронеж" },
  { value: "kaliningrad", label: "Калининград" },
  { value: "kazan", label: "Казань" },
  { value: "nizhny-novgorod", label: "Нижний Новгород" },
  { value: "yekaterinburg", label: "Екатеринбург" },
  { value: "novosibirsk", label: "Новосибирск" },
  { value: "samara", label: "Самара" },
  { value: "ufa", label: "Уфа" },
  { value: "perm", label: "Пермь" },
  { value: "krasnodar", label: "Краснодар" },
  { value: "rostov-on-don", label: "Ростов-на-Дону" },
  { value: "volgograd", label: "Волгоград" },
  { value: "chelyabinsk", label: "Челябинск" },
  { value: "krasnoyarsk", label: "Красноярск" },
  { value: "omsk", label: "Омск" },
  { value: "tyumen", label: "Тюмень" },
  { value: "sochi", label: "Сочи" },
  { value: "irkutsk", label: "Иркутск" },
  { value: "vladivostok", label: "Владивосток" },
  { value: "khabarovsk", label: "Хабаровск" },
  { value: "saratov", label: "Саратов" },
  { value: "tula", label: "Тула" },
  { value: "yaroslavl", label: "Ярославль" },
  { value: "tomsk", label: "Томск" },
];

export const expertiseFilterGroups: TExpertiseFilterGroup[] = [
  {
    key: "direction",
    title: "По направлению",
    options: [
      { value: "employment", label: "Трудоустройство" },
      { value: "social-franchise", label: "Социальная франшиза" },
      { value: "expertise-center", label: "Центр экспертизы" },
      { value: "fundraising-and-trainings", label: "Фандрайзинг и тренинги" },
      { value: "direction-additional-1", label: "Дополнительные данные-1" },
      { value: "direction-additional-2", label: "Дополнительные данные-2" },
      { value: "direction-additional-3", label: "Дополнительные данные-3" },
      { value: "direction-additional-4", label: "Дополнительные данные-4" },
      { value: "direction-additional-5", label: "Дополнительные данные-5" },
    ],
  },
  {
    key: "projectManager",
    title: "По менеджеру проекта",
    options: [
      {
        value: "krakavina-natalya-valerevna",
        label: "Кракавина Наталья Валерьевна",
      },
      {
        value: "chistyakova-svetlana-antonovna",
        label: "Чистякова Светлана Антоновна",
      },
      {
        value: "kandakova-evgeniya-evgenevna",
        label: "Кандакова Евгения Евгеньевна",
      },
      {
        value: "repina-elizaveta-nikolaevna",
        label: "Репина Елизавета Николаевна",
      },
      {
        value: "project-manager-additional-1",
        label: "Дополнительные данные-1",
      },
      {
        value: "project-manager-additional-2",
        label: "Дополнительные данные-2",
      },
      {
        value: "project-manager-additional-3",
        label: "Дополнительные данные-3",
      },
      {
        value: "project-manager-additional-4",
        label: "Дополнительные данные-4",
      },
      {
        value: "project-manager-additional-5",
        label: "Дополнительные данные-5",
      },
      {
        value: "project-manager-additional-6",
        label: "Дополнительные данные-6",
      },
      {
        value: "project-manager-additional-7",
        label: "Дополнительные данные-7",
      },
      {
        value: "project-manager-additional-8",
        label: "Дополнительные данные-8",
      },
      {
        value: "project-manager-additional-9",
        label: "Дополнительные данные-9",
      },
      {
        value: "project-manager-additional-10",
        label: "Дополнительные данные-10",
      },
      {
        value: "project-manager-additional-11",
        label: "Дополнительные данные-11",
      },
      {
        value: "project-manager-additional-12",
        label: "Дополнительные данные-12",
      },
    ],
  },
  {
    key: "projectParticipant",
    title: "По участнику проекта",
    options: [
      {
        value: "krylova-darya-olegovna",
        label: "Крылова Дарья Олеговна",
      },
      {
        value: "sokolova-mariya-sergeevna",
        label: "Соколова Мария Сергеевна",
      },
      {
        value: "vlasov-egor-borisovich",
        label: "Власов Егор Борисович",
      },
      {
        value: "nikolaev-petr-aleksandrovich",
        label: "Николаев Пётр Александрович",
      },
      {
        value: "project-participant-additional-1",
        label: "Дополнительные данные-1",
      },
      {
        value: "project-participant-additional-2",
        label: "Дополнительные данные-2",
      },
      {
        value: "project-participant-additional-3",
        label: "Дополнительные данные-3",
      },
      {
        value: "project-participant-additional-4",
        label: "Дополнительные данные-4",
      },
      {
        value: "project-participant-additional-5",
        label: "Дополнительные данные-5",
      },
      {
        value: "project-participant-additional-6",
        label: "Дополнительные данные-6",
      },
      {
        value: "project-participant-additional-7",
        label: "Дополнительные данные-7",
      },
      {
        value: "project-participant-additional-8",
        label: "Дополнительные данные-8",
      },
      {
        value: "project-participant-additional-9",
        label: "Дополнительные данные-9",
      },
      {
        value: "project-participant-additional-10",
        label: "Дополнительные данные-10",
      },
      {
        value: "project-participant-additional-11",
        label: "Дополнительные данные-11",
      },
      {
        value: "project-participant-additional-12",
        label: "Дополнительные данные-12",
      },
      {
        value: "project-participant-additional-13",
        label: "Дополнительные данные-13",
      },
      {
        value: "project-participant-additional-14",
        label: "Дополнительные данные-14",
      },
      {
        value: "project-participant-additional-15",
        label: "Дополнительные данные-15",
      },
      {
        value: "project-participant-additional-16",
        label: "Дополнительные данные-16",
      },
      {
        value: "project-participant-additional-17",
        label: "Дополнительные данные-17",
      },
    ],
  },
  {
    key: "availability",
    title: "Статус и доступность",
    options: [
      { value: "alumni-status", label: "Alumni статус" },
      {
        value: "completed-adaptation-cycle",
        label: "Прошёл полный цикл адаптации",
      },
      { value: "flexible-schedule", label: "Гибкий график возможно" },
      { value: "ready-for-business-trips", label: "Готов к командировкам" },
      { value: "availability-additional-1", label: "Дополнительные данные-1" },
      { value: "availability-additional-2", label: "Дополнительные данные-2" },
      { value: "availability-additional-3", label: "Дополнительные данные-3" },
      { value: "availability-additional-4", label: "Дополнительные данные-4" },
      { value: "availability-additional-5", label: "Дополнительные данные-5" },
    ],
  },
  {
    key: "expertise",
    title: "Навыки и компетенции",
    options: [
      { value: "volunteer-management", label: "Волонтёрский менеджмент" },
      { value: "fundraising", label: "Фандрайзинг" },
      { value: "grant-application", label: "Грантовая заявка" },
      { value: "methodical-development", label: "Методическая разработка" },
      { value: "hr-experience", label: "Опыт в HR" },
      { value: "research-interest", label: "Интерес к исследованиям" },
      { value: "webinar-speaker", label: "Спикер вебинаров" },
      { value: "english-b1", label: "Английский (B1)" },
      { value: "expertise-additional-1", label: "Дополнительные данные-1" },
      { value: "expertise-additional-2", label: "Дополнительные данные-2" },
      { value: "expertise-additional-3", label: "Дополнительные данные-3" },
      { value: "expertise-additional-4", label: "Дополнительные данные-4" },
      { value: "expertise-additional-5", label: "Дополнительные данные-5" },
      { value: "expertise-additional-6", label: "Дополнительные данные-6" },
      { value: "expertise-additional-7", label: "Дополнительные данные-7" },
      { value: "expertise-additional-8", label: "Дополнительные данные-8" },
    ],
  },
];

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


interface OrgUnit  {
    name: string;
    employeeCount?: number;
    items?: OrgUnit[];
}

const orgTree: OrgUnit[] = [
    {
      name: "УК",
      employeeCount: 3
    },
    {
      name: "Направления",
      items: [
        {
            name: "Социальная франшиза",
            items: [
                {
                  name: "Отдел регионального партнерства",
                  employeeCount: 6
                },
                {
                  name: "Отдел спецпроектов СФФ",
                  employeeCount: 3
                },
                {
                  name: "Ресурсный центр",
                  employeeCount: 4
                },
            ]
        },
        {
            name: "Трудоустройство",
            items: [
                
                {
                  name: "Корневая соц. практика",
                  employeeCount: 16
                },
                {
                  name: "Сопровождаемое трудоустройство в Москве",
                  employeeCount: 2
                },
                {
                  name: "Чейнжмейкеры",
                  employeeCount: 5
                },
                {
                  name: "Рекрутинг и подготовка к трудоустройству",
                  employeeCount: 5
                },
                {
                  name: "Рекрутинг и тренинги",
                  employeeCount: 2
                },
                {
                  name: "Центр подготовки",
                  employeeCount: 2
                },
                {
                  name: "Сопровождаемое трудоустройство в Москве",
                  employeeCount: 7
                },
                {
                  name: "Социально-психологические услуги",
                  employeeCount: 2
                },
            ]
        },
        {
            name: "Центр экспертизы",
            items: [
                {
                  name: "Методология и обучение",
                  employeeCount: 4
                },
            ]
        },
        {
            name: "Фандрайзинг и продажи",
            items: [
                {
                  name: "Бизнес",
                  employeeCount: 5
                },
                {
                  name: "Системные",
                  employeeCount: 4
                },
                {
                  name: "Гранты",
                  employeeCount: 1
                },
                {
                  name: "Частные",
                  employeeCount: 4
                },
                {
                  name: "Меценаты",
                  employeeCount: 2
                },
                {
                  name: "ФРиП с НКО",
                  employeeCount: 3
                },
            ]
        }
      ]
    },
    {
      name: "СИС",
      items: [
        {
            name: "Коммуникации",
            employeeCount: 9,
            items: [
            ]
        },
        {
            name: "Ивенты",
            employeeCount: 3,
        },
        {
            name: "Контент",
            employeeCount: 5,
        }

      ]
    },
    {
        name: "PR",
        employeeCount: 1,
    },
    {
        name: "HR",
        employeeCount: 5,
    },
    {
        name: "Бэк-офис: Администрирование",
        employeeCount: 10,
    },
    {
        name: "Бэк-офис: Бухгалтерия",
        employeeCount: 2,
    },
    {
        name: "Финансы",
        employeeCount: 3,
    },
    {
        name: "Оценка и мониторинг",
        employeeCount: 2,
    }
  ]

  export default orgTree;

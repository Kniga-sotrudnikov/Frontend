export type TEmployeeStatus = "active" | "vacation" | "sick" | "maternity";

export type TEmployee = {
  id: number;
  full_name: string;
  job_title: string;
  department_name: string;
  direction_name: string;
  photo_url: string;
  status: TEmployeeStatus;
  birthday_display: string;
  city: string;
  tags: string[];
  email_corporate?: string;
  email_personal?: string;
  phone_corporate?: string;
  phone_personal?: string;
  birthday?: string | Date;
  competencies?: string[];
  linear_manager?: string;
};

export type TShortEmployee = {
  id: number;
  name: string;
  job: string;
  photo: string;
};

export type EmployeeStatus = "working" | "bizTrip" | "vacation" | "sick";

export interface EmployeeData {
  id: number | string;
  city: string;
  linearManager: string;
  name: string;
  position: string;
  franchise: string;
  department: string;
  status: EmployeeStatus;
  photo?: string;
  isArchived?: boolean;
  emailCorporate?: string;
  emailPersonal?: string;
  phoneCorporate?: string;
  phonePersonal?: string;
  birthday?: string | Date;
  competencies?: string[];
}

//TODO: Разобраться с типами, они не совпадают с API, убрать дублирование типов, разложить их по нужным папкам
// Response и Request зачастую одинаковые, сократить, вывести отдельную сущность типа baseEmployee чтобы от неё наследовать EmployeeDetailAdminResponse, EmployeeDetailPublicResponse и TEmployeeShort

export type StatusEnum = "active" | "archived";

export type TTag = {
  id: number;
  name: string;
};

/**
 * Тип для списка сотрудников EmployeesList получаемый с бека
 *
 * ⚠️ НЕ ПОЛНОЕ СООТВЕТСТВИЕ API
 *
 * @todo Синхронизировать с бекендом
 *
 * Отсутствуют поля:
 *
 * -leader Это объект где должно быть написано имя руководителя, его должность и ссылка на фотографию
 *
 * -city
 *
 * -status для обозначения рабочего статуса, а не статуса архива сотрудника
 *
 * -favorite
 *
 * Лишние поля для маленькой карточки:
 *
 * -birthday_display
 *
 * -tags
 */
export type TEmployeeShort = {
  id: number;
  full_name: string;
  job_title: string;
  /**
   * Это "направление и сис" или отдел? Пока неизвестно
   */
  department_name: string;
  /**
   * Это подотдел? Пока неизвестно
   */
  direction_name: string | null;
  photo_url: string | null;
  /**
   * Это статус архивирования а не статус работы!
   */
  status: StatusEnum;
  birthday_display: string;
  tags: TTag[];
};

export type EmployeesListResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: TEmployeeShort[];
};

/**
 * Тип для сотрудника Employee отправляемый на бек
 *
 * ⚠️ НЕ ПОЛНОЕ СООТВЕТСТВИЕ API
 *
 * @todo Синхронизировать с бекендом
 *
 * Отсутствуют поля:
 *
 * -photo
 *
 * -status для обозначения рабочего статуса, а не статуса архива сотрудника
 *
 * -leader Это объект где должно быть написано имя руководителя, его должность и ссылка на фотографию
 *
 * -city
 *
 * -emailPersonal нужно чтобы было 2 почты - рабочая и личная
 *
 * -phonePersonal нужно чтобы было 2 телефона - рабочий и личный
 *
 * -resume ссылка на резюме
 *
 * -profileCRM ссылка на профиль в CRM
 *
 * -socialNetwork ссылка на соцсеть
 *
 */
export type CreateEmployeeRequest = {
  full_name: string;
  job_title: string;
  /**
   * Это блок "Роль"?
   *
   * По дизайну должен быть массивом строк
   */
  role_description?: string;
  email: string;
  phone?: string;
  /**
   * Это блок "Обо мне"?
   */
  interests?: string;
  /**
   * В начале проекта наставник бека сказал что будет принимать и отправлять дату в формате ISO, тут пока только string
   */
  birthday: string;
  /**
   * Я не знаю что значит user при отправке и почему у него тип number
   */
  user?: number | null;
  department: number;
  tags?: TTag[];
};

/**
 * Тип для сотрудника Employee получаемый с бека
 *
 * ⚠️ НЕ ПОЛНОЕ СООТВЕТСТВИЕ API
 *
 * @todo Синхронизировать с бекендом
 *
 * Все те же проблемы что и у типа CreateEmployeeRequest
 *
 * Также ещё отсутствуют поля:
 *
 * -id
 *
 * Должен возвращать EmployeeDetailAdminResponse, но бек не готов
 */
export type CreateEmployeeResponse = CreateEmployeeRequest & {};

/**
 * Тип для сотрудника Employee получаемый с бека
 *
 * ⚠️ НЕ ПОЛНОЕ СООТВЕТСТВИЕ API
 *
 * @todo Синхронизировать с бекендом
 *
 * Отсутствуют поля:
 *
 * -status для обозначения рабочего статуса, а не статуса архива сотрудника
 *
 * -leader Это объект где должно быть написано имя руководителя, его должность и ссылка на фотографию
 *
 * -city
 *
 * -emailPersonal нужно чтобы было 2 почты - рабочая и личная
 *
 * -phonePersonal нужно чтобы было 2 телефона - рабочий и личный
 *
 * -resume ссылка на резюме
 *
 * -profileCRM ссылка на профиль в CRM
 *
 * -socialNetwork ссылка на соцсеть
 *
 *
 * Лишнее поле birthday_display так как есть уже birthday
 */
export type EmployeeDetailAdminResponse = {
  id: number;
  full_name: string;
  job_title: string;
  department_name: string;
  direction_name: string | null;
  photo_url: string | null;
  status: StatusEnum;
  birthday_display: string | null;
  tags: TTag[];
  email: string;
  phone?: string;
  /**
   * Это блок "Обо мне"?
   */
  interests?: string;
  /**
   * В начале проекта наставник бека сказал что будет принимать и отправлять дату в формате ISO, тут пока только string
   */
  birthday: string;
  /**
   * Это блок "Роль"?
   *
   * По дизайну должен быть массивом строк
   */
  role_description?: string;
  department: number;
  created_at: string;
  updated_at: string;
  created_by?: number | null;
};

/**
 * Тип для сотрудника Employee отправляемый на бек
 *
 * ⚠️ НЕ ПОЛНОЕ СООТВЕТСТВИЕ API
 *
 * @todo Синхронизировать с бекендом
 *
 * Все те же проблемы что и у типа CreateEmployeeRequest
 *
 */
export type PatchEmployeeRequest = Partial<CreateEmployeeRequest> & {};

/**
 * Тип для сотрудника Employee получаемый с бека
 *
 * ⚠️ НЕ ПОЛНОЕ СООТВЕТСТВИЕ API
 *
 * @todo Синхронизировать с бекендом
 *
 * Все те же проблемы что и у типа CreateEmployeeRequest
 *
 * Должен возвращать EmployeeDetailAdminResponse, но бек не готов
 */
export type PatchEmployeeResponse = CreateEmployeeRequest & {};

/**
 * Тип для сотрудника Employee получаемый с бека
 *
 * ⚠️ НЕ ПОЛНОЕ СООТВЕТСТВИЕ API
 *
 * @todo Синхронизировать с бекендом
 *
 *  Отсутствуют поля:
 *
 * -status для обозначения рабочего статуса, а не статуса архива сотрудника
 *
 * -leader Это объект где должно быть написано имя руководителя, его должность и ссылка на фотографию
 *
 * -city
 *
 * -emailPersonal нужно чтобы было 2 почты - рабочая и личная
 *
 * -phonePersonal нужно чтобы было 2 телефона - рабочий и личный
 *
 * -resume ссылка на резюме
 *
 * -profileCRM ссылка на профиль в CRM
 *
 * -socialNetwork ссылка на соцсеть
 *
 *
 * Лишнее поле birthday_display так как есть уже birthday
 */
export type EmployeeDetailPublicResponse = {
  id: number;
  full_name: string;
  job_title: string;
  department_name: string;
  direction_name: string | null;
  photo_url: string | null;
  status: StatusEnum;
  birthday_display: string | null;
  tags: TTag[];
  email: string;
  phone?: string;
  /**
   * Это блок "Обо мне"?
   */
  interests?: string;
  /**
   * В начале проекта наставник бека сказал что будет принимать и отправлять дату в формате ISO, тут пока только string
   */
  birthday: string;
  /**
   * Это блок "Роль"?
   *
   * По дизайну должен быть массивом строк
   */
  role_description?: string;
  department: number;
};

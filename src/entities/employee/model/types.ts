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
export type BaseEmployeeRequestResponse = {
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
 * Тип для сотрудника Employee отправляемый на бек для создания сотрудника
 *
 * ⚠️ НЕ ПОЛНОЕ СООТВЕТСТВИЕ API, смотри родительский тип
 */
export type CreateEmployeeRequest = BaseEmployeeRequestResponse;

/**
 * Тип для сотрудника Employee получаемый с бека после создания сотрудника
 *
 * ⚠️ НЕ ПОЛНОЕ СООТВЕТСТВИЕ API, смотри родительский тип
 *
 * Также ещё отсутствуют поля:
 *
 * -id
 */
export type CreateEmployeeResponse = BaseEmployeeRequestResponse;

/**
 * Тип для сотрудника Employee отправляемый на бек для редактирования сотрудника
 *
 * ⚠️ НЕ ПОЛНОЕ СООТВЕТСТВИЕ API
 */
export type PatchEmployeeRequest = Partial<BaseEmployeeRequestResponse>;

/**
 * Тип для сотрудника Employee получаемый с бека после редактирования сотрудника
 *
 * ⚠️ НЕ ПОЛНОЕ СООТВЕТСТВИЕ API
 */
export type PatchEmployeeResponse = BaseEmployeeRequestResponse;

/**
 * Тип для сотрудника Employee получаемый с бека краткая информация
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
export type EmployeeShortResponse = {
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
  birthday_display: string | null;
  tags: TTag[];
};

/**
 * Тип для сотрудника Employee получаемый с бека полная информация
 *
 * ⚠️ НЕ ПОЛНОЕ СООТВЕТСТВИЕ API
 *
 * @todo Синхронизировать с бекендом
 *
 *  Отсутствуют поля:
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
export type EmployeeDetailResponse = EmployeeShortResponse & {
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

/**
 * Тип для сотрудника Employee получаемый с сервера с ролью employee
 *
 * ⚠️ НЕ ПОЛНОЕ СООТВЕТСТВИЕ API, смотри родительский тип
 */
export type EmployeeDetailPublicResponse = EmployeeDetailResponse;

/**
 * Тип для сотрудника Employee получаемый с сервера с ролью hr_admin
 *
 * ⚠️ НЕ ПОЛНОЕ СООТВЕТСТВИЕ API, смотри родительский тип
 */
export type EmployeeDetailAdminResponse = EmployeeDetailResponse & {
  created_at: string;
  updated_at: string;
  created_by?: number | null;
};

export type EmployeesListResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: EmployeeShortResponse[];
};

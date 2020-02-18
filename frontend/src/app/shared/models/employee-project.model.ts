/** Модель Проекта в котором участвует Сотрудник */
export interface EmployeeProject {
  _id: string;
  /** Название проекта */
  project: string;
  /** начало работы Сотрудника над Проектом */
  dateStart: string;
  /** конец работы Сотрудника над Проектом */
  dateEnd: string;
}

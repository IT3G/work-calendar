import { Employee } from './employee.model';
import { TaskModel } from './tasks.model';
import { AuthSetting } from './auth-setting.model';

/** данные для печати формы Отпуска */
export interface WorkHolidayPrint {
  user: Employee;
  task: TaskModel;
  settings: AuthSetting;
}

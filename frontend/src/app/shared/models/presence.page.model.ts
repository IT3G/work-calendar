import { Employee } from './employee.model';
import { TaskModel } from './tasks.model';
import { SendingTaskModel } from './sending-task.model';

export class PresenceModel {
  employee: Employee;
  tasks: SendingTaskModel[];
}

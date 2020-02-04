import { Employee } from './employee.model';
import { TaskModel } from './tasks.models';
import { SendingTaskModel } from './sending-task.model';

export class PresenceModel {
  employee: Employee;
  tasks: SendingTaskModel[];
}

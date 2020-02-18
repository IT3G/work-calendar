import { UserEntity } from '../../entity/entities/user.entity.model';
import { TaskEntity } from '../../entity/entities/task.request.model';

export class PresenceModel {
  employee: UserEntity;
  tasks: TaskEntity[];
}

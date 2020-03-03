import { TaskEntity } from '../../entity/entities/task.entity';
import { UserEntity } from '../../entity/entities/user.entity';

export class PresenceModel {
  employee: UserEntity;
  tasks: TaskEntity[];
}

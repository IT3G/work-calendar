import { TaskEntity } from '../../entity/entities/task.entity';
import { UserEntity } from '../../entity/entities/user.entity.model';

export class PresenceModel {
  employee: UserEntity;
  tasks: TaskEntity[];
}

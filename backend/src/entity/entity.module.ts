import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FollowSchema } from './schemas/follow.schemas';
import { HolidaysSchema } from './schemas/holidays.schemas';
import { JobPositionSchema } from './schemas/job-position.schemas';
import { ProjectOfficeSchema } from './schemas/project-office.schemas';
import { ProjectSchema } from './schemas/project.schemas';
import { RefreshTokenSchema } from './schemas/refresh-token.schema';
import { SettingsSchema } from './schemas/settings.schema';
import { SkillsSchema } from './schemas/skills.schemas';
import { SubdivisionSchema } from './schemas/subdivision.schemas';
import { TaskSchema } from './schemas/task.schemas';
import { UserSchema } from './schemas/user.schemas';
import { QuizzesSchema } from './schemas/quizzes.schemas';
import { UserQuizzesSchema } from './schemas/user-quizzes.schemas';

const mongoModule = MongooseModule.forFeature([
  { name: 'Users', schema: UserSchema },
  { name: 'JobPosition', schema: JobPositionSchema },
  { name: 'ProjectOffice', schema: ProjectOfficeSchema },
  { name: 'Project', schema: ProjectSchema },
  { name: 'Tasks', schema: TaskSchema },
  { name: 'Subdivision', schema: SubdivisionSchema },
  { name: 'Holidays', schema: HolidaysSchema },
  { name: 'Follow', schema: FollowSchema },
  { name: 'Settings', schema: SettingsSchema },
  { name: 'RefreshToken', schema: RefreshTokenSchema },
  { name: 'Skills', schema: SkillsSchema },
  { name: 'Quizzes', schema: QuizzesSchema },
  { name: 'UserQuizzes', schema: UserQuizzesSchema }
]);

@Module({
  imports: [mongoModule],
  exports: [mongoModule]
})
export class EntityModule {}

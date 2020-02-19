import { AvatarSourcePipe } from './avatar-source.pipe';
import { TransformTaskTypePipe } from './calendar/transform-task-type.pipe';
import { CurrentProjectsPipe } from './current-projects.pipe';
import { DatePipe } from './date.pipe';
import { TaskTypePipe } from './description-history/task-type.pipe';
import { FilterEmployeePipe } from './filter-employee.pipe';
import { IsCurrentDayPipe } from './is-current-day.pipe';
import { IsWeekendDayPipe } from './is-weekend-day.pipe';
import { UsernamePipe } from './username.pipe';
import { IsHolidayDataPipe } from './calendar/is-holidays-data.pipe';
import { FollowUsersFilterPipe } from './follow-users-fiter.pipe';
import { UsernameToArrPipe } from './username-to-arr.pipe';
import { IsHolidayDayForNgbModelPipe } from './calendar/is-holiday-day-for-ngb-model.pipe';
import { TaskTypeColorPipe } from './description-history/task-type-color.pipe';
import { SortTasksByDateStartPipe } from './sort-tasks-by-date-start.pipe';
import { CanDeleteTaskPipe } from './description-history/can-delete-task.pipe';

export const pipes = [
  UsernamePipe,
  DatePipe,
  TaskTypePipe,
  TransformTaskTypePipe,
  FilterEmployeePipe,
  AvatarSourcePipe,
  CurrentProjectsPipe,
  IsWeekendDayPipe,
  IsCurrentDayPipe,
  IsHolidayDataPipe,
  UsernameToArrPipe,
  FollowUsersFilterPipe,
  IsHolidayDayForNgbModelPipe,
  TaskTypeColorPipe,
  SortTasksByDateStartPipe,
  CanDeleteTaskPipe
];

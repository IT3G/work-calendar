import { AvatarSourcePipe } from './avatar-source.pipe';
import { IsHolidayDayForNgbModelPipe } from './calendar/is-holiday-day-for-ngb-model.pipe';
import { IsHolidayDataPipe } from './calendar/is-holidays-data.pipe';
import { TransformTaskTypePipe } from './calendar/transform-task-type.pipe';
import { ColorSubdivisionPipe } from './color-subdivision.pipe';
import { CurrentProjectsPipe } from './current-projects.pipe';
import { DatePipe } from './date.pipe';
import { CanDeleteTaskPipe } from './description-history/can-delete-task.pipe';
import { TaskTypePipe } from './description-history/task-type.pipe';
import { FilterEmployeePipe } from './filter-employee.pipe';
import { FollowUsersFilterPipe } from './follow-users-fiter.pipe';
import { IsCurrentDayPipe } from './is-current-day.pipe';
import { IsWeekendDayPipe } from './is-weekend-day.pipe';
import { SortTasksByDateStartPipe } from './sort-tasks-by-date-start.pipe';
import { UserForLocationPipe } from './user-for-location.pipe';
import { UsernameToArrPipe } from './username-to-arr.pipe';
import { UsernamePipe } from './username.pipe';

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
  SortTasksByDateStartPipe,
  CanDeleteTaskPipe,
  ColorSubdivisionPipe,
  UserForLocationPipe
];

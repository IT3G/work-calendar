import { AdminActionGuard } from './admin-action.guard';
import { TaskDeleteGuard } from './task-delete.guard';

export const guards = [AdminActionGuard, TaskDeleteGuard];

import { Employee } from '../../shared/models/employee.model';

export class ProjectDataModel {
  projectName: string;
  projectId: string;
  users: Employee[];
}

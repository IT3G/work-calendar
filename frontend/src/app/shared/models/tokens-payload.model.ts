import { Employee } from './employee.model';

export interface TokensPayload {
  accessKey: string;
  refreshToken: string;
  user: Employee;
}

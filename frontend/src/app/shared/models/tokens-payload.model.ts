import { Employee } from './employee.model';

export interface TokensPayload {
  accessToken: string;
  refreshToken: string;
  user: Employee;
}

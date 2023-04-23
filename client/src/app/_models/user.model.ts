export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  middleName: string;
  email: string;
  role: string;
  token: string;
  subdivisionId?: number;
  companyId?: number;
}

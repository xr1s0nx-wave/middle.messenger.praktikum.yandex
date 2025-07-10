export interface IUser {
  id: number;
  login: string;
  first_name?: string;
  second_name?: string;
  display_name?: string;
  email?: string;
  phone?: string;
  avatar?: string;
  [key: string]: unknown;
}

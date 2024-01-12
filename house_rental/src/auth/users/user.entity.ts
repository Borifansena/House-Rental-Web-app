
import { Role } from "./roles.enum";

export class User {
  username: string;
  password: string;
  roles: Role[];
}
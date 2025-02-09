import { eRole } from "@/_enums/role.enum";

export interface IMenuItem {
  icon: string;
  label: string;
  role: eRole;
  route?: string
}
import { MemberLevel } from "enum/Member";

export interface IMember {
  no: number;
  id: string;
  name: string;
  address: string;
  level: MemberLevel;
}

export interface IDriver extends IMember {
  is_delivering: boolean;
}
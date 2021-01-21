import { MemberLevel } from 'enum/Member';

export interface IMember {
  no: number;
  id: string;
  name: string;
  address: string;
  level: MemberLevel;
}

export interface IDriver extends IMember {
  isDelivering: boolean;
}

export interface ICustomer {
  address: string;
  id: string;
  idx: number;
  name: string;
  role: number;
}

export interface IDriver extends ICustomer {}

export interface INewDriverElement {
  id: string;
  name: string;
  phone: string;
  truckName: string;
  truckSize: string;
}

export interface INewCustomerElement {
  idx: number;
  name: string;
  address: string;
  phone: string;
}

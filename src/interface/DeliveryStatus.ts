import { ICustomer, IDriver } from './Member';

export interface IAllProductList {
  id: number;
  fk_client_id: string;
  fk_driver_id: string;
  distance: number;
  start_adress: string;
  deliveryState: number;
}

export interface IChangeDriverList {
  customerIdx: number;
  customerName: string;
  customerAddress: string;
  driverName: string;
  driverAddress: string;
  endOrderNumber: number | null;
  endTime: string | null;
}

export interface IDriverList {
  idx: number;
  id: string;
  isDelivering: Boolean;
  name: string;
  address: string;
  totalCount: number;
  completedCount: number;
  phone: string;
  truckNumber: string;
}

export interface IDeliveries {
  createdAt: string;
  customer: ICustomer;
  customerIdx: number;
  driver: IDriver;
  endOrderNumber: string | null;
  idx: number;
  image: string | null;
  productName: string;
}

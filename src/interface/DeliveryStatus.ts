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
  driverIdx: number;
  driverName: string;
  driverAddress: string;
  endOrderNumber: number | null;
  endTime: string | null;
}

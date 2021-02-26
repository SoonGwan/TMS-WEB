export interface IExcelItem {
  customerIdx: number;
  customerName: string;
  driverName: string;
  productName: string;
  driverId: string;
  createdAt: Date;
}

export interface IDeliveryItem {
  customerIdx: number | undefined;
  productName: string | undefined;
  id?: string | undefined;
  driverId?: string | undefined;
}

export interface ICustomerList {
  label: string;
  value: number;
}

export interface IDriverList {
  label: string;
  value: string;
}

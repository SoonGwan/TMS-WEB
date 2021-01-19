export interface IExcelItem {
  customerIdx: number;
  customerName: string;
  driverIdx: number;
  driverName: string;
  productName: string;
}

export interface IDeliveryItem {
  customerIdx: number | undefined;
  driverIdx: number | undefined;
  productName: string | undefined;
}

export interface ICustomerList {
  label: string;
  value: number;
}

export interface IDriverList {
  label: string;
  value: number;
}

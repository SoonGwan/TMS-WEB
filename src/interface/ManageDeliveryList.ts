export interface IExcelItem {
  customerIdx: number;
  customerName: string;
  driverIdx: number;
  driverName: string;
  productName: string;
}

export interface IDeliveryItem {
  customerIdx: number;
  driverIdx: number;
  productName: string;
}

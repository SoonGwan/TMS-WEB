export interface IRiderSocketLocation {
  data: {
    driverIdx: number;
    lat: number;
    long: number;
  };
  status?: number;
}

export interface IDeliveringList {
  key?: number;
  idx?: number;
  createdAt: string;
  customerIdx: number;
  customerName: string;
  customerAdress: string;
  driverIdx: number;
  driverName: string;
  endOrderNumber: string | null;
  endTime: string | null;
}

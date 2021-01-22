export interface IRiderSocketLocation {
  data: {
    lat: number;
    long: number;
    driverId: string;
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
  driverName: string;
  endOrderNumber: string | null;
  endTime: string | null;
}

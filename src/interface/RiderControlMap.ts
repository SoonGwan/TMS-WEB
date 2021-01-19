export interface IRiderSocketLocation {
  data: {
    driverIdx: number;
    lat: number;
    long: number;
  };
  status?: number;
}

import { IDriver } from "interface/Member";

class DriverRepository {
  async getDrivers(): Promise<IDriver[]> {
    const drivers: IDriver[] = [];
    for (var i = 0; i < 30; i += 1) {
      drivers.push({
        id: 'this_is_id' + i,
        username: '최진우',
        allow: false,
        delivery_status: 1,
      });
    }

    return drivers;
  }
}

export default new DriverRepository();
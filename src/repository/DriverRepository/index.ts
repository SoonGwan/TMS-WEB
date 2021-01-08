import { IDriver } from "interface/Member";

class DriverRepository {
  async getDrivers(): Promise<IDriver[]> {
    const drivers: IDriver[] = [];
    for (var i = 0; i < 30; i += 1) {
      const allow = i % 5 === 0 ? false : true;
      drivers.push({
        id: 'this_is_id' + i,
        username: '최진우',
        allow,
        delivery_status: 1,
      });
    }

    return drivers;
  }
}

export default new DriverRepository();
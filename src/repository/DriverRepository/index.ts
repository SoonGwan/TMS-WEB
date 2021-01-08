import { IDriver } from "interface/Member";

class DriverRepository {
  async getDrivers(): Promise<IDriver[]> {
    const drivers: IDriver[] = [];
    for (var i = 0; i < 30; i += 1) {
      const allow = i % 5 === 0 ? false : true;
      const delivery = i % 8 === 0 ? 1 : 0;

      drivers.push({
        id: 'this_is_id' + i,
        username: '최진우',
        allow,
        delivery_status: delivery,
      });
    }

    return drivers;
  }
}

export default new DriverRepository();
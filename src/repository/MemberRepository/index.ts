import { MemberLevel } from "enum/Member";
import { IDriver, IMember } from "interface/Member";

class MemberRepository {
  public members: IMember[] = [];

  constructor() {
    for (var i = 0; i < 30; i += 1) {
      this.members.push({
        no: i,
        level: MemberLevel.DRIVER,
        id: 'this_is_id' + i,
        name: '최진우',
        address: '서울 특별시 금천구 가산디지털로 1길 10-1 OO빌딩 1층',
      });
    }
  }
  async getDrivers(): Promise<IDriver[]> {
    return [
      {
        no: 1,
        level: MemberLevel.DRIVER,
        id: 'this_is_id',
        name: '최진우',
        address: '서울 특별시 금천구 가산디지털로 1길 10-1 OO빌딩 1층',
        is_delivering: false,
      },
      {
        no: 2,
        level: MemberLevel.DRIVER,
        id: 'this_is_id',
        name: '최진우',
        address: '서울 특별시 금천구 가산디지털로 1길 10-1 OO빌딩 1층',
        is_delivering: true,
      }
    ];
  }

  async getCustomers(): Promise<IMember[]> {
    return [
      {
        no: 2,
        level: MemberLevel.CUSTOMER,
        id: 'this_is_id2',
        name: '최진우2',
        address: '서울 특별시 금천구 가산디지털로 1길 10-1 OO빌딩 1층',
      }
    ];
  }
}

export default new MemberRepository();
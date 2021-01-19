import { IDriverDeliveryState } from 'interface/Map';
import io from 'socket.io-client';
class RiderControlMapRepository {
  async getDriversState(): Promise<IDriverDeliveryState[]> {
    const stateList: IDriverDeliveryState[] = [];

    for (let i = 0; i < 20; i++) {
      const state = i % 4 === 0 ? 1 : 0;

      stateList.push({
        id: i,
        state,
        adress: '주소가 들어갑니다?',
        time: 'YYYY-MM-DD HH:mm:ss',
      });
    }

    return stateList;
  }
}

export default new RiderControlMapRepository();

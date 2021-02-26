import { atom, RecoilState } from 'recoil';

export const TrackDriverInfoModal: RecoilState<any> = atom({
  key: 'TrackDriverInfoModal',
  default: false,
});

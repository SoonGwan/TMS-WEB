import React from 'react';
import './RiderStatusList.scss';
import RiderStatusListItemTemp from './RiderStatusListItemTemp/RiderStatusListItemTemp';

const RiderStatusList = () => {
  return (
    <>
      <div className="RiderStatusHeader">최근 배차 리스트</div>
      <div className="RiderStatusList">
        <div className="RiderStatusList-Header">
          <div className="RiderStatusList-Header-Idx">번호</div>
          <div className="RiderStatusList-Header-Status">
            드라이버
            <br />
            배달상태
          </div>
          <div className="RiderStatusList-Header-Adress">배달 주소</div>
          <div className="RiderStatusList-Header-Time">배달 시간</div>
        </div>
        <div className="RiderStatusList-ItemsWrapper">
          <RiderStatusListItemTemp />
        </div>
      </div>
    </>
  );
};

export default RiderStatusList;

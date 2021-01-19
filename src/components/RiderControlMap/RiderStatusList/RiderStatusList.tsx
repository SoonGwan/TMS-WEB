import React from 'react';
import './RiderStatusList.scss';
import RiderStatusListItemTemplate from './RiderStatusListItemTemplate';

const RiderStatusList = () => {
  return (
    <>
      <div className="RiderStatusHeader">배달중인 리스트</div>
      <div className="RiderStatusList">
        <div className="RiderStatusList-Header">
          <div className="RiderStatusList-Header-Idx">고객</div>
          <div className="RiderStatusList-Header-Status">기사</div>
          <div className="RiderStatusList-Header-Adress">주소</div>
          <div className="RiderStatusList-Header-Time">배송 출발</div>
        </div>
        <div className="RiderStatusList-ItemsWrapper"></div>
      </div>
    </>
  );
};

export default RiderStatusList;

import React from 'react';
import './RiderList.scss';

const RiderList = () => {
  return (
    <>
      <div className="RiderListHeader">라이더</div>
      <div className="RiderList">
        <div className="RiderList-Header">
          <div className="RiderList-Header-Name">이름</div>
          <div className="RiderList-Header-Phone">전화번호</div>
          <div className="RiderList-Header-Allotment">배당 갯수</div>
          <div className="RiderList-Header-InfoButton">자세히 보기</div>
        </div>
      </div>
    </>
  );
};

export default RiderList;

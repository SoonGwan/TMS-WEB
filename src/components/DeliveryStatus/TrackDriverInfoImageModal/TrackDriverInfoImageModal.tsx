import React from 'react';
import './TrackDriverInfoImageModal.scss';
import { IMG_SERVER } from 'config/config.json';

interface ITrackDriverInfoImageModal {
  openModal: () => void;
  img: string | null;
}

const TrackDriverInfoImageModal = ({
  openModal,
  img,
}: ITrackDriverInfoImageModal) => {
  const imgHost = `${IMG_SERVER}/static/${img}`;
  return (
    <div className="TrackDriverInfoImageModal">
      <div className="TrackDriverInfoImageModal-Wrapper"></div>
      <div className="TrackDriverInfoImageModal-Modal">
        <img src={imgHost} alt={imgHost} onClick={() => openModal()} />
      </div>
    </div>
  );
};

export default TrackDriverInfoImageModal;

import React, {
  DragEvent as ReactDragEvent,
  useState,
} from 'react';
import { FileDrop } from 'react-file-drop';
import { useBeforeunload } from 'react-beforeunload';
import classNames from 'classnames/bind';
import { ClassNamesFn } from 'classnames/types';

interface IManageDeliveryList {
  onDropFile: (
    files: FileList | null,
    event: ReactDragEvent<HTMLDivElement>
  ) => void;
  uploadFileName: string;
  excelList: JSX.Element[];
  handleExportMemberExcel: () => void;
  handleDeliveryCreation: () => void;
  openModal: () => void;
  onFileChanged: (e: any) => void;
}

const style = require('./ManageDeliveryList.scss');
const cx: ClassNamesFn = classNames.bind(style);

const ManageDeliveryList = ({
  onDropFile,
  uploadFileName,
  excelList,
  handleExportMemberExcel,
  handleDeliveryCreation,
  openModal,
  onFileChanged,
}: IManageDeliveryList) => {
  useBeforeunload((event) => event.preventDefault());
  const [drag, setDrag] = useState(false);
  return (
    <div className="ManageDeliveryList">
      <div className="ManageDeliveryList-ImportCSVWrapper">
        <div className="ManageDeliveryList-ImportCSVWrapper-ImportSection">
          <input
            className={cx('ExcelUpload', {
              'ExcelUpload-drag': drag === true,
            })}
            type="file"
            onChange={onFileChanged}
          />
          <FileDrop
            onFrameDragEnter={() => setDrag(true)}
            onFrameDrop={() => setDrag(false)}
            onDrop={onDropFile}
          >
            <div className="ManageDeliveryList-ImportCSVWrapper-ImportSection-DropDown">
              {uploadFileName}
            </div>
          </FileDrop>
        </div>
        <div className="ManageDeliveryList-ImportCSVWrapper-Section">
          <div
            className="ManageDeliveryList-ImportCSVWrapper-ApplyButton"
            onClick={handleDeliveryCreation}
          >
            업로드 하기
          </div>
          <div
            className="ManageDeliveryList-ImportCSVWrapper-ApplyButton"
            onClick={handleExportMemberExcel}
          >
            유저정보 보기
          </div>
        </div>
      </div>
      <div className="ManageDeliveryList-ViewExcelList">
        <div className="ManageDeliveryList-ViewExcelList-Header">
          <div className="ManageDeliveryList-ViewExcelList-Header-Wrapper">
            <div className="ManageDeliveryList-OpenModal" onClick={openModal}>
              따로 물품 업로드 하기
            </div>
          </div>
          <div className="ManageDeliveryList-ViewExcelList-Header-Client">
            고객 이름, 고유번호
          </div>
          <div className="ManageDeliveryList-ViewExcelList-Header-Driver">
            배송기사 이름, 아이디
          </div>
          <div className="ManageDeliveryList-ViewExcelList-Header-Product">
            물품 정보
          </div>
        </div>
        <div className="ManageDeliveryList-ViewExcelList-ListWrapper">
          {excelList}
        </div>
      </div>
    </div>
  );
};

export default ManageDeliveryList;

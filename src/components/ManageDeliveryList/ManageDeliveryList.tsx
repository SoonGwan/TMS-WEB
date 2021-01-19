import React, { DragEvent as ReactDragEvent, MutableRefObject } from 'react';
import './ManageDeliveryList.scss';
import { FileDrop } from 'react-file-drop';
import { useBeforeunload } from 'react-beforeunload';

interface IManageDeliveryList {
  onFileInputChage: (evnet: DragEvent) => void;
  onDropFile: (
    files: FileList | null,
    event: ReactDragEvent<HTMLDivElement>
  ) => void;
  uploadFileName: string;
  excelList: JSX.Element[];
  handleExportExcel: () => void;
  handleDeliveryCreation: () => void;
}

const ManageDeliveryList = ({
  onFileInputChage,
  onDropFile,
  uploadFileName,
  excelList,
  handleExportExcel,
  handleDeliveryCreation,
}: IManageDeliveryList) => {
  useBeforeunload((event) => event.preventDefault());

  return (
    <div className="ManageDeliveryList">
      <div className="ManageDeliveryList-ImportCSVWrapper">
        <div className="ManageDeliveryList-ImportCSVWrapper-ImportSection">
          <FileDrop
            onFrameDragEnter={(event) => onFileInputChage(event)}
            onFrameDragLeave={(event) => onFileInputChage(event)}
            onFrameDrop={(event) => onFileInputChage(event)}
            onDrop={(event, files) => onDropFile(event, files)}
          >
            <div className="ManageDeliveryList-ImportCSVWrapper-ImportSection-DropDown">
              {uploadFileName}
            </div>
          </FileDrop>
        </div>
        <div className="ManageDeliveryList-ImportCSVWrapper-Section">
          <div
            className="ManageDeliveryList-ImportCSVWrapper-ApplyButton"
            onClick={() => handleDeliveryCreation()}
          >
            업로드 하기
          </div>
          <div
            className="ManageDeliveryList-ImportCSVWrapper-ApplyButton"
            onClick={handleExportExcel}
          >
            유저정보 보기
          </div>
        </div>
      </div>
      <div className="ManageDeliveryList-ViewExcelList">
        <div className="ManageDeliveryList-ViewExcelList-Header">
          <div className="ManageDeliveryList-ViewExcelList-Header-Client">
            고객 고유번호 (고객 이름)
          </div>
          <div className="ManageDeliveryList-ViewExcelList-Header-Driver">
            드라이버 고유번호 (드라이버 이름)
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

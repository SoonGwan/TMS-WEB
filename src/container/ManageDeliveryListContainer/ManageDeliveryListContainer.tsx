import React, { useState, DragEvent as ReactDragEvent, useRef } from 'react';
import ManageDeliveryList from 'components/ManageDeliveryList';
import XLSX from 'xlsx';
import { IExcelItem } from 'interface/ManageDeliveryList';
import ManageDeliveryListInnerItemTemplate from 'components/ManageDeliveryList/ManageDeliveryListInnerItemTemplate';

const ManageDeliveryListContainer = () => {
  const [uploadFileName, setUploadFileName] = useState('');
  const [excelToJSON, setExcelToJSON] = useState<IExcelItem[]>([]);

  const onFileInputChage = (event: DragEvent) => {
    /**
     * 추후 필요한 로직이 들어갈 함수입니다.
     */
  };

  const onDropFile = (
    files: FileList | null,
    event: ReactDragEvent<HTMLDivElement>
  ) => {
    if (files !== null && files.length > 0) {
      setUploadFileName(files[0].name);

      for (let i = 0; i !== files.length; i += 1) {
        let file = files[i];

        const reader: FileReader = new FileReader();

        reader.onload = () => {
          const data = reader.result;
          const workbook = XLSX.read(data, { type: 'binary' });

          workbook.SheetNames.forEach((item) => {
            const excelToJson: IExcelItem[] = XLSX.utils.sheet_to_json(
              workbook.Sheets[item]
            );
            setExcelToJSON(excelToJson);
          });
        };

        reader.readAsBinaryString(file);
      }
    }
  };

  const excelList = excelToJSON.map((data: IExcelItem) => {
    const { id, fk_client_id, fk_driver_id, distance, start_adress } = data;
    return (
      <>
        <ManageDeliveryListInnerItemTemplate
          id={id}
          fk_client_id={fk_client_id}
          fk_driver_id={fk_driver_id}
          distance={distance}
          start_adress={start_adress}
        />
      </>
    );
  });

  return (
    <>
      <ManageDeliveryList
        onFileInputChage={onFileInputChage}
        onDropFile={onDropFile}
        uploadFileName={uploadFileName || 'import React from '}
        excelList={excelList}
      />
    </>
  );
};

export default ManageDeliveryListContainer;

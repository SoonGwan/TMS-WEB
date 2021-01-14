import React, { useState, DragEvent as ReactDragEvent, useRef } from 'react';
import ManageDeliveryList from 'components/ManageDeliveryList';
import XLSX from 'xlsx';
import { IExcelItems } from 'interface/ManageDeliveryList';
import ManageDeliveryListInnerItemTemplate from 'components/ManageDeliveryList/ManageDeliveryListInnerItemTemplate';

const ManageDeliveryListContainer = () => {
  const [uploadFileName, setUploadFileName] = useState('');
  const [excelToJSON, setExcelToJSON] = useState<IExcelItems[]>([]);

  const onFileInputChage = (event: DragEvent) => {
    /**
     * 추후 필요한 로직이 들어갈 함수입니다.
     */
  };

  const onDropFile = (
    files: FileList | null,
    event: ReactDragEvent<HTMLDivElement>
  ) => {
    let i;
    let f;
    if (files !== null) {
      setUploadFileName(files[0].name);

      for (i = 0; i !== files.length; ++i) {
        f = files[i];

        const reader: FileReader = new FileReader();

        reader.onload = () => {
          const data = reader.result;
          const workbook = XLSX.read(data, { type: 'binary' });

          workbook.SheetNames.forEach((item) => {
            const EXCEL_JSON: IExcelItems[] = XLSX.utils.sheet_to_json(
              workbook.Sheets[item]
            );
            setExcelToJSON(EXCEL_JSON);
          });
        };

        reader.readAsBinaryString(f);
      }
    }
  };

  const excelList = excelToJSON.map((data: IExcelItems) => {
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

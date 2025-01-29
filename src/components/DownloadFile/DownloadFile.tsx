'use client';

import React, { useEffect, useState, useMemo, useLayoutEffect } from 'react';
import dynamic from 'next/dynamic';
import styles from './DownloadFile.module.css';
import ButtonDownloadFile from '../ButtonDownloadFile/ButtonDownloadFile';
import TabsComponent from '../Tabs/Tabs';
import { TabsProps } from 'antd';

interface TabsComponentProps {
  itemsTabs: TabsProps['items'];

}

const DownloadFile = (props: any) => {
  const { itemsTabs, setCurrent } = props;

  return (
    <div className={styles?.container}>
      <div className={styles?.title}>Descarga</div>

      <div className="buttondownload">
        <ButtonDownloadFile
          fileurl="/files/basic/LlakaScript.xlsx"
          label="Descargar hoja de datos"
        />

        <ButtonDownloadFile
          fileurl="/files/basic/LlakaScript.xlsx"
          label="Manual de uso"
        />
      </div>

      <br />
      <span style={{ color: 'white' }}>Los datos cargados en el excel modifican el comportamiento de la plataforma</span>
      <span style={{ color: 'white' }}>Información de los datos agregados a la hoja de calculo</span>

      <div className={styles?.tabsContainer}>
        <TabsComponent itemsTabs={itemsTabs} />
      </div>
      <br />
      <button onClick={() => setCurrent(1)} className={styles?.selectButton}>
        Siguiente
      </button>

    </div>
  );
};

export default DownloadFile;

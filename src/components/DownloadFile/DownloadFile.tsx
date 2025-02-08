'use client';

import React, { useEffect, useState, useMemo, useLayoutEffect } from 'react';
import styles from './DownloadFile.module.css';
import ButtonDownloadFile from '../ButtonDownloadFile/ButtonDownloadFile';

const DownloadFile = (props: any) => {
  const { setCurrent } = props;

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

      <br />


      <hr />
      <button onClick={() => setCurrent(1)} className={styles?.selectButton}>
        Siguiente
      </button>

    </div>
  );
};

export default DownloadFile;

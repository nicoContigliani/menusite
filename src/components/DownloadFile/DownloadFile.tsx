"use client";

import type React from "react";
import styles from "./DownloadFile.module.css";
import ButtonDownloadFile from "../ButtonDownloadFile/ButtonDownloadFile";
import { Grid, Paper } from "@mui/material";
import { ArrowRight } from "lucide-react";

interface DownloadFileProps {
  setCurrent: (value: number) => void;
}

const DownloadFile: React.FC<DownloadFileProps> = ({ setCurrent }) => {
  return (
    <div className={styles.wrapper}>
      <Paper elevation={0} className={styles.container}>
        <h1 className={styles.title}>Descarga</h1>

        <div className={styles.content}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <div className={styles.downloadCard}>
                <h3 className={styles.cardTitle}>Hoja de datos</h3>
                <p className={styles.cardDescription}>
                  Descarga la plantilla para cargar tus datos. Los datos cargados en el excel modifican el
                  comportamiento de la plataforma.
                </p>
                <ButtonDownloadFile
                  fileurl="/files/basic/LlakaScript.xlsx"
                  label="Descargar hoja de datos"
                  className={styles.downloadButton}
                />
              </div>
            </Grid>

            <Grid item xs={12} md={6}>
              <div className={styles.downloadCard}>
                <h3 className={styles.cardTitle}>Manual de uso</h3>
                <p className={styles.cardDescription}>
                  Descarga el manual con instrucciones detalladas sobre cómo completar la hoja de datos correctamente.
                </p>
                <ButtonDownloadFile
                  fileurl="/files/basic/LlakaScript.xlsx"
                  label="Manual de uso"
                  className={styles.downloadButton}
                />
              </div>
            </Grid>
          </Grid>

          <div className={styles.infoSection}>
            <p className={styles.infoText}>
              Los datos cargados en el excel modifican el comportamiento de la plataforma. Asegúrate de seguir las
              instrucciones del manual para completar correctamente la información.
            </p>
          </div>
        </div>

        <div className={styles.actionSection}>
          <button onClick={() => setCurrent(1)} className={styles.nextButton}>
            Siguiente
            <ArrowRight className={styles.buttonIcon} size={18} />
          </button>
        </div>
      </Paper>
    </div>
  );
};

export default DownloadFile;
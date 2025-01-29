"use client";

import { useState, useRef, useEffect } from "react";
import { storage } from "../../../firebase/client";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  listAll,
  deleteObject,
} from "firebase/storage";
import { ReadExcelFile } from "../../services/readExcelFile";
import styles from "./UploadImageToStorage.module.css";

const UploadImageToStorage = (props: any) => {
  const {
    imageFiles,
    setImageFiles,
    xlsxFile,
    setXlsxFile,
    isUploading,
    setIsUploading,
    progressUpload,
    setProgressUpload,
    downloadURLs,
    setDownloadURLs,
    dataFileXLSX,
    setDataFileXLSX,
    setCurrent,
    setShowUploadImageToStorage,
    setDataResult,
    dataResult
  } = props;

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleSelectedFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const imageFilesArray = Array.from(files).filter((file) =>
        file.type.startsWith("image/")
      );
      const xlsxFile = Array.from(files).find((file) => file.name.endsWith(".xlsx"));

      setImageFiles(imageFilesArray);
      setXlsxFile(xlsxFile || null);
      setDownloadURLs([]);
      setProgressUpload(0);
    }
  };

  const handleUploadFiles = async () => {
    if (xlsxFile && imageFiles.length > 0) {
      setIsUploading(true);
      const storageFolder = "companiesFolders/";

      const totalFiles = imageFiles.length + 1;
      let uploadedFiles = 0;

      let dataImage: { nameFile: string; urlFileFirebase: string, dataKey: string }[] = [];
      let data: Record<string, any[]> = {};

      try {
        // Leer el archivo XLSX
        data = await ReadExcelFile(xlsxFile);
        setDataFileXLSX(data);

        const companyName = xlsxFile.name.replace(".xlsx", "");
        const folderPath = `${storageFolder}${companyName}`;
        const folderRef = ref(storage, folderPath);

        // Borrar la carpeta si ya existe
        const existingFiles = await listAll(folderRef);
        const deletePromises = existingFiles.items.map((fileRef) => deleteObject(fileRef));
        await Promise.all(deletePromises);

        // Subir el archivo XLSX
        const xlsxRef = ref(storage, `${folderPath}/${xlsxFile.name}`);
        const xlsxUploadTask = uploadBytesResumable(xlsxRef, xlsxFile);

        await new Promise<void>((resolve, reject) => {
          xlsxUploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) / totalFiles;
              setProgressUpload((prev: any) => prev + progress * 100);
            },
            reject,
            () => {
              getDownloadURL(xlsxUploadTask.snapshot.ref).then((url) => {
                setDownloadURLs((prevURLs: any) => [...prevURLs, url]);
                uploadedFiles++;
                setProgressUpload((uploadedFiles / totalFiles) * 100);
                resolve();
              });
            }
          );
        });

        // Subir las imágenes
        for (const [index, imageFile] of imageFiles.entries()) {
          await new Promise<void>((resolve, reject) => {
            const imageName = imageFile.name;
            const storageRef = ref(storage, `${folderPath}/${imageName}`);
            const uploadTask = uploadBytesResumable(storageRef, imageFile);

            uploadTask.on(
              "state_changed",
              (snapshot) => {
                const progress =
                  (snapshot.bytesTransferred / snapshot.totalBytes) / totalFiles;
                setProgressUpload((prev: any) => prev + progress * 100);
              },
              reject,
              () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                  dataImage.push({ nameFile: imageName, urlFileFirebase: url, dataKey: imageName.split('.')[0] });
                  setDownloadURLs((prevURLs: any) => [...prevURLs, url]);
                  uploadedFiles++;
                  setProgressUpload((uploadedFiles / totalFiles) * 100);
                  resolve();

                  // Log último archivo cargado
                  if (uploadedFiles === totalFiles) {
                    setCurrent(2)
                    // console.log("Último archivo cargado:", {
                    //   xlsxData: data,
                    //   imageFiles: dataImage,
                    // });

                    setDataResult({ xlsxData: data, imageFiles: dataImage })




                  }
                });
              }
            );
          });
        }



        return { dataFileXLSX: data, dataImage };
      } catch (error) {
        alert("Error processing the XLSX file or deleting the folder.");
        console.error(error);
      } finally {
        setIsUploading(false);
      }
    } else {
      alert("Please select an XLSX file and at least one image.");
    }
  };

  const handleRemoveFiles = () => {
    setImageFiles([]);
    setXlsxFile(null);
    setDownloadURLs([]);
    setDataFileXLSX({});
    setProgressUpload(0);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

 
  return (
    <div className={styles.container}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,.xlsx"
        onChange={handleSelectedFiles}
        multiple
        className={styles.inputFile}
      />

      <div className={styles.buttonContainer}>
        <button
          onClick={async () => {
            const result = await handleUploadFiles();
            console.log(result);
          }}
          className={styles.button}
          disabled={isUploading}
        >
          {isUploading ? "Uploading..." : "Upload Files"}
        </button>
        <button
          onClick={handleRemoveFiles}
          className={styles.button}
          disabled={isUploading}
        >
          Remove Files
        </button>
      </div>

      <div className={styles.progressBar}>
        <div
          style={{
            width: `${Math.min(progressUpload, 100)}%`,
            backgroundColor: "#000f807c",
            height: "100%",
            borderRadius: "5px",
            transition: "width 0.3s ease",
          }}
        />
      </div>
      <div>
        {downloadURLs.length > 0 && (
          <div className={styles.imageContainer}>
            {downloadURLs.map((url: any, index: any) => (
              <div key={index} className={styles.fileItem}>
                {`Uploaded file ${index + 1}`}

                {url.includes(".xlsx") ? (
                  <div className={styles.fileIcon}>
                    📄{" "}
                    <a href={url} target="_blank" rel="noopener noreferrer">
                      Download XLSX
                    </a>
                  </div>
                ) : (
                  <img src={url} alt={`Uploaded file ${index + 1}`} className={styles.image} />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadImageToStorage;

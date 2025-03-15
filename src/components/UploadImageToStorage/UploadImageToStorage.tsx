"use client"
import Image from "next/image"
import { useEffect, useState } from "react"
import { supabase } from "../../../lib/supabaseClient"
import { Upload, Button } from "antd"
import { UploadOutlined } from "@ant-design/icons"
import type { UploadChangeParam } from "antd/es/upload/interface"

import styles from "./UploadImageToStorage.module.css"
import { ReadExcelFile } from "@/services/readExcelFile"
import { replaceImageUrls } from "@/services/UploadImageUrl.services"
import { transformExtras } from "@/services/TransformedMenuItem.services"

export default function UploadImagesToStorage(props: any) {
  const { setDataResult, setCurrent, uploadedFiles, setUploadedFiles, folderName, setFolderName } = props
  const [files, setFiles] = useState<FileList | null>(null)
  // const [folderName, setFolderName] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  // const [uploadedFiles, setUploadedFiles] = useState<any | any[] | undefined>([])
  const [uploadProgress, setUploadProgress] = useState(0); // State for progress


  const [uploadedObjects, setUploadedObjects] = useState<any[]>([])
  const [excelData, setExcelData] = useState<Record<string, any[]> | null>(null) // New state for Excel data




  const handleFileChange = async (info: UploadChangeParam<any>) => {
    const selectedFiles: any | any[] | undefined = info.fileList.map((file) => file.originFileObj)
    if (selectedFiles.length === 0) return

    const xlsxFile = selectedFiles.find((file: any) => file.name.endsWith(".xlsx"))
    if (xlsxFile) {
      setFolderName(xlsxFile.name.replace(".xlsx", ""))
      try {
        // Read the Excel file and store the data in state
        const data: any = await ReadExcelFile(xlsxFile)

        //TODO acá va la regla de negocio para contar objetos(cuantas fotos se suben y cuantos items, parte de lo que se cobra)


        const sidata: any = await transformExtras(data)
        setExcelData(sidata)  // Store the parsed Excel data
      } catch (err) {
        setError("Error al leer el archivo Excel.")
      }
    }

    setFiles(selectedFiles)
  }

  const deleteFolderContents = async (bucketName: string, folderPath: string) => {
    try {
      const { data, error } = await supabase.storage.from(bucketName).list(folderPath)
      if (error) throw error

      const deletePromises = data?.map((file) => {
        const filePath = `${folderPath}/${file.name}`
        return supabase.storage.from(bucketName).remove([filePath])
      })

      if (deletePromises) {
        await Promise.all(deletePromises)
      }
    } catch (err) {
      console.error("Error al eliminar los archivos:", err)
    }
  }

  const uploadFiles = async () => {


    if (!files || !folderName) {
      setError("Por favor, selecciona un archivo .xlsx y las imágenes.")
      return
    }

    setUploading(true)
    setError(null)
    setUploadedFiles([])

    const bucketName = "llakaScriptBucket"
    const basePath = `companiesFolders/${folderName}`

    await deleteFolderContents(bucketName, basePath)

    try {
      await supabase.storage.from(bucketName).upload(`${basePath}/.keep`, new Blob([]))
    } catch (error) {
      // Ignore error if already exists
    }
    const totalFiles = files.length;

    for (let i = 0; i < totalFiles; i++) { // Use a loop with index
      const file = files[i];
      const filePath = `${basePath}/${file.name}`

      try {
        const { data, error } = await supabase.storage.from(bucketName).upload(filePath, file, { upsert: true })

        if (error) throw error

        const { data: urlData } = supabase.storage.from(bucketName).getPublicUrl(filePath)

        if (urlData) {
          setUploadedFiles((prev: any) => [...prev, { nameFile: file?.name, urlFileSupabase: urlData?.publicUrl }])
        }
        const currentProgress = Math.round(((i + 1) / totalFiles) * 100);
        setUploadProgress(currentProgress);
      } catch (err) {
        console.error("Error al subir el archivo:", err)
        setError("Error al subir los archivos. Inténtalo de nuevo.")
        break
      }


    }

    setUploading(false)
  }


  useEffect(() => {
    if (uploadedFiles.length > 0 && excelData && uploadProgress === 100) {
      const si = replaceImageUrls(excelData, uploadedFiles)
      setDataResult(si)
      setCurrent(2)

    }
  }, [uploadedFiles, excelData, uploadProgress])




  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <h4 className={styles.titleApp}>Subir Archivos a Supabase</h4>

        {folderName && (
          <div className={styles.textContainer}>
            <span>
              Carpeta creada: <strong>{`companiesFolders/${folderName}`}</strong>
            </span>
          </div>
        )}
        <Upload
          className={styles.uploadInput}
          multiple
          accept=".xlsx,image/*"
          beforeUpload={() => false}
          onChange={handleFileChange}
        >
          <Button className={styles.button} icon={<UploadOutlined />}>
            Seleccionar Archivos
          </Button>
        </Upload>

        {uploading && (
          <div>
            <div>Subiendo archivos: {uploadProgress}%</div>
            <progress value={uploadProgress} max="100" /> {/* Progress bar */}
          </div>
        )}

        <Button onClick={uploadFiles} disabled={uploading} className={styles.uploadButton}>
          {uploading ? "Subiendo..." : "Subir Archivos"}
        </Button>

        {error && <p className={styles.error}>{error}</p>}

        {uploadedFiles.length > 0 && (
          <div className={styles.uploadedFilesContainer}>
            <h3>Archivos Subidos:</h3>
            <div className={styles.uploadedFilesList}>
              {uploadedFiles.map((url: any, index: any) => (
                <div key={index} className={styles.uploadedFileItem}>
                  {url.urlFileSupabase.includes(".xlsx") ? (
                    <span className={styles.fileIcon}>📄</span>
                  ) : (
                    <Image
                      src={url.urlFileSupabase || "/placeholder.svg"}
                      width={150}
                      height={150}
                      alt={`Imagen subida ${index}`}
                      className={styles.uploadedImage}
                    />
                  )}
                  <a href={url.urlFileSupabase} target="_blank" rel="noopener noreferrer" className={styles.fileLink}>
                    {url.urlFileSupabase.split("/").pop()}
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* {excelData && (
          <div className={styles.excelDataContainer}>
            <h3>Datos del Excel:</h3>
            <pre>{JSON.stringify(excelData, null, 2)}</pre>
          </div>
        )} */}
      </div>
    </div>
  )
}

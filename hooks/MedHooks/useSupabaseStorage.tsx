

// "use client"

// import { useState, useEffect, useCallback } from "react"
// import { useDispatch } from "react-redux"
// import { supabase } from "../../lib/supabaseClient"
// import { showToast } from "../../store/toastSlice"

// type FileObject = {
//   name: string
//   url: string
//   type: string
// }

// type UploadOptions = {
//   upsert?: boolean
//   cacheControl?: string
//   contentType?: string
// }

// type UseSupabaseStorageConfig = {
//   bucketName: string
//   basePath?: string
//   onUploadProgress?: (progress: number) => void
//   onUploadComplete?: (uploadedFiles: FileObject[]) => void
//   onError?: (error: string) => void
//   defaultUploadOptions?: UploadOptions
//   keepFile?: boolean
//   showToastMessages?: boolean
// }

// export const useSupabaseStorage = (config: UseSupabaseStorageConfig) => {
//   const {
//     bucketName,
//     basePath = "",
//     onUploadProgress,
//     onUploadComplete,
//     onError,
//     defaultUploadOptions = { upsert: true },
//     keepFile = false,
//     showToastMessages = true,
//   } = config

//   const dispatch = useDispatch()
//   const [files, setFiles] = useState<File[] | null>(null)
//   const [uploading, setUploading] = useState(false)
//   const [error, setError] = useState<string | null>(null)
//   const [uploadProgress, setUploadProgress] = useState(0)
//   const [uploadedFiles, setUploadedFiles] = useState<FileObject[]>([])
//   const [currentFolder, setCurrentFolder] = useState<string>(basePath)

//   // Reset state when bucketName or basePath changes
//   useEffect(() => {
//     setFiles(null)
//     setUploading(false)
//     setError(null)
//     setUploadProgress(0)
//     setUploadedFiles([])
//     setCurrentFolder(basePath)
//   }, [bucketName, basePath])

//   const showToastMessage = useCallback(
//     (message: string, type: "success" | "error" | "info" | "warning") => {
//       if (showToastMessages) {
//         dispatch(showToast({ message, type }))
//       }
//     },
//     [dispatch, showToastMessages],
//   )

//   const handleFilesChange = useCallback((newFiles: File[]) => {
//     setFiles(newFiles)
//     setError(null)
//   }, [])

//   const setFolder = useCallback((folderName: string) => {
//     setCurrentFolder(folderName)
//   }, [])

//   const listFiles = useCallback(
//     async (path: string = currentFolder): Promise<FileObject[]> => {
//       try {
//         const { data, error } = await supabase.storage.from(bucketName).list(path)
//         if (error) throw error
//         return data.map((file) => ({
//           name: file.name,
//           url: "", // URL needs to be fetched separately if public
//           type: file.metadata ? file.metadata.mimetype : "unknown",
//         }))
//       } catch (err) {
//         const errorMessage = `Error listing files: ${err instanceof Error ? err.message : String(err)}`
//         setError(errorMessage)
//         onError?.(errorMessage)
//         showToastMessage(errorMessage, "error")
//         return []
//       }
//     },
//     [bucketName, currentFolder, onError, showToastMessage],
//   )

//   const getFileUrl = useCallback(
//     async (filePath: string): Promise<string> => {
//       try {
//         const { data } = supabase.storage.from(bucketName).getPublicUrl(filePath)
//         return data.publicUrl
//       } catch (err) {
//         const errorMessage = `Error getting file URL: ${err instanceof Error ? err.message : String(err)}`
//         setError(errorMessage)
//         onError?.(errorMessage)
//         showToastMessage(errorMessage, "error")
//         return ""
//       }
//     },
//     [bucketName, onError, showToastMessage],
//   )

//   const deleteFile = useCallback(
//     async (filePath: string): Promise<boolean> => {
//       try {
//         const { error } = await supabase.storage.from(bucketName).remove([filePath])
//         if (error) throw error
//         showToastMessage("File deleted successfully", "success")
//         return true
//       } catch (err) {
//         const errorMessage = `Error deleting file: ${err instanceof Error ? err.message : String(err)}`
//         setError(errorMessage)
//         onError?.(errorMessage)
//         showToastMessage(errorMessage, "error")
//         return false
//       }
//     },
//     [bucketName, onError, showToastMessage],
//   )

//   const deleteFolder = useCallback(
//     async (folderPath: string = currentFolder): Promise<boolean> => {
//       try {
//         const { data, error } = await supabase.storage.from(bucketName).list(folderPath)
//         if (error) throw error
//         const filesToDelete = data.map((file) => `${folderPath}/${file.name}`)
//         if (filesToDelete.length > 0) {
//           const { error: deleteError } = await supabase.storage.from(bucketName).remove(filesToDelete)
//           if (deleteError) throw deleteError
//         }
//         showToastMessage("Folder contents deleted successfully", "success")
//         return true
//       } catch (err) {
//         const errorMessage = `Error deleting folder contents: ${err instanceof Error ? err.message : String(err)}`
//         setError(errorMessage)
//         onError?.(errorMessage)
//         showToastMessage(errorMessage, "error")
//         return false
//       }
//     },
//     [bucketName, currentFolder, onError, showToastMessage],
//   )

//   const uploadFiles = useCallback(
//     async (
//       filesToUpload: File[] = files || [],
//       options: UploadOptions = defaultUploadOptions,
//       folder: string = currentFolder,
//     ): Promise<FileObject[] | null> => {
//       if (!filesToUpload || filesToUpload.length === 0) {
//         const errorMessage = "No files selected for upload"
//         setError(errorMessage)
//         onError?.(errorMessage)
//         showToastMessage(errorMessage, "error")
//         return null
//       }
//       setUploading(true)
//       setError(null)
//       setUploadedFiles([])
//       setUploadProgress(0)
//       try {
//         // Create folder if it doesn't exist (by uploading a dummy file if folder is not empty)
//         if (folder && !keepFile && filesToUpload.length > 0) {
//           // Check if folder exists and is not empty before deleting
//           const existingFiles = await listFiles(folder)
//           if (existingFiles.length > 0) {
//             await deleteFolder(folder)
//           }
//           // Upload a dummy .keep file to ensure folder creation if it's truly empty
//           await supabase.storage.from(bucketName).upload(`${folder}/.keep`, new Blob([]), { upsert: true })
//         }

//         const totalFiles = filesToUpload.length
//         const uploaded: FileObject[] = []
//         for (let i = 0; i < totalFiles; i++) {
//           const file = filesToUpload[i]
//           const filePath = folder ? `${folder}/${file.name}` : file.name
//           try {
//             const { error } = await supabase.storage.from(bucketName).upload(filePath, file, options)
//             if (error) throw error
//             const { data: urlData } = supabase.storage.from(bucketName).getPublicUrl(filePath)
//             if (urlData) {
//               const fileObj = {
//                 name: file.name,
//                 url: urlData.publicUrl,
//                 type: file.type,
//               }
//               uploaded.push(fileObj)
//               setUploadedFiles((prev) => [...prev, fileObj])
//             }
//             const currentProgress = Math.round(((i + 1) / totalFiles) * 100)
//             setUploadProgress(currentProgress)
//             onUploadProgress?.(currentProgress)
//           } catch (err) {
//             console.error("Error uploading file:", err)
//             const errorMessage = `Error uploading ${file.name}: ${err instanceof Error ? err.message : String(err)}`
//             setError(errorMessage)
//             onError?.(errorMessage)
//             showToastMessage(errorMessage, "error")
//             break // Stop further uploads if one fails
//           }
//         }
//         showToastMessage("Files uploaded successfully", "success")
//         onUploadComplete?.(uploaded)
//         return uploaded
//       } catch (err) {
//         const errorMessage = `Upload failed: ${err instanceof Error ? err.message : String(err)}`
//         setError(errorMessage)
//         onError?.(errorMessage)
//         showToastMessage(errorMessage, "error")
//         return null
//       } finally {
//         setUploading(false)
//       }
//     },
//     [
//       files,
//       bucketName,
//       currentFolder,
//       defaultUploadOptions,
//       keepFile,
//       onUploadComplete,
//       onError,
//       onUploadProgress,
//       showToastMessage,
//       deleteFolder,
//       listFiles,
//     ],
//   )

//   const updateFile = useCallback(
//     async (
//       oldPath: string,
//       newFile: File,
//       options: UploadOptions = defaultUploadOptions,
//     ): Promise<FileObject | null> => {
//       try {
//         setUploading(true)
//         setError(null)
//         // First delete the old file
//         await deleteFile(oldPath)
//         // Then upload the new file to the same path
//         const filePath = oldPath
//         const { error } = await supabase.storage.from(bucketName).upload(filePath, newFile, options)
//         if (error) throw error
//         const { data: urlData } = supabase.storage.from(bucketName).getPublicUrl(filePath)
//         if (!urlData) throw new Error("Failed to get public URL")
//         const fileObj = {
//           name: newFile.name,
//           url: urlData.publicUrl,
//           type: newFile.type,
//         }
//         showToastMessage("File updated successfully", "success")
//         return fileObj
//       } catch (err) {
//         const errorMessage = `Error updating file: ${err instanceof Error ? err.message : String(err)}`
//         setError(errorMessage)
//         onError?.(errorMessage)
//         showToastMessage(errorMessage, "error")
//         return null
//       } finally {
//         setUploading(false)
//       }
//     },
//     [bucketName, defaultUploadOptions, deleteFile, onError, showToastMessage],
//   )

//   const createFolder = useCallback(
//     async (folderPath: string): Promise<boolean> => {
//       try {
//         // Supabase implicitly creates folders when a file is uploaded.
//         // To "create" an empty folder, we upload a dummy .keep file.
//         const dummyFilePath = `${folderPath}/.keep`
//         const { error } = await supabase.storage.from(bucketName).upload(dummyFilePath, new Blob([]), { upsert: true })
//         if (error) throw error
//         showToastMessage(`Folder '${folderPath}' created successfully`, "success")
//         return true
//       } catch (err) {
//         const errorMessage = `Error creating folder '${folderPath}': ${err instanceof Error ? err.message : String(err)}`
//         setError(errorMessage)
//         onError?.(errorMessage)
//         showToastMessage(errorMessage, "error")
//         return false
//       }
//     },
//     [bucketName, onError, showToastMessage],
//   )

//   const renameFile = useCallback(
//     async (oldPath: string, newPath: string): Promise<FileObject | null> => {
//       try {
//         setUploading(true) // Use uploading state for this operation too
//         setError(null)
//         const { data, error } = await supabase.storage.from(bucketName).move(oldPath, newPath)
//         if (error) throw error

//         // Get the public URL for the new path
//         const { data: urlData } = supabase.storage.from(bucketName).getPublicUrl(newPath)
//         if (!urlData) throw new Error("Failed to get public URL for renamed file")

//         const fileObj = {
//           name: newPath.split("/").pop() || "", // Extract file name from new path
//           url: urlData.publicUrl,
//           type: "", // Type might not be directly available from move operation, could fetch metadata if needed
//         }
//         showToastMessage(`File '${oldPath}' renamed to '${newPath}' successfully`, "success")
//         return fileObj
//       } catch (err) {
//         const errorMessage = `Error renaming file from '${oldPath}' to '${newPath}': ${err instanceof Error ? err.message : String(err)}`
//         setError(errorMessage)
//         onError?.(errorMessage)
//         showToastMessage(errorMessage, "error")
//         return null
//       } finally {
//         setUploading(false)
//       }
//     },
//     [bucketName, onError, showToastMessage],
//   )

//   const downloadFile = useCallback(
//     async (filePath: string, fileName?: string): Promise<boolean> => {
//       try {
//         const { data, error } = await supabase.storage.from(bucketName).download(filePath)
//         if (error) throw error
//         if (!data) throw new Error("No data received for download")

//         const url = URL.createObjectURL(data)
//         const a = document.createElement("a")
//         a.href = url
//         a.download = fileName || filePath.split("/").pop() || "download" // Use provided fileName or extract from path
//         document.body.appendChild(a)
//         a.click()
//         document.body.removeChild(a)
//         URL.revokeObjectURL(url) // Clean up the object URL
//         showToastMessage(`File '${fileName || filePath}' downloaded successfully`, "success")
//         return true
//       } catch (err) {
//         const errorMessage = `Error downloading file '${filePath}': ${err instanceof Error ? err.message : String(err)}`
//         setError(errorMessage)
//         onError?.(errorMessage)
//         showToastMessage(errorMessage, "error")
//         return false
//       }
//     },
//     [bucketName, onError, showToastMessage],
//   )

//   return {
//     // State
//     files,
//     uploading,
//     error,
//     uploadProgress,
//     uploadedFiles,
//     currentFolder,
//     // Setters
//     setFiles: handleFilesChange,
//     setFolder,
//     // Actions
//     uploadFiles,
//     updateFile,
//     deleteFile,
//     deleteFolder,
//     listFiles,
//     getFileUrl,
//     createFolder, // New
//     renameFile, // New
//     downloadFile, // New
//     // Helpers
//     reset: () => {
//       setFiles(null)
//       setUploading(false)
//       setError(null)
//       setUploadProgress(0)
//       setUploadedFiles([])
//     },
//   }
// }



"use client"

import { useState, useEffect, useCallback } from "react"
import { useDispatch } from "react-redux"
import { supabase } from "../../lib/supabaseClient"
import { showToast } from "../../store/toastSlice"

type FileObject = {
  name: string
  url: string
  type: string
}

type UploadOptions = {
  upsert?: boolean
  cacheControl?: string
  contentType?: string
}

type UseSupabaseStorageConfig = {
  onUploadProgress?: (progress: number) => void
  onUploadComplete?: (uploadedFiles: FileObject[]) => void
  onError?: (error: string) => void
  defaultUploadOptions?: UploadOptions
  showToastMessages?: boolean
}

export const useSupabaseStorage = (config: UseSupabaseStorageConfig) => {
  const {
    onUploadProgress,
    onUploadComplete,
    onError,
    defaultUploadOptions = { upsert: true },
    showToastMessages = true,
  } = config

  const dispatch = useDispatch()
  const [files, setFiles] = useState<File[] | null>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadedFiles, setUploadedFiles] = useState<FileObject[]>([])

  const showToastMessage = useCallback(
    (message: string, type: "success" | "error" | "info" | "warning") => {
      if (showToastMessages) {
        dispatch(showToast({ message, type }))
      }
    },
    [dispatch, showToastMessages],
  )

  const handleFilesChange = useCallback((newFiles: File[]) => {
    setFiles(newFiles)
    setError(null)
  }, [])

  const uploadFiles = useCallback(
    async (
      filesToUpload: File[],
      username: string,
      folderPath: string = "",
      options: UploadOptions = defaultUploadOptions
    ): Promise<FileObject[] | null> => {
      if (!filesToUpload || filesToUpload.length === 0) {
        const errorMessage = "No files selected for upload"
        setError(errorMessage)
        onError?.(errorMessage)
        showToastMessage(errorMessage, "error")
        return null
      }

      setUploading(true)
      setError(null)
      setUploadedFiles([])
      setUploadProgress(0)

      try {
        const bucketName = "llakaScriptBucket"
        const fullPath = "userDocuments/" +username + (folderPath ? `/${folderPath}` : "")
        
        // Verificar si el usuario existe creando un archivo .keep si es necesario
        await supabase.storage
          .from(bucketName)
          .upload(`userDocuments/${username}/.keep`, new Blob([]), { upsert: true })

        const totalFiles = filesToUpload.length
        const uploaded: FileObject[] = []

        for (let i = 0; i < totalFiles; i++) {
          const file = filesToUpload[i]
          const filePath = `${fullPath}/${file.name}`

          try {
            const { error } = await supabase.storage
              .from(bucketName)
              .upload(filePath, file, options)

            if (error) throw error

            const { data: urlData } = supabase.storage
              .from(bucketName)
              .getPublicUrl(filePath)

            if (urlData) {
              const fileObj = {
                name: file.name,
                url: urlData.publicUrl,
                type: file.type,
              }
              uploaded.push(fileObj)
              setUploadedFiles((prev) => [...prev, fileObj])
            }

            const currentProgress = Math.round(((i + 1) / totalFiles) * 100)
            setUploadProgress(currentProgress)
            onUploadProgress?.(currentProgress)
          } catch (err) {
            console.error("Error uploading file:", err)
            const errorMessage = `Error uploading ${file.name}: ${err instanceof Error ? err.message : String(err)}`
            setError(errorMessage)
            onError?.(errorMessage)
            showToastMessage(errorMessage, "error")
            break
          }
        }

        showToastMessage("Files uploaded successfully", "success")
        onUploadComplete?.(uploaded)
        return uploaded
      } catch (err) {
        const errorMessage = `Upload failed: ${err instanceof Error ? err.message : String(err)}`
        setError(errorMessage)
        onError?.(errorMessage)
        showToastMessage(errorMessage, "error")
        return null
      } finally {
        setUploading(false)
      }
    },
    [defaultUploadOptions, onUploadComplete, onError, onUploadProgress, showToastMessage]
  )

  const getFileUrl = useCallback(
    async (username: string, filePath: string): Promise<string> => {
      try {
        const { data } = supabase.storage
          .from("user-documents")
          .getPublicUrl(`${username}/${filePath}`)
        return data.publicUrl
      } catch (err) {
        const errorMessage = `Error getting file URL: ${err instanceof Error ? err.message : String(err)}`
        setError(errorMessage)
        onError?.(errorMessage)
        showToastMessage(errorMessage, "error")
        return ""
      }
    },
    [onError, showToastMessage]
  )

  const deleteFile = useCallback(
    async (username: string, filePath: string): Promise<boolean> => {
      try {
        const { error } = await supabase.storage
          .from("user-documents")
          .remove([`${username}/${filePath}`])
        if (error) throw error
        showToastMessage("File deleted successfully", "success")
        return true
      } catch (err) {
        const errorMessage = `Error deleting file: ${err instanceof Error ? err.message : String(err)}`
        setError(errorMessage)
        onError?.(errorMessage)
        showToastMessage(errorMessage, "error")
        return false
      }
    },
    [onError, showToastMessage]
  )

  return {
    files,
    uploading,
    error,
    uploadProgress,
    uploadedFiles,
    setFiles: handleFilesChange,
    uploadFiles,
    getFileUrl,
    deleteFile,
    reset: () => {
      setFiles(null)
      setUploading(false)
      setError(null)
      setUploadProgress(0)
      setUploadedFiles([])
    },
  }
}
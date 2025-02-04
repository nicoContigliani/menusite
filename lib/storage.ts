import { supabase } from "./supabaseClient";

export const uploadFiles = async (files: File[], bucketName: string) => {
  const uploadedFiles = [];

  for (const file of files) {
    try {
      const filePath = `${Date.now()}-${file.name}`;
      const { data, error } = await supabase.storage.from(bucketName).upload(filePath, file);

      if (error) throw error;

      uploadedFiles.push({
        id: data.id,
        path: data.path,
        fullPath: data.fullPath,
      });
    } catch (error) {
      console.error(`Error al subir ${file.name}:`, error);
    }
  }

  return uploadedFiles;
};

// services/ReadExcelFile.ts
import * as XLSX from "xlsx";

export async function ReadExcelFile(file: File): Promise<Record<string, any[]>> {
  try {
    // Usamos FileReader para leer el archivo en el cliente
    const reader = new FileReader();
    
    return new Promise((resolve, reject) => {
      reader.onload = () => {
        const data = reader.result as ArrayBuffer;
        const workbook = XLSX.read(data, { type: "array" });
        
        const sheetData: Record<string, any[]> = {};
        workbook.SheetNames.forEach((sheetName) => {
          const sheet = workbook.Sheets[sheetName];
          sheetData[sheetName] = XLSX.utils.sheet_to_json(sheet);
        });

        resolve(sheetData);
      };

      reader.onerror = (error) => reject(error);
      
      reader.readAsArrayBuffer(file);
    });
  } catch (error) {
    console.error("Error al leer el archivo Excel:", error);
    throw new Error("No se pudo leer el archivo Excel.");
  }
}

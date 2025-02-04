interface ImageFile {
  nameFile: string;
  urlFileFirebase: string;
}

interface Item {
  Background_Image: string;
  Item_Image: string;
  [key: string]: any; // Allow other properties
}

interface XLSXData {
  [key: string]: Item[];
}

interface DataInitial {
  xlsxData: XLSXData;
  imageFiles: ImageFile[];
}

interface UpdatedData {
  xlsxData: XLSXData;
}

export const replaceImageUrls = (excelData: any | any[], uploadedFiles: any | any[]) => {
  const imageMap = new Map<string, string>(uploadedFiles.map((img:any) => [img.nameFile, img.urlFileSupabase]));

  const updatedExcelData = Object.fromEntries(
    Object.entries(excelData).map(([key, items]:any) => [
      key,
      items.map((item:any) => {
        const updatedItem = { ...item };

        if ("Background_Image" in item) {
          updatedItem.Background_Image = imageMap.get(item.Background_Image) || item.Background_Image;
        }

        if ("Item_Image" in item) {
          updatedItem.Item_Image = imageMap.get(item.Item_Image) || item.Item_Image;
        }

        if ("IconBrand" in item) {
          updatedItem.IconBrand = imageMap.get(item.IconBrand) || item.IconBrand;
        }

        return updatedItem;
      }),
    ])
  );

  return updatedExcelData;
};
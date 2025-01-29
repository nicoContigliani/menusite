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

export const replaceImageUrls = (dataInitial: DataInitial): UpdatedData => {

//   if (!dataInitial.imageFiles) {
//     console.error('dataImage is undefined');
//     return { xlsxData: dataInitial.xlsxData }; // Return original xlsxData
//   }

  const { xlsxData, imageFiles } = dataInitial;
  console.log("🚀 ~ replaceImageUrls ~ xlsxData, imageFiles:", xlsxData, imageFiles)
  const imageMap = new Map<string, string>(imageFiles.map(img => [img.nameFile, img.urlFileFirebase]));

  const updatedDataFileXLSX = Object.fromEntries(
    Object.entries(xlsxData).map(([key, items]) => [
      key,
      items.map(item => ({
        ...item,
        Background_Image: imageMap.get(item.Background_Image) || item.Background_Image,
        Item_Image: imageMap.get(item.Item_Image) || item.Item_Image,
      })),
    ])
  );

  return {
    xlsxData: updatedDataFileXLSX,
  };
};

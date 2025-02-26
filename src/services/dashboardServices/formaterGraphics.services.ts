export const formaterGraphics = async (data: any) => {
    const formattedData = [];
  
    // Recorremos el objeto `data`
    for (const category in data) {
      // Si el valor es un número, agregamos una entrada para la categoría
      if (typeof data[category] === 'number') {
        formattedData.push({
          name: category,
          value: data[category],
        });
      }
      // Si el valor es un objeto, recorremos las claves de este objeto
      else if (typeof data[category] === 'object') {
        for (const item in data[category]) {
          formattedData.push({
            name: `${category} - ${item}`,
            value: data[category][item],
          });
        }
      }
    }
  
    return formattedData;
  };
  
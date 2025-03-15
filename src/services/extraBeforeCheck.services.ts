export const extraBeforeCheck = (extra: string | null | undefined): Array<{ name: string; price: number }> => {
    // Si extra es null o undefined, devuelve un array vacío
    if (!extra) {
      return [];
    }
  
    // Divide la cadena por comas y procesa cada elemento
    return extra.split(',').map((item) => {
      // Divide cada elemento por ":" para separar el nombre y el precio
      const [name, price] = item.split(':');
  
      // Retorna un objeto con el nombre y el precio convertido a número
      return {
        name: name.trim(), // Elimina espacios en blanco alrededor del nombre
        price: parseInt(price.trim(), 10), // Convierte el precio a número
      };
    });
  };
export const localhostStorage = (data: any) => {
    if (typeof window !== "undefined") { // Verifica si estamos en el cliente
        Object.entries(data).forEach(([key, value]) => {
            localStorage.setItem(key, JSON.stringify(value));
        });
    } else {
        console.warn("localStorage no está disponible en el servidor.");
    }
};


// export const getLocalhostStorage = () => {
//     const data: Record<string, any> = {}; // Objeto para almacenar los valores

//     Object.keys(localStorage).forEach((key) => {
//         try {
//             data[key] = JSON.parse(localStorage.getItem(key) as string); // Intenta parsear JSON
//         } catch {
//             data[key] = localStorage.getItem(key); // Si falla, almacena como string
//         }
//     });

//     return data;
// };

export const getLocalhostStorage = () => {
    const data: Record<string, any> = {}; // Objeto para almacenar los valores

    Object.keys(localStorage).forEach((key) => {
        try {
            data[key] = JSON.parse(localStorage.getItem(key) as string); // Intenta parsear JSON
        } catch {
            data[key] = localStorage.getItem(key); // Si falla, almacena como string
        }
    });

    return data;
};



export const clearLocalhostStorage = () => {
    localStorage.clear();
};
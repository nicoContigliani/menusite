export const stringclean = (str: string | null | undefined): string => {
    if (!str) return ""; // Si es null o undefined, devuelve una cadena vacía
    return str.replace(/['"]/g, ''); // Elimina comillas simples y dobles
};
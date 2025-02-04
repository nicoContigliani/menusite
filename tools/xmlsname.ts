export const xmlsname = async (files: FileList | { name: string }[]) => {
    for (const file of files) {
        if ('name' in file && file.name.endsWith(".xlsx")) {
            return file.name.slice(0, -5); // Elimina los últimos 5 caracteres (".xlsx")
        }
    }
    return null;
};
const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const charLength = characters.length;

export const generateCode = (length: number = 8): string =>  Array.from({ length }, () => characters[Math.floor(Math.random() * charLength)]).join("");

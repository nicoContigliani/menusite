import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.NEXT_PUBLIC_JWT_SECRET || "supersecreto123";

/**
 * Genera un token JWT
 * @param payload - Datos a incluir en el token
 * @returns Token firmado
 */
export const generateToken = (payload: object): string => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
};

/**
 * Verifica y decodifica un token JWT
 * @param token - Token a verificar
 * @returns Datos del usuario si el token es válido
 */
export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    return null;
  }
};

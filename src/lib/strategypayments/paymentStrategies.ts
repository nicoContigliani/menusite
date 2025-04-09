// Definimos un tipo para los props de pago
export type PaymentProps = {
    amount: number;
    currency: string;
    // Puedes añadir más campos comunes aquí
    userEmail?: string;
    orderId?: string;
  };
  
  // Tipo para las estrategias de pago
  export type PaymentStrategy = (props: PaymentProps) => Promise<{ success: boolean; message: string }>;
  
  // Estrategia para tarjeta de crédito
  export const creditCard: PaymentStrategy = async (props) => {
    console.log(`Procesando pago con tarjeta de ${props.amount} ${props.currency}`);
    // Lógica real de pago con tarjeta
    return { success: true, message: "Pago con tarjeta procesado" };
  };
  
  // Estrategia para efectivo
  export const cash: PaymentStrategy = async (props) => {
    console.log(`Registrando pago en efectivo de ${props.amount} ${props.currency}`);
    // Lógica para registrar pago en efectivo
    return { success: true, message: "Pago en efectivo registrado" };
  };
  
  // Estrategia para transferencia
  export const transfer: PaymentStrategy = async (props) => {
    console.log(`Iniciando transferencia de ${props.amount} ${props.currency}`);
    // Lógica para procesar transferencia
    return { success: true, message: "Transferencia iniciada" };
  };
  
  // Estrategia para pasarela de pago
  export const paymentGateway: PaymentStrategy = async (props) => {
    console.log(`Conectando con pasarela para pago de ${props.amount} ${props.currency}`);
    // Lógica para conectar con pasarela de pago
    return { success: true, message: "Pasarela de pago procesando" };
  };
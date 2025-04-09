import { PaymentStrategy, PaymentProps } from './paymentStrategies';

export const processPayment = async (
  strategy: PaymentStrategy,
  props: PaymentProps
) => {
  try {
    console.log("Iniciando procesamiento de pago...");
    const result = await strategy(props);
    console.log("Pago procesado:", result.message);
    return result;
  } catch (error) {
    console.error("Error procesando pago:", error);
    return { success: false, message: "Error procesando el pago" };
  }
};
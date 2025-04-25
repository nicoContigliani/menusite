import { useState } from 'react';

interface UseOrderUpdatesReturn {
  updateCompleteOrder: (orderId?:any,orderData?: any) => Promise<any>;
  isUpdating: boolean;
  updateError: string | null;
  successMessage: string | null;
  clearMessages: () => void;
}

export const useOrderUpdatesGeneral = (): UseOrderUpdatesReturn => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);



  const updateOrder = async (orderId: string, updates: Record<string, any>) => {
    setIsUpdating(true);
    setUpdateError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch(`/api/orders?id=${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      const responseText = await response.text();

      if (!response.ok) {
        let errorMessage = `Error ${response.status}: ${response.statusText}`;
        try {
          const errorData = JSON.parse(responseText);
          errorMessage = errorData.message || errorData.error || errorMessage;
        } catch {
          if (responseText) {
            errorMessage = responseText;
          }
        }
        throw new Error(errorMessage);
      }

      const result = responseText ? JSON.parse(responseText) : { success: true };
      setSuccessMessage(`Orden actualizada correctamente.`);
      return result;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error desconocido al actualizar la orden';
      setUpdateError(message);
      console.error("Error updating order:", error);
      throw error;
    } finally {
      setIsUpdating(false);
    }
  };

  const updateCompleteOrder = async (orderId:any,orderData: any) => {
    if (!orderData?.id) {
      const error = 'El objeto de orden debe contener un ID';
      setUpdateError(error);
      throw new Error(error);
    }
    return updateOrder(orderId||orderData.id, orderData);
  };

  const clearMessages = () => {
    setUpdateError(null);
    setSuccessMessage(null);
  };

  return {
    updateCompleteOrder,
    isUpdating,
    updateError,
    successMessage,
    clearMessages,
  };
};

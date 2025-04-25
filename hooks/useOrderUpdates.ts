// import { useState } from 'react';

// interface UseOrderUpdatesReturn {
//   updateOrderStatus: (orderId: string, newStatus: string) => Promise<any>;
//   bulkUpdateOrders: (orderIds: string[], newStatus: string) => Promise<any>;
//   isUpdating: boolean;
//   updateError: string | null;
//   successMessage: string | null;
//   clearMessages: () => void;
//   setUpdateError: (error: string | null) => void; // Añadimos esta línea
// }

// export const useOrderUpdates = (): UseOrderUpdatesReturn => {
//   const [isUpdating, setIsUpdating] = useState(false);
//   const [updateError, setUpdateError] = useState<string | null>(null);
//   const [successMessage, setSuccessMessage] = useState<string | null>(null);

//   const updateOrderStatus = async (orderId: string, newStatus: string) => {
//     setIsUpdating(true);
//     setUpdateError(null);
//     setSuccessMessage(null);

//     try {
//       const response = await fetch(`/api/orders?id=${orderId}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ status: newStatus }),
//       });

//       const responseText = await response.text();

//       if (!response.ok) {
//         let errorMessage = `Error ${response.status}: ${response.statusText}`;
//         try {
//           const errorData = JSON.parse(responseText);
//           errorMessage = errorData.message || errorData.error || errorMessage;
//         } catch (e) {
//           if (responseText) {
//             errorMessage = responseText;
//           }
//         }
//         throw new Error(errorMessage);
//       }

//       const result = responseText ? JSON.parse(responseText) : { success: true };

//       setSuccessMessage(`Estado actualizado a: ${newStatus}`);
//       return result;
//     } catch (error) {
//       const message = error instanceof Error ? error.message : 'Error desconocido al actualizar la orden';
//       setUpdateError(message);
//       console.error("Error updating order:", error);
//       throw error;
//     } finally {
//       setIsUpdating(false);
//     }
//   };


//   const updateOrder = async (orderId: string, updates: Record<string, any>) => {
//     setIsUpdating(true);
//     setUpdateError(null);
//     setSuccessMessage(null);

//     try {
//       const response = await fetch(`/api/orders?id=${orderId}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(updates),
//       });

//       const responseText = await response.text();

//       if (!response.ok) {
//         let errorMessage = `Error ${response.status}: ${response.statusText}`;
//         try {
//           const errorData = JSON.parse(responseText);
//           errorMessage = errorData.message || errorData.error || errorMessage;
//         } catch {
//           if (responseText) {
//             errorMessage = responseText;
//           }
//         }
//         throw new Error(errorMessage);
//       }

//       const result = responseText ? JSON.parse(responseText) : { success: true };
//       setSuccessMessage(`Orden actualizada correctamente.`);
//       return result;
//     } catch (error) {
//       const message = error instanceof Error ? error.message : 'Error desconocido al actualizar la orden';
//       setUpdateError(message);
//       console.error("Error updating order:", error);
//       throw error;
//     } finally {
//       setIsUpdating(false);
//     }
//   };




//   const bulkUpdateOrders = async (orderIds: string[], newStatus: string) => {
//     setIsUpdating(true);
//     setUpdateError(null);
//     setSuccessMessage(null);

//     try {
//       const response = await fetch('/api/orders', {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           query: { _id: { $in: orderIds } },
//           status: newStatus,
//         }),
//       });

//       const responseText = await response.text();

//       if (!response.ok) {
//         let errorMessage = `Error ${response.status}: ${response.statusText}`;
//         try {
//           const errorData = JSON.parse(responseText);
//           errorMessage = errorData.message || errorData.error || errorMessage;
//         } catch (e) {
//           if (responseText) {
//             errorMessage = responseText;
//           }
//         }
//         throw new Error(errorMessage);
//       }

//       const result = responseText ? JSON.parse(responseText) : { updatedCount: orderIds.length };

//       setSuccessMessage(`${orderIds.length} órdenes actualizadas a: ${newStatus}`);
//       return result;
//     } catch (error) {
//       const message = error instanceof Error ? error.message : 'Error desconocido al actualizar múltiples órdenes';
//       setUpdateError(message);
//       console.error("Error in bulk update:", error);
//       throw error;
//     } finally {
//       setIsUpdating(false);
//     }
//   };

//   const clearMessages = () => {
//     setUpdateError(null);
//     setSuccessMessage(null);
//   };

//   return {
//     updateOrderStatus,
//     bulkUpdateOrders,
//     isUpdating,
//     updateError,
//     successMessage,
//     clearMessages,
//     setUpdateError // Añadimos el setter al objeto retornado
//   };
// };


import { useState } from 'react';

interface UseOrderUpdatesReturn {
  updateOrderStatus: (orderId: string, newStatus: string) => Promise<any>;
  updateOrder: (orderId: string, updates: Record<string, any>) => Promise<any>;
  bulkUpdateOrders: (orderIds: string[], updates: Record<string, any>) => Promise<any>;
  isUpdating: boolean;
  updateError: string | null;
  successMessage: string | null;
  clearMessages: () => void;
  setUpdateError: (error: string | null) => void;
}

export const useOrderUpdates = (): UseOrderUpdatesReturn => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    return updateOrder(orderId, { status: newStatus });
  };

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

  const bulkUpdateOrders = async (orderIds: string[], updates: Record<string, any>) => {
    setIsUpdating(true);
    setUpdateError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch('/api/orders', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: { _id: { $in: orderIds } },
          updates,
        }),
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

      const result = responseText ? JSON.parse(responseText) : { updatedCount: orderIds.length };
      setSuccessMessage(`${orderIds.length} órdenes actualizadas correctamente.`);
      return result;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error desconocido al actualizar múltiples órdenes';
      setUpdateError(message);
      console.error("Error in bulk update:", error);
      throw error;
    } finally {
      setIsUpdating(false);
    }
  };

  const clearMessages = () => {
    setUpdateError(null);
    setSuccessMessage(null);
  };

  return {
    updateOrderStatus,
    updateOrder,
    bulkUpdateOrders,
    isUpdating,
    updateError,
    successMessage,
    clearMessages,
    setUpdateError,
  };
};

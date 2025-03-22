export const sendWhatsAppMessageEmployees = (orderDetails: any, phoneNumber: string): boolean => {
    try {
      // Construir el mensaje
      let message = `¡Hola! Quiero hacer un pedido:\n\n`;
      message += `*Tipo de Pedido:* ${orderDetails.orderType}\n`;
      message += `*Detalles:* ${orderDetails.dataTypeOrder}\n\n`;
      message += `*Ítems del Pedido:*\n`;
  
      orderDetails.cart.forEach((item: any) => {
        message += `- ${item.name} (Cantidad: ${item.quantity}, Precio: $${item.price})\n`;
      });
  
      if (orderDetails.comments) {
        message += `\n*Comentarios:* ${orderDetails.comments}\n`;
      }
  
      // Codificar el mensaje para la URL de WhatsApp
      const encodedMessage = encodeURIComponent(message);
      const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  
      // Abrir WhatsApp en una nueva pestaña
      if (typeof window !== "undefined") {
        window.open(whatsappLink, "_blank");
        return true;
      } else {
        console.error("Esta función solo puede ser utilizada en un entorno de navegador.");
        return false;
      }
    } catch (error) {
      console.error("Error al enviar mensaje de WhatsApp:", error);
      return false;
    }
  };
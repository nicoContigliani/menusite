// export const sendWhatsAppMessageEmployees = (orderDetails: any, phoneNumber: string): boolean => {
//     try {
//       // Construir el mensaje
//       let message = `¡Hola! Aquí está el recibo de su pedido:\n\n`
//       message += `*Orden #:* ${orderDetails.id}\n`
//       message += `*Tipo de Pedido:* ${orderDetails.orderType}\n`
//       message += `*Detalles:* ${orderDetails.dataTypeOrder}\n\n`
//       message += `*Ítems del Pedido:*\n`
  
//       orderDetails.cart.forEach((item: any) => {
//         message += `- ${item.name} (Cantidad: ${item.quantity}, Precio: $${item.price})\n`
  
//         if (item.extras && item.extras.length > 0) {
//           message += `  *Extras:*\n`
//           item.extras.forEach((extra: any) => {
//             message += `  - ${extra.name}: $${extra.price}\n`
//           })
//         }
//       })
  
//       // Añadir información de pago
//       if (orderDetails.payment) {
//         message += `\n*Información de Pago:*\n`
//         message += `Total: $${orderDetails.payment.total.toFixed(2)}\n`
//         message += `Pagado: $${orderDetails.payment.paid.toFixed(2)}\n`
  
//         if (orderDetails.payment.methods && orderDetails.payment.methods.length > 0) {
//           message += `\n*Métodos de Pago:*\n`
//           orderDetails.payment.methods.forEach((method: any) => {
//             message += `- ${method.method}: $${method.amount.toFixed(2)}\n`
//           })
//         }
//       }
  
//       if (orderDetails.comments) {
//         message += `\n*Comentarios:* ${orderDetails.comments}\n`
//       }
  
//       message += `\n¡Gracias por su compra!`
  
//       // Codificar el mensaje para la URL de WhatsApp
//       const encodedMessage = encodeURIComponent(message)
//       const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
  
//       // Abrir WhatsApp en una nueva pestaña
//       if (typeof window !== "undefined") {
//         window.open(whatsappLink, "_blank")
//         return true
//       } else {
//         console.error("Esta función solo puede ser utilizada en un entorno de navegador.")
//         return false
//       }
//     } catch (error) {
//       console.error("Error al enviar mensaje de WhatsApp:", error)
//       return false
//     }
//   }


export const sendWhatsAppMessageEmployees = (
    orderDetails: any, 
    phoneNumber: string, 
    pdfUrl: string | null = null,
    pdfFileName: string = "recibo.pdf"
  ): boolean => {
    try {
      // Construir el mensaje
      let message = `¡Hola! Aquí está el recibo de su pedido:\n\n`
      message += `*Orden #:* ${orderDetails.id}\n`
      message += `*Tipo de Pedido:* ${orderDetails.orderType}\n`
      message += `*Detalles:* ${orderDetails.dataTypeOrder}\n\n`
      
      // Si hay un PDF disponible, agregar un mensaje sobre él
      if (pdfUrl) {
        message += `*Puede descargar su recibo PDF aquí:*\n${window.location.origin}/api/download-pdf?orderId=${orderDetails.id}\n\n`
      }
      
      message += `*Ítems del Pedido:*\n`
  
      orderDetails.cart.forEach((item: any) => {
        message += `- ${item.name} (Cantidad: ${item.quantity}, Precio: $${item.price})\n`
  
        if (item.extras && item.extras.length > 0) {
          message += `  *Extras:*\n`
          item.extras.forEach((extra: any) => {
            message += `  - ${extra.name}: $${extra.price}\n`
          })
        }
      })
  
      // Añadir información de pago
      if (orderDetails.payment) {
        message += `\n*Información de Pago:*\n`
        message += `Total: $${orderDetails.payment.total.toFixed(2)}\n`
        message += `Pagado: $${orderDetails.payment.paid.toFixed(2)}\n`
  
        if (orderDetails.payment.methods && orderDetails.payment.methods.length > 0) {
          message += `\n*Métodos de Pago:*\n`
          orderDetails.payment.methods.forEach((method: any) => {
            message += `- ${method.method}: $${method.amount.toFixed(2)}\n`
          })
        }
      }
  
      if (orderDetails.comments) {
        message += `\n*Comentarios:* ${orderDetails.comments}\n`
      }
  
      message += `\n¡Gracias por su compra!`
  
      // Codificar el mensaje para la URL de WhatsApp
      const encodedMessage = encodeURIComponent(message)
      const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
  
      // Abrir WhatsApp en una nueva pestaña
      if (typeof window !== "undefined") {
        window.open(whatsappLink, "_blank")
        return true
      } else {
        console.error("Esta función solo puede ser utilizada en un entorno de navegador.")
        return false
      }
    } catch (error) {
      console.error("Error al enviar mensaje de WhatsApp:", error)
      return false
    }
  }
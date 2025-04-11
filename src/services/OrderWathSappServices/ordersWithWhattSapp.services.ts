// // // services/whatsappService.ts

// // /**
// //  * Envía un mensaje por WhatsApp con los detalles de la orden.
// //  * @param orderDetails - Detalles de la orden.
// //  * @param phoneNumber - Número de teléfono de WhatsApp (con código de país).
// //  */
// // export const sendWhatsAppMessage = (orderDetails: any, phoneNumber: string) => {



// //     const todo = orderDetails.items.map((item: any) => {
// //         // Crear un objeto con las propiedades deseadas
// //         const itemDetails = {
// //             orderType: item?.orderType,
// //             name: item?.Name||"",
// //             price: item?.Price,
// //             comments: item?.comments||"",
// //             tableNumber: item?.tableNumber||"",
// //             orderId: item?.orderId||"",
// //             deliveryAddress: item?.deliveryAddress||"",
// //             fullname: item?.fullname,
// //             quantity: 1,
// //             description: item?.Description||"",
// //             image: item?.Item_Image||"",
// //             id: item?.id||"",
// //             extra: item?.extra?.map((extra: any) => `${extra?.name} ($${extra?.price})`).join("\n"), // Extras con saltos de línea
// //         };

// //         // Convertir el objeto a un string en formato "clave: valor\n"
// //         const itemString = Object.entries(itemDetails)
// //             .map(([key, value]) => `${key}: ${value}`) // Formato "clave: valor"
// //             .join("\n"); // Unir todas las líneas con saltos de línea

// //         return itemString;
// //     });
 
// //     const encodedMessage = encodeURIComponent(todo);

// //     // Crear el enlace de WhatsApp
// //     const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

// //     // Abrir WhatsApp en una nueva pestaña
// //     window.open(whatsappLink, "_blank");
// // };



// // services/whatsappService.ts

// /**
//  * Envía un mensaje por WhatsApp con los detalles de la orden.
//  * @param orderDetails - Detalles de la orden.
//  * @param phoneNumber - Número de teléfono de WhatsApp (con código de país).
//  * @returns boolean - Indica si el mensaje se envió correctamente.
//  */
// export const sendWhatsAppMessage = (orderDetails: any, phoneNumber: string): boolean => {
//   console.log("🚀 ~ sendWhatsAppMessage ~ phoneNumber:", phoneNumber)
//   // Validar el número de teléfono
//   if (!phoneNumber || !/^\d+$/.test(phoneNumber)) {
//     console.error("Número de teléfono no válido.")
//     return false
//   }

//   try {
//     // Crear el mensaje principal de la orden
//     let message =
//       `¡Hola! Quiero hacer un pedido:\n\n` +
//       `*Tipo de pedido:* ${orderDetails.orderType}\n` +
//       (orderDetails.tableNumber ? `*Número de mesa:* ${orderDetails.tableNumber}\n` : "") +
//       (orderDetails.deliveryAddress ? `*Dirección de entrega:* ${orderDetails.deliveryAddress}\n` : "") +
//       (orderDetails.fullname ? `*Nombre del cliente:* ${orderDetails.fullname}\n` : "") +
//       `*Comentarios:* ${orderDetails.comments || "Ninguno"}\n\n` +
//       `*Ítems del pedido:*\n`

//     // Agregar detalles de cada ítem al mensaje
//     orderDetails.items.forEach((item: any) => {
//       message +=
//         `\n--------------------------------\n` +
//         `*Nombre:* ${item.Name}\n` +
//         `*Descripción:* ${item.Description}\n` +
//         `*Precio:* ${item.Price}\n` +
//         `*Cantidad:* 1\n` // Asumiendo que la cantidad es 1, ajusta según sea necesario

//       // Verificar si hay extras y agregarlos al mensaje
//       if (item.extra && item.extra.length > 0) {
//         message += `*Extras:*\n${item.extra.map((extra:any) => `- ${extra.name} ($${extra.price})`).join("\n")}\n`
//       }
//     })

//     // Codificar el mensaje para el enlace de WhatsApp
//     const encodedMessage = encodeURIComponent(message)

//     // Crear el enlace de WhatsApp
//     const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodedMessage}`

//     console.log("Enlace de WhatsApp generado:", whatsappLink)

//     // Verificar que estamos en un entorno de navegador antes de usar window
//     if (typeof window !== "undefined") {
//       // Abrir WhatsApp en una nueva pestaña
//       window.open(whatsappLink, "_blank")
//       return true
//     } else {
//       console.error("Esta función solo puede ser utilizada en un entorno de navegador.")
//       return false
//     }
//   } catch (error) {
//     console.error("Error al enviar mensaje de WhatsApp:", error)
//     return false
//   }
// }

/**
 * Envía un mensaje por WhatsApp con los detalles de la orden.
 * @param orderDetails - Detalles de la orden.
 * @param phoneNumber - Número de teléfono de WhatsApp (con código de país).
 * @returns boolean - Indica si el mensaje se envió correctamente.
 */
export const sendWhatsAppMessage = (orderDetails: any, phoneNumber: string): boolean => {
  console.log("📞 Enviando a:", phoneNumber);

  // Validación del número
  if (!phoneNumber || !/^\d+$/.test(phoneNumber)) {
    console.error("Número de teléfono no válido.");
    return false;
  }

  try {
    // Construir mensaje base
    let message =
      `¡Hola! Quiero hacer un pedido:\n\n` +
      `*Tipo de pedido:* ${orderDetails.orderType}\n` +
      `*Detalles:* ${orderDetails.dataTypeOrder}\n` +
      (orderDetails.fullname ? `*Nombre del cliente:* ${orderDetails.fullname}\n` : "") +
      `*Comentarios:* ${orderDetails.comments || "Ninguno"}\n\n` +
      `*Ítems del pedido:*\n`;

    // Agregar productos del carrito
    orderDetails.cart.forEach((item: any, index: number) => {
      message +=
        `\n--------------------------------\n` +
        `*Producto ${index + 1}:*\n` +
        `*Nombre:* ${item.name}\n` +
        `*Descripción:* ${item.Description || "Sin descripción"}\n` +
        `*Precio:* $${item.price}\n` +
        `*Cantidad:* ${item.quantity || 1}\n`;

      if (item.extras && item.extras.length > 0) {
        message += `*Extras:*\n${item.extras.map((extra: any) => `- ${extra.name} ($${extra.price})`).join("\n")}\n`;
      }

      if (item.extrasTotal) {
        message += `*Total extras:* $${item.extrasTotal}\n`;
      }
    });

    // Codificar mensaje
    const encodedMessage = encodeURIComponent(message);

    // Generar enlace
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    console.log("Enlace generado:", whatsappLink);

    // Abrir en nueva pestaña (solo navegador)
    if (typeof window !== "undefined") {
      window.open(whatsappLink, "_blank");
      return true;
    } else {
      console.error("Esta función solo puede ser utilizada en un entorno de navegador.");
      return false;
    }
  } catch (error) {
    console.error("Error al generar el mensaje:", error);
    return false;
  }
};





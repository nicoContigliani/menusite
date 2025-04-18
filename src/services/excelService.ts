import clientPromise from "../../lib/mongoose";

export async function readAndInsertExcelData(todo: any) {
  const {
    companyName,
    folderName,
    filePath = `companiesFolders/${folderName}`,
    hojas,
    selectedProfile,
    status_Companies,
    paymentLevel
  } = todo;



  const dbName = process.env.NEXT_PUBLIC_NODE_ENV === "development" ? "menuDevDB" : "menuDB";
  const client = await clientPromise;
  const db = client.db(dbName);

  // const client = await clientPromise;
  // const db = client.db("menuDB");
  const companies = db.collection("companies");

  const existingCompany = await companies.findOne({ companyName });

  if (existingCompany) {
    // Update existing company
    await companies.updateOne(
      { companyName },
      {
        $set: {
          folderName,
          hojas,
          selectedProfile,
          paymentLevel,
          updateAt: new Date(),
        },
      }
    );
    console.log(`Updated existing company: ${companyName}`);
  } else {
    // Insert new company
    await companies.insertOne({
      companyName,
      folderName,
      hojas,
      status_Companies: status_Companies ?? true,
      selectedProfile,
      visits: 0,
      paymentLevel,
      createAt: new Date(),
      updateAt: new Date(),
    });
    console.log(`Inserted new company: ${companyName}`);
  }

  return { companyName, hojas };
}


export async function getCompanyByName(companyName: any) {
  console.log("🚀 ~ getCompanyByName ~ companyName:", companyName)
  try {
    // const dbName = process.env.NEXT_PUBLIC_NODE_ENV === "development" ? "menuDevDB" : "menuDB";
    // const db = client.db("menuDB");
    const client = await clientPromise;
    const dbName = process.env.NEXT_PUBLIC_NODE_ENV === "development" ? "menuDevDB" : "menuDB";
    const db = client.db(dbName);
    const companies = db.collection("companies");



    // const dbName = process.env.NEXT_PUBLIC_NODE_ENV === "development" ? "menuDevDB" : "menuDB";
    // const db = client.db(dbName);
    // const client = await clientPromise;





    // const existingCompany = await companies.findOne({ 
    //   companyName: { $regex: new RegExp(`^${companyName}$`, 'i') } 
    // })
    const existingCompany = await companies.findOne(
      { companyName: companyName }, // Búsqueda exacta
      {
        collation: {
          locale: 'simple',
          strength: 1 // Ignora mayúsculas/minúsculas
        }
      }
    );

    // const existingCompany = await companies.findOne();  

    console.log("🚀 ~ getCompanyByName ~ existingCompany:", existingCompany)
    return existingCompany || null; // Retornar null en lugar de undefined
  } catch (error) {
    console.log("🚀 ~ getCompanyByName ~ error:", error)

  }
}


// Datos de la empresa
// contactInfo: Detalles de contacto de la empresa.
// Teléfono.
// Correo electrónico.
// Dirección física.
// businessHours: Horarios de atención.
// Días y horas de operación.
// Notas especiales (por ejemplo, cerrado por vacaciones).
// socialLinks: Enlaces a redes sociales.
// Facebook, Instagram, Twitter, etc.
// Gestión del menú
// categories: Categorías de los productos en el menú.
// Ejemplo: Bebidas, Platos principales, Postres.
// menuItems: Detalles de cada elemento del menú.
// Nombre.
// Precio.
// Descripción.
// Ingredientes.
// Estado (disponible o agotado).
// Imagen del platillo.
// Gestión de operaciones
// employeeInfo: Información sobre empleados.
// Nombre, rol, y horario asignado.
// orders: Historial de pedidos.
// Fecha y hora.
// Detalles del pedido (productos, cantidad, precio total).
// Método de pago (efectivo, tarjeta, etc.).
// Estado del pedido (pendiente, entregado, cancelado).
// Estadísticas y analítica
// salesData: Datos de ventas.
// Ventas diarias, semanales, mensuales.
// Productos más vendidos.
// customerReviews: Opiniones de clientes.
// Puntuación promedio.
// Comentarios.
// Gestión de licencias y suscripciones
// licenceDetails:
// Tipo de licencia (gratuita, premium).
// Fecha de vencimiento.
// Estado de renovación.
// Marketing
// promotions:
// Promociones activas.
// Fecha de inicio y fin.
// loyaltyProgram:
// Detalles del programa de fidelidad.
// Puntos acumulados por cliente.
// Seguimiento de ubicación y tráfico
// geoData:
// Latitud y longitud.
// Áreas de influencia (zonas de entrega permitidas).
// trafficStats:
// Visitantes únicos.
// Tiempo promedio en la página.

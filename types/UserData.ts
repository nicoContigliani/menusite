export interface UserData {
    _id: string; // ID único del usuario
    email: string; // Email del usuario
    userId: string; // ID del usuario en el sistema
    companyName: string; // Nombre de la empresa
    lots: Array<{ startTime: string; endTime: string }>; // Información de los lotes (con tiempos de inicio y fin)
    historical: Array<{
      section: string; // Sección del historial
      timeSpent: number; // Tiempo gastado en la actividad (en milisegundos)
      startTime: number; // Timestamp de inicio
      endTime: number; // Timestamp de fin
      createAt: string; // Fecha de creación del registro
    }>;
  }
  
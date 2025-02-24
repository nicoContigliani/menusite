export interface AnalyticsResult {
    totalTimeSpent: number; // Tiempo total acumulado (en milisegundos)
    averageTimeSpent: number; // Promedio de tiempo por usuario (en milisegundos)
    averageHistoricalEntries: number; // Promedio de entradas en 'historical' por usuario
    sectionCounts: Record<string, number>; // Contador de secciones más frecuentes
    companyTimeSpent: Record<string, number>; // Tiempo total por empresa
    mostActiveSection: string; // La sección más activa
    totalUsers: number; // Total de usuarios procesados
    mostActiveCompany: string; // Empresa con más tiempo acumulado
  }
  
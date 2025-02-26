// Definición de tipos e interfaces
interface TimeData {
    $numberInt?: string;
    $numberDouble?: string;
  }
  
  interface DateData {
    $date: {
      $numberLong: string;
    };
  }
  
  interface HistoricalEntry {
    section: string;
    timeSpent: TimeData;
    startTime: number | null;
    endTime: number;
    createAt: DateData;
  }
  
  interface Lot {
    startTime: DateData;
    endTime: DateData;
    historical: HistoricalEntry[];
    sections: { section: string; timeSpent: TimeData }[];
    clicks: Record<string, number>;
  }
  
  interface SectionInfo {
    category: string;
    index: number;
    dishName: string;
  }
  
  interface ClientData {
    clientInfo: {
      companyName: string;
      email: string;
      userId: string;
    };
    timeAnalysis: {
      totalTimeByCategory: Record<string, string>;
      totalTimeByDish: Record<string, string>;
      averageTimePerSection: string;
      timeDistribution: Record<string, { total: string; percentage: string }>;
    };
    interactionAnalysis: {
      sectionVisitCount: Record<string, number>;
      categoryVisitCount: Record<string, number>;
      dishVisitCount: Record<string, number>;
      mostVisitedSections: { section: string; count: number }[];
      leastVisitedSections: { section: string; count: number }[];
    };
    efficiencyMetrics: {
      timePerInteraction: Record<string, number>;
      engagementScore: Record<string, number>;
      conversionPotential: Record<string, number>;
    };
    temporalPatterns: {
      activityByHour: Record<string, number>;
      peakActivityTime: string;
      sessionDuration: string;
    };
    recommendations: string[];
    summary: {
      topDishes: { name: string; time: string; visits: number }[];
      topCategories: { name: string; time: string; visits: number }[];
      effectivenessRatio: Record<string, number>;
    };
  }
  
  interface RawClientData {
    companyName?: string;
    email?: string;
    userId?: string;
    lots?: Lot[];
  }
  
  // Función principal con tipado completo
  export const askDashboardAnalytics = (data: RawClientData[]): ClientData[] => {
    // Helper functions con tipado explícito
    const getTimeValue = (timeData: TimeData | undefined): number => {
      if (!timeData) return 0;
      if (timeData.$numberInt) return Number.parseInt(timeData.$numberInt, 10);
      if (timeData.$numberDouble) return Number.parseFloat(timeData.$numberDouble);
      return 0;
    };
  
    const getDateValue = (dateData: DateData | undefined): Date => {
      try {
        if (dateData?.$date?.$numberLong) {
          const timestamp = Number.parseInt(dateData.$date.$numberLong, 10);
          if (!isNaN(timestamp)) {
            return new Date(timestamp);
          }
        }
      } catch (error) {
        console.error("Error parsing date:", error);
      }
      return new Date();
    };
  
    const parseSectionInfo = (section: string): SectionInfo | null => {
      const categoryMatch = section.match(/^([^-]+)-(\d+)-(.+)$/);
      if (categoryMatch) {
        return {
          category: categoryMatch[1],
          index: Number.parseInt(categoryMatch[2], 10),
          dishName: categoryMatch[3],
        };
      }
  
      const buttonMatch = section.match(/^Button-(.+)$/);
      if (buttonMatch) {
        return {
          category: "Button",
          index: -1,
          dishName: buttonMatch[1],
        };
      }
  
      const infoMatch = section.match(/^(info|logo)$/);
      if (infoMatch) {
        return {
          category: infoMatch[1],
          index: -1,
          dishName: "",
        };
      }
  
      return null;
    };
  
    const formatTime = (ms: number): string => {
      if (ms < 1000) return `${Math.round(ms)}ms`;
      const seconds = Math.floor(ms / 1000);
      if (seconds < 60) return `${seconds}s`;
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes}m ${remainingSeconds}s`;
    };
  
    // Respuesta vacía por defecto
    const emptyResponse: ClientData = {
      clientInfo: { companyName: "", email: "", userId: "" },
      timeAnalysis: {
        totalTimeByCategory: {},
        totalTimeByDish: {},
        averageTimePerSection: "0s",
        timeDistribution: {},
      },
      interactionAnalysis: {
        sectionVisitCount: {},
        categoryVisitCount: {},
        dishVisitCount: {},
        mostVisitedSections: [],
        leastVisitedSections: [],
      },
      efficiencyMetrics: {
        timePerInteraction: {},
        engagementScore: {},
        conversionPotential: {},
      },
      temporalPatterns: {
        activityByHour: {},
        peakActivityTime: "",
        sessionDuration: "0s",
      },
      recommendations: [],
      summary: {
        topDishes: [],
        topCategories: [],
        effectivenessRatio: {},
      },
    };
  
    // Validación de datos de entrada
    if (!Array.isArray(data) || data.length === 0) {
      return [emptyResponse];
    }
  
    // Procesar cada cliente en el array de datos
    return data.map((clientData: RawClientData) => {
      const { companyName = "Sin nombre", email = "Sin email", userId = "Sin ID", lots = [] } = clientData;
  
      // Variables para el análisis
      let totalTime = 0;
      let totalInteractions = 0;
      let sessionDuration = 0;
      const sectionVisits: Record<string, number> = {};
      const categoryVisits: Record<string, number> = {};
      const dishVisits: Record<string, number> = {};
      const timeByCategory: Record<string, number> = {};
      const timeByDish: Record<string, number> = {};
      const interactionsByHour: Record<string, number> = {};
  
      // Procesar todos los lotes
      lots.forEach((lot: Lot) => {
        // Calcular la duración de la sesión
        if (lot.startTime && lot.endTime) {
          try {
            const start = getDateValue(lot.startTime);
            const end = getDateValue(lot.endTime);
            const duration = end.getTime() - start.getTime();
            if (duration > 0 && duration < 24 * 60 * 60 * 1000) {
              // Verificación de duración (menos de 24 horas)
              sessionDuration += duration;
            }
          } catch (error) {
            console.error("Error calculating session duration:", error);
          }
        }
  
        // Procesar entradas históricas
        lot.historical.forEach((entry: HistoricalEntry) => {
          if (!entry.section) return;
  
          const sectionInfo = parseSectionInfo(entry.section);
          const timeSpent = getTimeValue(entry.timeSpent);
  
          // Saltar valores de tiempo inválidos
          if (isNaN(timeSpent) || timeSpent < 0 || timeSpent > 3600000) {
            return; // Máximo 1 hora por interacción
          }
  
          // Acumular tiempo total
          totalTime += timeSpent;
  
          // Registrar visita a la sección
          sectionVisits[entry.section] = (sectionVisits[entry.section] || 0) + 1;
          totalInteractions++;
  
          // Registrar hora de actividad
          if (entry.createAt) {
            try {
              const date = getDateValue(entry.createAt);
              if (date instanceof Date && !isNaN(date.getTime())) {
                const hour = date.getHours();
                const hourKey = `${hour}:00`;
                interactionsByHour[hourKey] = (interactionsByHour[hourKey] || 0) + 1;
              }
            } catch (error) {
              console.error("Error processing activity hour:", error);
            }
          }
  
          // Procesar información de categoría y plato
          if (sectionInfo) {
            const { category, dishName } = sectionInfo;
  
            // Acumular visitas y tiempo por categoría
            categoryVisits[category] = (categoryVisits[category] || 0) + 1;
            timeByCategory[category] = (timeByCategory[category] || 0) + timeSpent;
  
            // Acumular visitas y tiempo por plato
            if (dishName) {
              dishVisits[dishName] = (dishVisits[dishName] || 0) + 1;
              timeByDish[dishName] = (timeByDish[dishName] || 0) + timeSpent;
            }
          }
        });
      });
  
      // Calcular métricas derivadas
      const averageTimePerSection = totalInteractions > 0 ? totalTime / totalInteractions : 0;
  
      // Encontrar la hora pico
      let peakHour = "";
      let peakCount = 0;
      Object.entries(interactionsByHour).forEach(([hour, count]) => {
        if (count > peakCount) {
          peakHour = hour;
          peakCount = count;
        }
      });
  
      // Ordenar secciones por visitas
      const sortedSections = Object.entries(sectionVisits)
        .map(([section, count]) => ({ section, count }))
        .sort((a, b) => b.count - a.count);
  
      // Calcular métricas de eficiencia
      const timePerInteraction: Record<string, number> = {};
      const engagementScore: Record<string, number> = {};
      const conversionPotential: Record<string, number> = {};
      const effectivenessRatio: Record<string, number> = {};
  
      Object.entries(categoryVisits).forEach(([category, visits]) => {
        const timeSpent = timeByCategory[category] || 0;
  
        // Tiempo por interacción
        timePerInteraction[category] = visits > 0 ? timeSpent / visits : 0;
  
        // Puntaje de engagement
        const timeRatio = totalTime > 0 ? timeSpent / totalTime : 0;
        const visitRatio = totalInteractions > 0 ? visits / totalInteractions : 0;
        engagementScore[category] = Math.round((timeRatio + visitRatio) * 50);
  
        // Potencial de conversión
        const depthFactor = timeRatio > visitRatio ? 1.2 : 0.8;
        conversionPotential[category] = Math.round(engagementScore[category] * depthFactor);
  
        // Ratio de efectividad
        effectivenessRatio[category] = visits > 0 ? timeSpent / visits : 0;
      });
  
      // Formatear datos de tiempo
      const formattedTimeByCategory: Record<string, string> = {};
      const formattedTimeByDish: Record<string, string> = {};
      const timeDistribution: Record<string, { total: string; percentage: string }> = {};
  
      Object.entries(timeByCategory).forEach(([category, time]) => {
        formattedTimeByCategory[category] = formatTime(time);
        timeDistribution[category] = {
          total: formatTime(time),
          percentage: totalTime > 0 ? `${((time / totalTime) * 100).toFixed(1)}%` : "0%",
        };
      });
  
      Object.entries(timeByDish).forEach(([dish, time]) => {
        formattedTimeByDish[dish] = formatTime(time);
      });
  
      // Crear arrays de platos y categorías más visitados
      const topDishes = Object.entries(dishVisits)
        .map(([dish, visits]) => ({
          name: dish,
          time: formatTime(timeByDish[dish] || 0),
          visits,
        }))
        .sort((a, b) => b.visits - a.visits);
  
      const topCategories = Object.entries(categoryVisits)
        .map(([category, visits]) => ({
          name: category,
          time: formatTime(timeByCategory[category] || 0),
          visits,
        }))
        .sort((a, b) => b.visits - a.visits);
  
      // Generar recomendaciones
      const recommendations: string[] = [];
      if (sortedSections.length > 0) {
        recommendations.push("Optimizar las categorías con menor interacción");
        recommendations.push("Mejorar la visibilidad de las secciones más visitadas");
  
        if (topDishes.length > 0) {
          recommendations.push(`Destacar el plato más popular: ${topDishes[0].name}`);
        }
  
        if (peakHour) {
          recommendations.push(`Considerar promociones especiales durante la hora pico: ${peakHour}`);
        }
      }
  
      // Retornar los datos analizados para este cliente
      return {
        clientInfo: { companyName, email, userId },
        timeAnalysis: {
          totalTimeByCategory: formattedTimeByCategory,
          totalTimeByDish: formattedTimeByDish,
          averageTimePerSection: formatTime(averageTimePerSection),
          timeDistribution,
        },
        interactionAnalysis: {
          sectionVisitCount: sectionVisits,
          categoryVisitCount: categoryVisits,
          dishVisitCount: dishVisits,
          mostVisitedSections: sortedSections.slice(0, 5),
          leastVisitedSections: sortedSections.slice(-5).reverse(),
        },
        efficiencyMetrics: {
          timePerInteraction,
          engagementScore,
          conversionPotential,
        },
        temporalPatterns: {
          activityByHour: interactionsByHour,
          peakActivityTime: peakHour,
          sessionDuration: formatTime(sessionDuration),
        },
        recommendations,
        summary: {
          topDishes: topDishes.slice(0, 10),
          topCategories: topCategories.slice(0, 5),
          effectivenessRatio,
        },
      };
    });
  };
  
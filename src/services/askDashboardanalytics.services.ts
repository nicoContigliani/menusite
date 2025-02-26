

interface TimeData {
  $numberInt?: string
  $numberDouble?: string
}

interface DateData {
  $date: {
    $numberLong: string
  }
}

interface HistoricalEntry {
  section: string
  timeSpent: TimeData
  startTime: number | null
  endTime: number
  createAt: DateData
}

interface Lot {
  startTime: DateData
  endTime: DateData
  historical: HistoricalEntry[]
  sections: { section: string; timeSpent: TimeData }[]
  clicks: Record<string, number>
}

interface SectionInfo {
  category: string
  index: number
  dishName: string
}

interface ClientData {
  clientInfo: {
    companyName: string
    email: string
    userId: string
  }
  timeAnalysis: {
    totalTimeByCategory: Record<string, string>
    totalTimeByDish: Record<string, string>
    averageTimePerSection: string
    timeDistribution: Record<string, { total: string; percentage: string }>
  }
  interactionAnalysis: {
    sectionVisitCount: Record<string, number>
    categoryVisitCount: Record<string, number>
    dishVisitCount: Record<string, number>
    mostVisitedSections: { section: string; count: number }[]
    leastVisitedSections: { section: string; count: number }[]
  }
  efficiencyMetrics: {
    timePerInteraction: Record<string, number>
    engagementScore: Record<string, number>
    conversionPotential: Record<string, number>
  }
  temporalPatterns: {
    activityByHour: Record<string, number>
    peakActivityTime: string
    sessionDuration: string
  }
  recommendations: string[]
  summary: {
    topDishes: { name: string; time: string; visits: number }[]
    topCategories: { name: string; time: string; visits: number }[]
    effectivenessRatio: Record<string, number>
  }
}

interface RawClientData {
  companyName?: string
  email?: string
  userId?: string
  lots?: Lot[]
}

// Función principal con tipado completo
export const askDashboardAnalytics = (data: RawClientData[]): ClientData => {
  // Helper functions con tipado explícito
  const getTimeValue = (timeData: TimeData | undefined): number => {
    if (!timeData) return 0

    // Verificar si es un objeto con las propiedades esperadas
    if (typeof timeData === "object") {
      if (timeData.$numberInt !== undefined) {
        const value = Number.parseInt(timeData.$numberInt, 10)
        return isNaN(value) ? 0 : value
      }
      if (timeData.$numberDouble !== undefined) {
        const value = Number.parseFloat(timeData.$numberDouble)
        return isNaN(value) ? 0 : value
      }

      // Si es un objeto pero no tiene las propiedades esperadas,
      // intentar convertir directamente (podría ser un número serializado)
      const directValue = Number(timeData)
      if (!isNaN(directValue)) {
        return directValue
      }
    }

    // Si es un valor primitivo (número), intentar convertirlo directamente
    if (typeof timeData === "number") {
      return timeData
    }

    return 0
  }

  const getDateValue = (dateData: DateData | undefined): Date | null => {
    try {
      if (dateData?.$date?.$numberLong) {
        const timestamp = Number.parseInt(dateData.$date.$numberLong, 10)
        if (!isNaN(timestamp)) {
          const date = new Date(timestamp)
          // Verificar que la fecha sea válida
          if (isNaN(date.getTime())) {
            return null
          }
          return date
        }
      }
    } catch (error) {
      console.error("Error parsing date:", error)
    }
    return null
  }

  const parseSectionInfo = (section: string): SectionInfo | null => {
    const categoryMatch = section.match(/^([^-]+)-(\d+)-(.+)$/)
    if (categoryMatch) {
      return {
        category: categoryMatch[1],
        index: Number.parseInt(categoryMatch[2], 10),
        dishName: categoryMatch[3],
      }
    }

    const buttonMatch = section.match(/^Button-(.+)$/)
    if (buttonMatch) {
      return {
        category: "Button",
        index: -1,
        dishName: buttonMatch[1],
      }
    }

    const infoMatch = section.match(/^(info|logo)$/)
    if (infoMatch) {
      return {
        category: infoMatch[1],
        index: -1,
        dishName: "",
      }
    }

    return null
  }

  // Corregido: Mejorado el formateo de tiempo para mayor precisión
  const formatTime = (ms: number): string => {
    if (isNaN(ms) || ms < 0) return "0ms"
    if (ms < 1000) return `${Math.round(ms)}ms`

    const seconds = Math.floor(ms / 1000)
    if (seconds < 60) return `${seconds}s`

    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60

    if (minutes < 60) {
      return remainingSeconds > 0 ? `${minutes}m ${remainingSeconds}s` : `${minutes}m`
    }

    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60

    return `${hours}h ${remainingMinutes > 0 ? `${remainingMinutes}m` : ""}`
  }

  // Respuesta vacía por defecto
  const emptyResponse: ClientData = {
    clientInfo: { companyName: "Multiple Users", email: "", userId: "" },
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
  }

  // Validación de datos de entrada
  if (!Array.isArray(data) || data.length === 0) {
    return emptyResponse
  }

  // Variables para el análisis combinado
  let totalTime = 0
  let totalInteractions = 0
  let totalSessionDuration = 0
  let sessionCount = 0 // Contador para calcular duración promedio de sesión
  const sectionVisits: Record<string, number> = {}
  const categoryVisits: Record<string, number> = {}
  const dishVisits: Record<string, number> = {}
  const timeByCategory: Record<string, number> = {}
  const timeByDish: Record<string, number> = {}
  const interactionsByHour: Record<string, number> = {}
  const userCount = data.length

  // Procesar todos los usuarios
  data.forEach((clientData: RawClientData) => {
    const { lots = [] } = clientData

    // Procesar todos los lotes del usuario actual
    lots.forEach((lot: Lot) => {
      // Calcular la duración de la sesión
      if (lot.startTime && lot.endTime) {
        try {
          const start = getDateValue(lot.startTime)
          const end = getDateValue(lot.endTime)

          // Corregido: Verificación más robusta de fechas válidas
          if (start && end) {
            const duration = end.getTime() - start.getTime()
            // Verificación de duración (menos de 24 horas y positiva)
            if (duration > 0 && duration < 24 * 60 * 60 * 1000) {
              totalSessionDuration += duration
              sessionCount++ // Incrementar contador de sesiones válidas
            }
          }
        } catch (error) {
          console.error("Error calculating session duration:", error)
        }
      }

      // Procesar entradas históricas
      lot.historical.forEach((entry: HistoricalEntry) => {
        if (!entry.section) return

        const sectionInfo = parseSectionInfo(entry.section)
        const timeSpent = getTimeValue(entry.timeSpent)

        // Log para depuración
        console.log(`Section: ${entry.section}, Raw timeSpent:`, entry.timeSpent, `Parsed: ${timeSpent}`)

        // Corregido: Validación más estricta de valores de tiempo
        if (isNaN(timeSpent) || timeSpent < 0 || timeSpent > 3600000) {
          return // Máximo 1 hora por interacción
        }

        // Acumular tiempo total
        totalTime += timeSpent

        // Registrar visita a la sección
        sectionVisits[entry.section] = (sectionVisits[entry.section] || 0) + 1
        totalInteractions++

        // Registrar hora de actividad
        // Corregido: Mejor manejo de la propiedad createAt
        if (entry.createAt) {
          const date = getDateValue(entry.createAt)
          if (date) {
            const hour = date.getHours()
            // Formato más legible para las horas (con ceros a la izquierda)
            const hourKey = `${hour.toString().padStart(2, "0")}:00`
            interactionsByHour[hourKey] = (interactionsByHour[hourKey] || 0) + 1
          }
        }

        // Procesar información de categoría y plato
        if (sectionInfo) {
          const { category, dishName } = sectionInfo

          if (category) {
            categoryVisits[category] = (categoryVisits[category] || 0) + 1

            // Asegurar que timeSpent sea un número válido antes de acumularlo
            if (!isNaN(timeSpent) && timeSpent > 0) {
              timeByCategory[category] = (timeByCategory[category] || 0) + timeSpent
              console.log(`Acumulando tiempo para ${category}: ${timeSpent}ms, Total: ${timeByCategory[category]}ms`)
            }

            // Acumular visitas y tiempo por plato
            if (dishName) {
              dishVisits[dishName] = (dishVisits[dishName] || 0) + 1
              if (!isNaN(timeSpent) && timeSpent > 0) {
                timeByDish[dishName] = (timeByDish[dishName] || 0) + timeSpent
              }
            }
          }
        }
      })
    })
  })

  // Corregido: Cálculo más preciso del tiempo promedio por sección
  const averageTimePerSection = totalInteractions > 0 ? totalTime / totalInteractions : 0

  // Corregido: Encontrar la hora pico con formato mejorado
  let peakHour = ""
  let peakCount = 0

  // Ordenar las horas cronológicamente para mejor visualización
  const sortedHours = Object.entries(interactionsByHour).sort(([hourA], [hourB]) => {
    const hourNumA = Number.parseInt(hourA.split(":")[0], 10)
    const hourNumB = Number.parseInt(hourB.split(":")[0], 10)
    return hourNumA - hourNumB
  })

  sortedHours.forEach(([hour, count]) => {
    if (count > peakCount) {
      peakHour = hour
      peakCount = count
    }
  })

  // Ordenar secciones por visitas
  const sortedSections = Object.entries(sectionVisits)
    .map(([section, count]) => ({ section, count }))
    .sort((a, b) => b.count - a.count)

  // Calcular métricas de eficiencia
  const timePerInteraction: Record<string, number> = {}
  const engagementScore: Record<string, number> = {}
  const conversionPotential: Record<string, number> = {}
  const effectivenessRatio: Record<string, number> = {}

  Object.entries(categoryVisits).forEach(([category, visits]) => {
    const timeSpent = timeByCategory[category] || 0

    // Tiempo por interacción
    timePerInteraction[category] = visits > 0 ? timeSpent / visits : 0

    // Puntaje de engagement
    const timeRatio = totalTime > 0 ? timeSpent / totalTime : 0
    const visitRatio = totalInteractions > 0 ? visits / totalInteractions : 0
    engagementScore[category] = Math.round((timeRatio + visitRatio) * 50)

    // Potencial de conversión
    const depthFactor = timeRatio > visitRatio ? 1.2 : 0.8
    conversionPotential[category] = Math.round(engagementScore[category] * depthFactor)

    // Ratio de efectividad
    effectivenessRatio[category] = visits > 0 ? timeSpent / visits : 0
  })

  // Formatear datos de tiempo
  const formattedTimeByCategory: Record<string, string> = {}
  const formattedTimeByDish: Record<string, string> = {}
  const timeDistribution: Record<string, { total: string; percentage: string }> = {}

  // Corregido: Cálculo más preciso de la distribución de tiempo
  Object.entries(timeByCategory).forEach(([category, time]) => {
    console.log(`Formateando tiempo para ${category}: ${time}ms`)

    // Asegurar que time sea un número válido
    if (isNaN(time) || time <= 0) {
      console.warn(`Tiempo inválido para ${category}: ${time}`)
      formattedTimeByCategory[category] = "0ms"
    } else {
      formattedTimeByCategory[category] = formatTime(time)
    }

    // Calcular porcentaje solo si el tiempo es válido
    const percentage = totalTime > 0 ? (time / totalTime) * 100 : 0
    timeDistribution[category] = {
      total: formattedTimeByCategory[category],
      percentage: `${percentage.toFixed(1)}%`,
    }
  })

  Object.entries(timeByDish).forEach(([dish, time]) => {
    formattedTimeByDish[dish] = formatTime(time)
  })

  // Crear arrays de platos y categorías más visitados
  const topDishes = Object.entries(dishVisits)
    .map(([dish, visits]) => ({
      name: dish,
      time: formatTime(timeByDish[dish] || 0),
      visits,
    }))
    .sort((a, b) => b.visits - a.visits)

  const topCategories = Object.entries(categoryVisits)
    .map(([category, visits]) => ({
      name: category,
      time: formatTime(timeByCategory[category] || 0),
      visits,
    }))
    .sort((a, b) => b.visits - a.visits)

  // Generar recomendaciones
  const recommendations: string[] = []
  if (sortedSections.length > 0) {
    recommendations.push("Optimizar las categorías con menor interacción")
    recommendations.push("Mejorar la visibilidad de las secciones más visitadas")

    if (topDishes.length > 0) {
      recommendations.push(`Destacar el plato más popular: ${topDishes[0].name}`)
    }

    if (peakHour) {
      recommendations.push(`Considerar promociones especiales durante la hora pico: ${peakHour}`)
    }
  }

  // Corregido: Cálculo de duración de sesión promedio
  const averageSessionDuration = sessionCount > 0 ? totalSessionDuration / sessionCount : 0

  // Retornar los datos analizados combinados
  return {
    clientInfo: { companyName: `Multiple Users (${userCount})`, email: "", userId: "" },
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
      sessionDuration: formatTime(averageSessionDuration), // Corregido: Usar el promedio calculado
    },
    recommendations,
    summary: {
      topDishes: topDishes.slice(0, 10),
      topCategories: topCategories.slice(0, 5),
      effectivenessRatio,
    },
  }
}


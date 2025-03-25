interface Coordinate {
    latitude: number;
    longitude: number;
  }
  
  export default class LocationService {
    /**
     * Calcula la distancia entre dos coordenadas usando la fórmula Haversine
     * @returns Distancia en metros (redondeada)
     */
    static checkProximity(
      target: Coordinate,
      current: Coordinate,
      maxDistance = 50
    ): { distance: number | null; isWithinRange: boolean } {
      if (!target || !current) {
        return { distance: null, isWithinRange: false };
      }
  
      const R = 6371e3; // Radio de la Tierra en metros
      const φ1 = (target.latitude * Math.PI) / 180;
      const φ2 = (current.latitude * Math.PI) / 180;
      const Δφ = ((current.latitude - target.latitude) * Math.PI) / 180;
      const Δλ = ((current.longitude - target.longitude) * Math.PI) / 180;
  
      const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
                Math.cos(φ1) * Math.cos(φ2) *
                Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = Math.round(R * c);
  
      return {
        distance,
        isWithinRange: distance <= maxDistance
      };
    }
  
    /**
     * Versión simplificada para verificación rápida
     */
    static isNearby(target: Coordinate, current: Coordinate, maxDistance = 50): boolean {
      return this.checkProximity(target, current, maxDistance).isWithinRange;
    }
  }
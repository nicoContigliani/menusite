export interface SimpleLocation {
  latitude: number;
  longitude: number;
  accuracy?: number; // Añadimos precisión para diagnóstico
}

export class GeolocationService {
  static async getPreciseLocation(): Promise<SimpleLocation> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Tu navegador no soporta geolocalización'));
        return;
      }

      // Configuración para máxima precisión
      const options = {
        enableHighAccuracy: true, // Fuerza alta precisión (GPS si disponible)
        timeout: 15000, // 15 segundos máximo de espera
        maximumAge: 0 // No usar caché
      };

      // Usamos watchPosition para obtener múltiples lecturas
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          // Detenemos después de obtener la primera lectura precisa
          navigator.geolocation.clearWatch(watchId);
          
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy // Opcional: para debug
          });
        },
        (error) => reject(this.getErrorMsg(error)),
        options
      );

      // Timeout por si no obtenemos respuesta
      setTimeout(() => {
        navigator.geolocation.clearWatch(watchId);
        reject(new Error('Tiempo de espera agotado'));
      }, 15000);
    });
  }

  private static getErrorMsg(error: GeolocationPositionError): string {
    switch(error.code) {
      case 1: return 'Permiso denegado';
      case 2: return 'Ubicación no disponible';
      case 3: return 'Tiempo agotado';
      default: return 'Error desconocido';
    }
  }
}
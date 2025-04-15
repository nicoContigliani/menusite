// export interface SimpleLocation {
//   latitude: number;
//   longitude: number;
//   accuracy?: number; // Añadimos precisión para diagnóstico
// }

// export class GeolocationService {
//   static async getPreciseLocation(): Promise<SimpleLocation> {
//     return new Promise((resolve, reject) => {
//       if (!navigator.geolocation) {
//         reject(new Error('Tu navegador no soporta geolocalización'));
//         alert("Tu navegador no soporta geolocalización")
//         return;
//       }

//       // Configuración para máxima precisión
//       const options = {
//         enableHighAccuracy: true, // Fuerza alta precisión (GPS si disponible)
//         timeout: 15000, // 15 segundos máximo de espera
//         maximumAge: 0 // No usar caché
//       };

//       // Usamos watchPosition para obtener múltiples lecturas
//       const watchId = navigator.geolocation.watchPosition(
//         (position) => {
//           // Detenemos después de obtener la primera lectura precisa
//           navigator.geolocation.clearWatch(watchId);

//           resolve({
//             latitude: position.coords.latitude,
//             longitude: position.coords.longitude,
//             accuracy: position.coords.accuracy // Opcional: para debug
//           });
//         },
//         (error) => reject(this.getErrorMsg(error)),
//         options
//       );

//       // Timeout por si no obtenemos respuesta
//       setTimeout(() => {
//         navigator.geolocation.clearWatch(watchId);
//         reject(new Error('Tiempo de espera agotado'));
//       }, 15000);
//     });
//   }

//   private static getErrorMsg(error: GeolocationPositionError): string {
//     switch (error.code) {
//       case 1: return 'Permiso denegado';
//       case 2: return 'Ubicación no disponible';
//       case 3: return 'Tiempo agotado';
//       default: return 'Error desconocido';
//     }
//   }
// }


export interface SimpleLocation {
  latitude: number;
  longitude: number;
  accuracy?: number;
}

export class GeolocationService {
  static async getPreciseLocation(): Promise<SimpleLocation> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        const error = new Error('Tu navegador no soporta geolocalización');
        alert(error.message);
        reject(error);
        return;
      }

      const options = {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0
      };

      // Primero verificamos el estado del permiso
      if (navigator.permissions) {
        navigator.permissions.query({name: 'geolocation'})
          .then(permissionStatus => {
            if (permissionStatus.state === 'denied') {
              const error = new Error('Permiso denegado permanentemente. Por favor habilita la geolocalización en la configuración de tu navegador.');
              alert(error.message);
              reject(error);
              return;
            }
            
            this.startWatching(resolve, reject, options);
          })
          .catch(() => {
            // Si query no funciona, intentamos igual
            this.startWatching(resolve, reject, options);
          });
      } else {
        // Navegadores que no soportan permissions API
        this.startWatching(resolve, reject, options);
      }
    });
  }

  private static startWatching(
    resolve: (value: SimpleLocation) => void,
    reject: (reason: Error) => void,
    options: PositionOptions
  ) {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        navigator.geolocation.clearWatch(watchId);
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy
        });
      },
      (error) => {
        navigator.geolocation.clearWatch(watchId);
        const errorMsg = this.getEnhancedErrorMsg(error);
        // alert(errorMsg); // Mostrar alerta más descriptiva
        reject(new Error(errorMsg));
      },
      options
    );

    setTimeout(() => {
      navigator.geolocation.clearWatch(watchId);
      const error = new Error('Tiempo de espera agotado. Asegúrate de tener activado el GPS y conexión a internet.');
      // alert(error.message);
      reject(error);
    }, 15000);
  }

  private static getEnhancedErrorMsg(error: GeolocationPositionError): string {
    switch (error.code) {
      case 1: 
        return 'Permiso denegado. Por favor:\n1. Haz clic en el icono de candado en la barra de URL\n2. Selecciona "Configuración del sitio"\n3. Habilita "Ubicación"';
      case 2: 
        return 'Ubicación no disponible. Verifica:\n- Que el GPS esté activado\n- Que tengas conexión a internet';
      case 3: 
        return 'Tiempo agotado. Intenta:\n- Moviéndote a un área abierta\n- Reiniciando el GPS';
      default: 
        return 'Error desconocido al obtener ubicación';
    }
  }
}
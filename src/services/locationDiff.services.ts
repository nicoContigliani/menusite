export interface Location {
    lat: number;
    lng: number;
}

export class LocationDiffService {
    /**
     * Verifica si dos ubicaciones están dentro de un rango específico (en metros)
     * @param loc1 Primera ubicación
     * @param loc2 Segunda ubicación
     * @param maxDistance Distancia máxima en metros (opcional, default 100m)
     * @returns true si están dentro del rango permitido
     */
    static isWithinRange(
        loc1: Location | null | undefined,
        loc2: Location | null | undefined,
        maxDistance: number = 100
    ): boolean {
        // Validaciones básicas
        if (!loc1 || !loc2) return false;
        if (typeof loc1.lat !== 'number' || typeof loc1.lng !== 'number') return false;
        if (typeof loc2.lat !== 'number' || typeof loc2.lng !== 'number') return false;

        // Cálculo de distancia simplificado
        const R = 6371000; // Radio de la Tierra en metros
        const dLat = this.toRad(loc2.lat - loc1.lat);
        const dLng = this.toRad(loc2.lng - loc1.lng);
        
        const a = 
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.toRad(loc1.lat)) * 
            Math.cos(this.toRad(loc2.lat)) * 
            Math.sin(dLng / 2) * Math.sin(dLng / 2);
        
        const distance = R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        
        return distance <= maxDistance;
    }

    private static toRad(degrees: number): number {
        return degrees * (Math.PI / 180);
    }
}
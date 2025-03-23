// hooks/useGeolocation.ts
import { useState, useEffect } from 'react';

interface GeolocationPosition {
  coords: {
    latitude: number;
    longitude: number;
  };
}

interface GeolocationError {
  code: number;
  message: string;
}

const useGeolocation = () => {
  const [position, setPosition] = useState<GeolocationPosition | null>(null);
  const [errors, setErrors] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setErrors('Geolocation is not supported by your browser');
      return;
    }

    const handleSuccess = (position: GeolocationPosition) => {
      setPosition(position);
    };

    const handleError = (error: GeolocationError) => {
      setErrors(`Unable to retrieve your location: ${error.message}`);
    };

    navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
  }, []);

  return { position, errors };
};

export default useGeolocation;
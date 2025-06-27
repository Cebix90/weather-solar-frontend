import { useState, useEffect } from "react";

export function useGeolocation() {
  const [coords, setCoords] = useState({ latitude: null, longitude: null });

  useEffect(() => {
    if (!navigator.geolocation) {
      console.error("Geolocation not supported");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords }) =>
        setCoords({
          latitude: coords.latitude,
          longitude: coords.longitude,
        }),
      (err) => console.error(err),
      { enableHighAccuracy: true }
    );
  }, []);

  return coords;
}

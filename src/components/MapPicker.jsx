import React from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";

export default function MapPicker({ latitude, longitude, onChange }) {
  function LocationMarker() {
    useMapEvents({
      click(e) {
        onChange(e.latlng.lat, e.latlng.lng);
      },
    });

    return latitude && longitude ? (
      <Marker position={[latitude, longitude]} />
    ) : null;
  }

  return (
    <div className="my-4 h-[350px] rounded-lg overflow-hidden shadow-md">
      <MapContainer
        center={[latitude || 51.1, longitude || 17.0]}
        zoom={5}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <LocationMarker />
      </MapContainer>
    </div>
  );
}

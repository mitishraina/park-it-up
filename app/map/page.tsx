"use client";
import { useState, useEffect } from "react";
import { APIProvider } from "@vis.gl/react-google-maps";
import SideBar from "./SideBar";
import MapContainer from "./MapContainer";
import { useQueryParams } from "./useQueryParams";

export default function MapPage() {
  // Shared map center state
  const [center, setCenter] = useState<{ lat: number; lng: number }>({
    lat: 28.7041,
    lng: 77.1025,
  });

  // Read query params on mount
  const { lat, lng } = useQueryParams();
  useEffect(() => {
    if (lat && lng && !isNaN(Number(lat)) && !isNaN(Number(lng))) {
      setCenter({ lat: Number(lat), lng: Number(lng) });
    }
  }, [lat, lng]);

  // Handler for both side bar and map autocomplete
  interface PlaceSelect {
    location: { lat: () => number; lng: () => number } | { lat: number; lng: number };
  }
  const handlePlaceSelect = (place: PlaceSelect) => {
    if (!place.location) return;
    // Support both function and number for lat/lng
    const lat = typeof place.location.lat === 'function' ? place.location.lat() : place.location.lat;
    const lng = typeof place.location.lng === 'function' ? place.location.lng() : place.location.lng;
    setCenter({ lat, lng });
  };

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!} libraries={["places", "marker"]}>
      <div className="fixed inset-0 w-screen h-screen z-0 bg-[linear-gradient(145deg,_#1a1d29_0%,_#1e293b_100%)]">
        {/* Map container - REMOVED nested APIProvider */}
        <MapContainer  center={center} onPlaceSelect={handlePlaceSelect} />
        
        {/* Sidebar overlay */}
        <div className="absolute top-6 left-6 z-20 w-[90vw] max-w-md sm:w-[44rem] rounded-2xl overflow-hidden max-h-[92vh] pointer-events-none">
          <div className="pointer-events-auto">
            <SideBar onPlaceSelect={handlePlaceSelect} />
          </div>
        </div>
      </div>
    </APIProvider>
  );
}

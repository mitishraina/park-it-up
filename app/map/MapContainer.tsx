import { useState, useEffect, useCallback } from "react";
import { Map, AdvancedMarker, useMapsLibrary } from "@vis.gl/react-google-maps";

const mapId = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID;

// Define types for parking lot
interface ParkingLot {
  id: string;
  displayName: string;
  location: { lat: () => number; lng: () => number };
  formattedAddress?: string;
}

// Component for nearby search using new Place API
function NearbySearch({ center, onParkingLotsFound }: { 
  center: { lat: number; lng: number }; 
  onParkingLotsFound: (lots: ParkingLot[]) => void;
}) {
  const places = useMapsLibrary("places");

  useEffect(() => {
    if (!places) return;

    const searchNearby = async () => {
      try {
        const { places: nearbyPlaces } = await places.Place.searchNearby({
          locationRestriction: {
            center: { lat: center.lat, lng: center.lng },
            radius: 1000
          },
          includedTypes: ['parking'],
          fields: ['id', 'displayName', 'location', 'formattedAddress'],
          maxResultCount: 20
        });

        if (nearbyPlaces) {
          onParkingLotsFound(nearbyPlaces as ParkingLot[]);
        } else {
          onParkingLotsFound([]);
        }
      } catch (error) {
        console.error('Nearby search failed:', error);
        onParkingLotsFound([]);
      }
    };

    searchNearby();
  }, [places, center, onParkingLotsFound]);

  return null;
}

// Main content component
function MapContent({ center, onPlaceSelect }: { 
  center: { lat: number; lng: number }, 
  onPlaceSelect: (place: { location: { lat: () => number; lng: () => number } }) => void 
}) {
  const [parkingLots, setParkingLots] = useState<ParkingLot[]>([]);
  const [mapCenter, setMapCenter] = useState(center);

  // Memoize onPlaceSelect to ensure stability
  const stableOnPlaceSelect = useCallback((place: { location: { lat: () => number; lng: () => number } }) => {
    onPlaceSelect(place);
  }, [onPlaceSelect]);

  // Update map center only when center prop changes (from autocomplete)
  useEffect(() => {
    setMapCenter(center);
  }, [center]);

  // Handle map camera changes to allow free movement
  const handleCameraChange = (event: { detail?: { center?: { lat: number; lng: number } } }) => {
    if (event.detail && event.detail.center) {
      setMapCenter({
        lat: event.detail.center.lat,
        lng: event.detail.center.lng
      });
    }
  };

  // Handle marker clicks to use onPlaceSelect
  const handleMarkerClick = useCallback((lot: ParkingLot) => {
    if (lot.location) {
      stableOnPlaceSelect({
        location: lot.location
      });
    }
  }, [stableOnPlaceSelect]);

  return (
    <div className="relative w-screen h-screen">
      <Map
        center={mapCenter}
        defaultZoom={14}
        gestureHandling="greedy"
        disableDefaultUI={false}
        mapTypeControl={false}
        colorScheme="DARK"
        style={{ width: "100vw", height: "100vh" }}
        mapId={mapId}
        onCameraChanged={handleCameraChange}
      >
        <NearbySearch 
          center={mapCenter} 
          onParkingLotsFound={setParkingLots} 
        />
        {parkingLots.map((lot) =>
          lot.location ? (
            <AdvancedMarker
              key={lot.id}
              position={{ 
                lat: lot.location.lat(), 
                lng: lot.location.lng() 
              }}
              title={lot.displayName}
              onClick={() => handleMarkerClick(lot)}
            />
          ) : null
        )}
      </Map>
    </div>
  );
}

// Main export - REMOVED nested APIProvider
export default function MapContainer({ center, onPlaceSelect }: { 
  center: { lat: number; lng: number }, 
  onPlaceSelect: (place: { location: { lat: () => number; lng: () => number } }) => void 
}) {
  return <MapContent center={center} onPlaceSelect={onPlaceSelect} />;
}

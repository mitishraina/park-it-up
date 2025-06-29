import { useState, useEffect, useCallback } from "react";
import { Map, AdvancedMarker, useMapsLibrary } from "@vis.gl/react-google-maps";
import { ParkingLocation, PlaceSelect } from "./types";

const mapId = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID;

// --- Type Definitions for Google API responses to avoid 'any' ---
interface GooglePlacePhoto {
  name: string;
  getURI: (options: { maxWidth: number; maxHeight: number }) => string;
}

interface GooglePlaceSearchResult {
  id: string;
  displayName?: string;
  formattedAddress?: string;
  location: {
    lat: number | (() => number);
    lng: number | (() => number);
  };
  rating?: number;
  priceLevel?: number;
  photos?: GooglePlacePhoto[];
}
// ---

interface ParkingMarkerProps {
  parking: ParkingLocation;
  isSelected: boolean;
  onClick: (parking: ParkingLocation) => void;
}

function ParkingMarker({ parking, isSelected, onClick }: ParkingMarkerProps) {
  // Responsive: smaller marker for mobile
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;

  const getMarkerStyle = () => {
    const baseStyle = isMobile
      ? "rounded px-1.5 py-0.5 text-xs shadow border min-w-[24px] text-center"
      : "rounded-xl px-3 py-2 font-bold text-sm shadow-lg border-2 cursor-pointer transition-all duration-200 min-w-[50px] text-center";
    
    if (isSelected) {
      return `${baseStyle} bg-blue-600 text-white border-blue-400 scale-110 z-50`;
    }
    
    switch (parking.category) {
      case 'best-value':
        return `${baseStyle} bg-green-600 text-white border-green-400`;
      case 'shortest-walk':
        return `${baseStyle} bg-orange-600 text-white border-orange-400`;
      case 'highest-rated':
        return `${baseStyle} bg-purple-600 text-white border-purple-400`;
      default:
        return `${baseStyle} bg-white text-gray-800 border-gray-300`;
    }
  };

  const getCategoryLabel = () => {
    switch (parking.category) {
      case 'best-value':
        return 'Best Value';
      case 'shortest-walk':
        return 'Shortest Walk';
      case 'highest-rated':
        return 'Highest Rated';
      default:
        return null;
    }
  };

  return (
    <AdvancedMarker
      position={parking.location}
      onClick={() => onClick(parking)}
      zIndex={isSelected ? 1000 : parking.category ? 100 : 1}
    >
      <div className="flex flex-col items-center">
        {parking.category && (
          <div className="bg-black text-white text-xs px-2 py-1 rounded mb-1 whitespace-nowrap">
            {getCategoryLabel()}
          </div>
        )}
        
        <div className={getMarkerStyle()}>
          ${parking.price}
        </div>
        
        {parking.availableSpots <= 3 && parking.availableSpots > 0 && (
          <div className="bg-red-500 text-white text-xs px-1 py-0.5 rounded mt-1">
            {parking.availableSpots} left
          </div>
        )}
      </div>
    </AdvancedMarker>
  );
}

function NearbySearch({ 
  center, 
  onParkingLotsFound 
}: { 
  center: { lat: number; lng: number }; 
  onParkingLotsFound: (lots: ParkingLocation[]) => void;
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
          fields: ['id', 'displayName', 'location', 'formattedAddress', 'rating', 'priceLevel', 'photos'],
          maxResultCount: 20
        });

        if (nearbyPlaces && nearbyPlaces.length > 0) {
          const mappedParkingLots = await Promise.all(
            // FIXED: Replaced 'any' with the specific 'GooglePlaceSearchResult' type
            (nearbyPlaces as GooglePlaceSearchResult[]).map(async (place, index: number) => {
              const lat = typeof place.location.lat === 'function' ? place.location.lat() : place.location.lat;
              const lng = typeof place.location.lng === 'function' ? place.location.lng() : place.location.lng;
              
              let photoUrl: string | undefined = undefined;
              if (place.photos && place.photos.length > 0) {
                try {
                  photoUrl = place.photos[0].getURI({ maxWidth: 400, maxHeight: 400 });
                } catch {
                  if (place.photos[0].name) {
                    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
                    photoUrl = `https://places.googleapis.com/v1/${place.photos[0].name}/media?maxHeightPx=400&maxWidthPx=400&key=${apiKey}`;
                  }
                }
              }

              const basePrice = 15 + Math.floor(Math.random() * 50);
              const rating = Number((3.5 + Math.random() * 1.5).toFixed(1));
              const reviewCount = 50 + Math.floor(Math.random() * 300);
              const walkingTime = 2 + Math.floor(Math.random() * 15);
              const availableSpots = Math.floor(Math.random() * 20);
              const totalSpots = availableSpots + Math.floor(Math.random() * 30);

              let category: ParkingLocation['category'] = undefined;
              if (index === 0) category = 'best-value';
              else if (index === 1) category = 'shortest-walk';
              else if (index === 2) category = 'highest-rated';

              return {
                id: place.id,
                name: place.displayName || 'Parking Lot',
                address: place.formattedAddress || 'Address not available',
                price: basePrice,
                rating,
                reviewCount,
                walkingTime,
                walkingDistance: `${(walkingTime * 0.05).toFixed(1)}mi`,
                availableSpots,
                totalSpots,
                location: { lat, lng },
                photoUrl,
                category,
                features: ['Security Camera', 'Covered', 'EV Charging'].slice(0, Math.floor(Math.random() * 3))
              };
            })
          );

          onParkingLotsFound(mappedParkingLots);
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

export default function MapContainer({ 
  center, 
  // onPlaceSelect,
  parkingLocations, 
  selectedParking, 
  onParkingSelect 
}: { 
  center: { lat: number; lng: number };
  onPlaceSelect: (place: PlaceSelect) => void;
  parkingLocations: ParkingLocation[];
  selectedParking: ParkingLocation | null;
  onParkingSelect: (parking: ParkingLocation) => void;
}) {
  const [mapCenter, setMapCenter] = useState(center);
  const [nearbyParkingLots, setNearbyParkingLots] = useState<ParkingLocation[]>([]);

  useEffect(() => {
    setMapCenter(center);
  }, [center]);

  const handleCameraChange = (event: { detail?: { center?: { lat: number; lng: number } } }) => {
    if (event.detail && event.detail.center) {
      setMapCenter({
        lat: event.detail.center.lat,
        lng: event.detail.center.lng
      });
    }
  };

  const handleParkingClick = useCallback((parking: ParkingLocation) => {
    onParkingSelect(parking);
  }, [onParkingSelect]);

  const handleNearbyParkingFound = useCallback((lots: ParkingLocation[]) => {
    setNearbyParkingLots(lots);
  }, []);

  const allParkingLocations = [
    ...parkingLocations,
    ...nearbyParkingLots.filter(nearby => 
      !parkingLocations.some(existing => existing.id === nearby.id)
    )
  ];

  return (
    <div className="relative w-full h-full">
      <Map
        center={mapCenter}
        defaultZoom={16} // Increased from 14 to 16 for a closer initial view
        gestureHandling="greedy"
        disableDefaultUI={false}
        mapTypeControl={false}
        colorScheme="LIGHT"
        style={{ width: "100%", height: "100%" }}
        mapId={mapId}
        onCameraChanged={handleCameraChange}
      >
        <NearbySearch 
          center={mapCenter} 
          onParkingLotsFound={handleNearbyParkingFound} 
        />
        
        {allParkingLocations.map((parking) => (
          <ParkingMarker
            key={parking.id}
            parking={parking}
            isSelected={selectedParking?.id === parking.id}
            onClick={handleParkingClick}
          />
        ))}
      </Map>
    </div>
  );
}

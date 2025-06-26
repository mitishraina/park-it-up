// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState, useEffect } from "react";
import { FaSearch} from "react-icons/fa";
// import Image from "next/image";
import { useMapsLibrary } from "@vis.gl/react-google-maps";
import "./sidebar-scrollbar.css";
import ParkingList, { ParkingPlace } from "./ParkingList";
import ParkingDetail from "./ParkingDetail";
import { useQueryParams } from "./useQueryParams";

// Define proper types for Google Maps API responses
interface AutocompleteSuggestion {
  placePrediction: {
    text: { text: string };
    structuredFormat?: {
      secondaryText: { text: string };
    };
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface PlaceResult {
  id: string;
  displayName: string;
  location: {
    lat: () => number;
    lng: () => number;
  } | {
    lat: number;
    lng: number;
  };
  formattedAddress: string;
  rating?: number;
  priceLevel?: number;
  photos?: Array<{
    getURI: (options: { maxWidth: number; maxHeight: number }) => string;
    name?: string;
  }>;
}

// Use PlaceSelect for prop and callback types
export interface PlaceSelect {
  name?: string;
  location: {
    lat: () => number;
    lng: () => number;
  } | {
    lat: number;
    lng: number;
  };
  formatted_address?: string;
  place_id?: string;
}

export default function SideBar({ onPlaceSelect }: { onPlaceSelect?: (place: PlaceSelect) => void }) {
  const places = useMapsLibrary("places");
  const [suggestions, setSuggestions] = useState<AutocompleteSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [parkingPlaces, setParkingPlaces] = useState<ParkingPlace[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<ParkingPlace | null>(null);
  const { lat, lng } = useQueryParams();

  // Memoize onPlaceSelect to prevent unnecessary re-renders
  const stableOnPlaceSelect = React.useCallback((place: PlaceSelect) => {
    onPlaceSelect?.(place);
  }, [onPlaceSelect]);

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setInputValue(query);
    if (!places || query.length < 3) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    try {
      const { suggestions: autocompleteSuggestions } = await places.AutocompleteSuggestion.fetchAutocompleteSuggestions({
        input: query,
        locationBias: { lat: 28.7041, lng: 77.1025 },
        includedPrimaryTypes: ["establishment", "geocode"],
        language: "en",
        region: "IN"
      });
      console.log("Autocomplete suggestions:", autocompleteSuggestions);
      setSuggestions((autocompleteSuggestions || []).filter(s => s.placePrediction !== null) as AutocompleteSuggestion[]);
      setShowSuggestions(true);
    } catch {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = async (suggestion: AutocompleteSuggestion) => {
    if (!places) return;
    try {
      // Get place details for the selected suggestion
      const { places: placeResults } = await places.Place.searchByText({
        textQuery: suggestion.placePrediction.text.text,
        fields: ["id", "displayName", "location", "formattedAddress", "rating", "priceLevel", "photos"],
        locationBias: { lat: 28.7041, lng: 77.1025 }
      });
      
      if (!placeResults || placeResults.length === 0 || !placeResults[0].location) {
        setParkingPlaces([]);
        setShowSuggestions(false);
        return;
      }
      
      const center = placeResults[0].location;
      
      // Move the map to the searched location
      stableOnPlaceSelect({
        name: placeResults[0].displayName ?? "",
        location: center,
        formatted_address: placeResults[0].formattedAddress ?? "",
        place_id: placeResults[0].id
      });
      
      // Now search for nearby parking using the found location
      const { places: searchResults } = await places.Place.searchNearby({
        locationRestriction: {
          center,
          radius: 1000
        },
        includedTypes: ["parking"],
        fields: ["id", "displayName", "location", "formattedAddress", "rating", "priceLevel", "photos"],
        maxResultCount: 20
      });
      
      console.log("Nearby parking places (raw):", searchResults);
      
      if (searchResults && searchResults.length > 0) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const mapped = await Promise.all(searchResults.map(async (p: any) => {
          const lat = typeof p.location.lat === 'function' ? p.location.lat() : p.location.lat;
          const lng = typeof p.location.lng === 'function' ? p.location.lng() : p.location.lng;
          let photoUrl = undefined;
          
          // Correct way to get photos from new Places API
          if (p.photos && p.photos.length > 0) {
            try {
              // The new API uses getURI() method on photo objects
              photoUrl = p.photos[0].getURI({ maxWidth: 400, maxHeight: 400 });
              console.log("Photo URL generated:", photoUrl);
            } catch {
              // Fallback: try to access photo name for manual URL construction
              if (p.photos[0].name) {
                const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
                photoUrl = `https://places.googleapis.com/v1/${p.photos[0].name}/media?maxHeightPx=400&maxWidthPx=400&key=${apiKey}`;
                console.log("Fallback photo URL:", photoUrl);
              }
            }
          }
          
          return {
            id: p.id,
            name: p.displayName,
            address: p.formattedAddress,
            rating: p.rating || 4.0,
            priceLevel: p.priceLevel || 2,
            location: { lat, lng },
            photoUrl
          };
        }));
        
        console.log("Final displayed parking places:", mapped);
        setParkingPlaces(mapped);
        setShowSuggestions(false);
      } else {
        setParkingPlaces([]);
        setShowSuggestions(false);
      }
    } catch (error) {
      console.error("Error in handleSuggestionClick:", error);
      setParkingPlaces([]);
      setShowSuggestions(false);
    }
  };

  const handleParkingSelect = (place: ParkingPlace) => {
    setSelectedPlace(place);
  };
  
  const handleCloseDetail = () => setSelectedPlace(null);

  // Auto-search for parking if lat/lng are present in query params
  useEffect(() => {
    if (!places || !lat || !lng || isNaN(Number(lat)) || isNaN(Number(lng))) return;
    (async () => {
      const center = { lat: Number(lat), lng: Number(lng) };
      // Optionally, call onPlaceSelect to move the map as well
      stableOnPlaceSelect({ location: { lat: () => center.lat, lng: () => center.lng } });
      
      // Search for nearby parking
      const { places: searchResults } = await places.Place.searchNearby({
        locationRestriction: {
          center,
          radius: 1000
        },
        includedTypes: ["parking"],
        fields: ["id", "displayName", "location", "formattedAddress", "rating", "priceLevel", "photos"],
        maxResultCount: 20
      });
      if (searchResults && searchResults.length > 0) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const mapped = await Promise.all(searchResults.map(async (p: any) => {
          const lat = typeof p.location.lat === 'function' ? p.location.lat() : p.location.lat;
          const lng = typeof p.location.lng === 'function' ? p.location.lng() : p.location.lng;
          let photoUrl = undefined;
          if (p.photos && p.photos.length > 0) {
            try {
              photoUrl = p.photos[0].getURI({ maxWidth: 400, maxHeight: 400 });
            } catch {
              if (p.photos[0].name) {
                const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
                photoUrl = `https://places.googleapis.com/v1/${p.photos[0].name}/media?maxHeightPx=400&maxWidthPx=400&key=${apiKey}`;
              }
            }
          }
          return {
            id: p.id,
            name: p.displayName ?? "",
            address: p.formattedAddress ?? "",
            rating: p.rating || 4.0,
            priceLevel: p.priceLevel || 2,
            location: { lat, lng },
            photoUrl
          };
        }));
        setParkingPlaces(mapped);
      } else {
        setParkingPlaces([]);
      }
    })();
  }, [places, lat, lng]);

  return (
    <aside className="h-full max-h-[92vh] w-full flex-none bg-[#151823] rounded-2xl shadow-2xl flex flex-col px-6 py-6 border border-[#23263a] relative">
      <h2 className="text-2xl font-bold text-[#e2e8f0] mb-6">Available Parkings</h2>
      
      <div className="mb-6 relative">
        <div className="flex items-center bg-[#2a2f3e] rounded-xl px-4 py-3 border border-[#374151] focus-within:ring-2 focus-within:ring-[#3b82f6]/60">
          <FaSearch className="text-[#94a3b8] w-4 h-4 mr-3" />
          <input
            type="text"
            value={inputValue}
            placeholder="Search location..."
            onChange={handleInputChange}
            className="bg-transparent outline-none text-[#e2e8f0] placeholder-[#94a3b8] flex-1 text-sm"
          />
        </div>
        
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-[#2a2f3e] border border-[#374151] rounded-xl shadow-lg max-h-60 overflow-y-auto z-50">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="p-3 hover:bg-[#374151] cursor-pointer text-[#e2e8f0] text-sm border-b border-[#374151] last:border-b-0"
              >
                <div className="font-medium">
                  {suggestion.placePrediction?.text?.text || 'Unknown'}
                </div>
                {suggestion.placePrediction?.structuredFormat?.secondaryText && (
                  <div className="text-xs text-[#94a3b8] mt-1">
                    {suggestion.placePrediction.structuredFormat.secondaryText.text}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="mb-4 flex justify-end">
        <select className="w-48 bg-[#2a2f3e] text-[#e2e8f0] border border-[#374151] rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/60">
          <option value="popularity">Sort by Popularity</option>
          <option value="price">Sort by Price</option>
          <option value="distance">Sort by Distance</option>
        </select>
      </div>
      
      <ParkingList places={parkingPlaces} onSelect={handleParkingSelect} selectedId={selectedPlace?.id} />
      
      {/* Slide-in detail panel */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className={`absolute top-0 left-0 h-full w-full transition-transform duration-300 z-40 ${selectedPlace ? 'translate-x-0' : '-translate-x-full'} pointer-events-auto`}
          style={{ maxWidth: '100%' }}
        >
          {selectedPlace && (
            <ParkingDetail place={selectedPlace} onClose={handleCloseDetail} />
          )}
        </div>
      </div>
    </aside>
  );
}

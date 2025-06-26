'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useMapsLibrary } from "@vis.gl/react-google-maps";
import { Input } from "./input";
import { FaSearch } from "react-icons/fa";

// Define types for suggestions and place predictions
interface PlacePrediction {
  text: { text: string };
  structuredFormat?: { secondaryText?: { text: string } };
}
interface Suggestion {
  placePrediction: PlacePrediction;
}

export default function LocationAutocomplete({ placeholder = "Search for parking...", className = "" }) {
  const places = useMapsLibrary("places");
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const router = useRouter();

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
      setSuggestions((autocompleteSuggestions || []) as Suggestion[]);
      setShowSuggestions(true);
    } catch {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = async (suggestion: Suggestion) => {
    if (!places) return;
    try {
      // Get place details for the selected suggestion
      const { places: placeResults } = await places.Place.searchByText({
        textQuery: suggestion.placePrediction.text.text,
        fields: ["id", "displayName", "location", "formattedAddress"],
        locationBias: { lat: 28.7041, lng: 77.1025 }
      });
      if (!placeResults || placeResults.length === 0 || !placeResults[0].location) {
        setShowSuggestions(false);
        return;
      }
      const center = placeResults[0].location;
      // Redirect to /map with query params for lat/lng and name
      router.push(`/map?lat=${center.lat()}&lng=${center.lng()}&name=${encodeURIComponent(placeResults[0].displayName || "")}`);
    } catch {
      setShowSuggestions(false);
    }
  };

  return (
    <div className={`relative w-full ${className}`}>
      <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
      <Input
        placeholder={placeholder}
        className="pl-12 w-full rounded-full h-12 bg-[#232834] text-gray-100 border-[#4d84a4]"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => setShowSuggestions(suggestions.length > 0)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
      />
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-[#232834] border border-[#374151] rounded-xl shadow-lg max-h-60 overflow-y-auto z-50">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              onMouseDown={() => handleSuggestionClick(suggestion)}
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
  );
}

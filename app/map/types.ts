// types.ts

export interface ParkingLocation {
  id: string;
  place_id?: string; // Add place_id for Place Details API calls
  name: string;
  address: string;
  price: number;
  rating: number;
  reviewCount: number;
  walkingTime: number;
  walkingDistance: string;
  availableSpots: number;
  totalSpots: number;
  location: { lat: number; lng: number };
  photoUrl?: string; // Main photo
  photoUrls?: string[]; // Array for multiple photos
  category?: 'best-value' | 'shortest-walk' | 'highest-rated';
  features?: string[];
}

export interface ParkingPlace {
  id: string;
  name: string;
  address?: string;
  rating?: number;
  priceLevel?: number;
  location: { lat: number; lng: number };
  photoUrl?: string;
}

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

export interface AutocompleteSuggestion {
  placePrediction: {
    text: { text: string };
    placeId: string; // Ensure we get placeId for detail lookups
    structuredFormat?: {
      secondaryText: { text: string };
    };
  };
}

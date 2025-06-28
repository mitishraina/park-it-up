import React from "react";
import { ParkingPlace } from "./types";


interface ParkingListProps {
  places: ParkingPlace[];
  onSelect: (place: ParkingPlace) => void;
  selectedId?: string;
}

export default function ParkingList({ places, onSelect, selectedId }: ParkingListProps) {
  // Fallback image path (ensure this exists in /public)
  const fallbackImg = "/car_parking.svg";

  return (
    <div className="flex-1 min-h-0 overflow-y-auto pr-2 custom-scrollbar space-y-3">
      {places.length === 0 && (
        <div className="text-[#94a3b8] text-center py-8">No parking places found.</div>
      )}
      {places.map((place) => (
        <div
          key={place.id}
          className={`bg-[#2a3441] rounded-xl p-4 border border-[#374151]/50 hover:bg-[#334155] transition-all duration-200 hover:border-[#3b82f6]/30 cursor-pointer ${selectedId === place.id ? 'ring-2 ring-[#3b82f6]/60' : ''}`}
          onClick={() => onSelect(place)}
        >
          <div className="flex items-center gap-3">
            {/* Placeholder for image */}
            <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-[#374151] bg-[#23263a] flex items-center justify-center">
              {place.photoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={place.photoUrl}
                  alt={place.name}
                  className="object-cover w-full h-full"
                  onError={e => {
                    const target = e.currentTarget;
                    if (target.src !== fallbackImg) target.src = fallbackImg;
                  }}
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={fallbackImg} alt="No Image" className="object-cover w-full h-full opacity-60" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="mb-1">
                <h3 className="font-semibold text-[#e2e8f0] text-base leading-tight truncate">
                  {place.name}
                </h3>
              </div>
              <div className="text-xs text-[#94a3b8] truncate">{place.address}</div>
              <div className="flex items-center gap-2 mt-1">
                {place.rating && (
                  <span className="text-[#f59e0b] font-medium">★ {place.rating}</span>
                )}
                {place.priceLevel && (
                  <span className="text-[#10b981] font-medium">Price: {place.priceLevel}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

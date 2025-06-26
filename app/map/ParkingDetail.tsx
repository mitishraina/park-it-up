import React from "react";
import { ParkingPlace } from "./ParkingList";

interface ParkingDetailProps {
  place: ParkingPlace;
  onClose: () => void;
}

export default function ParkingDetail({ place, onClose }: ParkingDetailProps) {
  return (
    <div className="fixed top-0 left-0 h-full w-[28rem] max-w-full bg-[#181c2a] z-50 shadow-2xl transition-transform duration-300 ease-in-out translate-x-0">
      <button
        className="absolute top-4 right-4 text-[#e2e8f0] bg-[#23263a] rounded-full w-8 h-8 flex items-center justify-center hover:bg-[#374151]"
        onClick={onClose}
        aria-label="Close details"
      >
        ×
      </button>
      <div className="p-8 pt-16">
        <h2 className="text-2xl font-bold text-[#e2e8f0] mb-4">{place.name}</h2>
        {/* eslint-disable-next-line @next/next/no-img-element, @typescript-eslint/ban-ts-comment */}
        {place.photoUrl && (
          <img src={place.photoUrl} alt={place.name} className="w-full h-48 object-cover rounded-xl mb-4" />
        )}
        <div className="text-[#94a3b8] mb-2">{place.address}</div>
        {place.rating && (
          <div className="mb-2 text-[#f59e0b]">★ {place.rating}</div>
        )}
        {place.priceLevel && (
          <div className="mb-2 text-[#10b981]">Price Level: {place.priceLevel}</div>
        )}
        <div className="mt-6">
          <button className="w-full py-3 rounded-lg bg-[#4A6CF7] hover:bg-[#3b5ae0] text-white font-semibold text-base transition-all duration-200 shadow-lg hover:shadow-xl hover:shadow-[#4A6CF7]/25 active:scale-[0.98]">
            Book This Parking
          </button>
        </div>
      </div>
    </div>
  );
}

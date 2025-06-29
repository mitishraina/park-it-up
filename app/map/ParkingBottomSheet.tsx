import React from 'react';
import { FaStar, FaWalking, FaTimes, FaMapMarkerAlt } from 'react-icons/fa';
import Image from "next/image";
import { ParkingLocation } from './types';

interface ParkingBottomSheetProps {
  parking: ParkingLocation;
  onClose: () => void;
}

export default function ParkingBottomSheet({ parking, onClose }: ParkingBottomSheetProps) {
  const fallbackImg = "/car_parking.svg";

  const getAvailabilityColor = () => {
    if (parking.availableSpots <= 3) return 'text-red-400';
    if (parking.availableSpots <= 8) return 'text-orange-400';
    return 'text-green-400';
  };

  const getAvailabilityText = () => {
    if (parking.availableSpots <= 3) return `${parking.availableSpots} left`;
    if (parking.availableSpots <= 8) return 'Limited availability';
    return 'Available';
  };

  const getCategoryBadge = () => {
    if (!parking.category) return null;
    
    const badges = {
      'best-value': { label: 'Best Value', color: 'bg-green-600', icon: '💰' },
      'shortest-walk': { label: 'Shortest Walk', color: 'bg-orange-600', icon: '🚶♂️' },
      'highest-rated': { label: 'Highest Rated', color: 'bg-purple-600', icon: '⭐' }
    };
    
    const badge = badges[parking.category];
    return (
      <div className={`${badge.color} text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1`}>
        <span>{badge.icon}</span>
        {badge.label}
      </div>
    );
  };

  return (
    // Fixed: Proper positioning and z-index for bottom sheet
    <div className="fixed inset-0 z-[2000] flex items-end justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50" 
        onClick={onClose}
      />
      
      {/* Bottom Sheet Content */}
      <div className="relative bg-[#1a1a1a] w-full max-w-md mx-4 mb-4 rounded-t-2xl shadow-2xl transform transition-transform duration-300 ease-out">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-[#2d2d2d] hover:bg-[#374151] text-[#e2e8f0] p-2 rounded-full transition-colors"
        >
          <FaTimes className="text-lg" />
        </button>

        {/* Content */}
        <div className="p-6">
          {/* Category Badge */}
          <div className="mb-4">
            {getCategoryBadge()}
          </div>

          {/* Parking Image */}
          <div className="mb-2">
            <Image
              src={parking.photoUrl || fallbackImg}
              alt={parking.name}
              width={192}
              height={80}
              className="w-full h-20 object-cover rounded-lg"
              unoptimized
            />
          </div>

          {/* Parking Details */}
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-bold text-[#e2e8f0] mb-2">{parking.name}</h3>
              <p className="text-[#9ca3af] flex items-center gap-2">
                <FaMapMarkerAlt className="text-sm" />
                {parking.address}
              </p>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <FaStar className="text-yellow-400" />
                  <span className="text-[#e2e8f0]">{parking.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <FaWalking className="text-[#9ca3af]" />
                  <span className="text-[#e2e8f0]">{parking.walkingTime} min</span>
                </div>
              </div>
              <div className={`font-medium ${getAvailabilityColor()}`}>
                {getAvailabilityText()}
              </div>
            </div>

            {/* Price */}
            <div className="text-center py-4 border-t border-[#374151]">
              <div className="text-3xl font-bold text-[#e2e8f0]">
                ${parking.price}
                <span className="text-lg text-[#9ca3af] font-normal">/hour</span>
              </div>
              <p className="text-sm text-[#9ca3af] mt-1">
                Total price may vary based on duration
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

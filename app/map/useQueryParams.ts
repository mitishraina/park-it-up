// Utility hook to get query params in app directory
'use client';
import { useSearchParams } from 'next/navigation';

export function useQueryParams() {
  const params = useSearchParams();
  return {
    lat: params?.get('lat'),
    lng: params?.get('lng'),
    name: params?.get('name'),
  };
}

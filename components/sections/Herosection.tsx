'use client';

import React from 'react'
import { APIProvider } from '@vis.gl/react-google-maps';
import { CircleCheckBig } from "lucide-react"
import { Badge } from "../ui/badge"
import LocationAutocomplete from "../ui/LocationAutocomplete"

const Herosection = () => {
    return (
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!} libraries={["places", "marker"]}>
            <section className="relative w-full min-h-[80vh] flex items-center justify-center bg-[#0a121a] text-white overflow-hidden">
                {/* Background Video - Full Section Coverage */}
                <div className="absolute inset-0 w-full h-full overflow-hidden">
                    <video
                        className="absolute top-0 left-0 w-full h-full object-cover"
                        style={{
                            objectPosition: '80% center', // Move video further right
                            transform: 'translateX(15%)' // Increase rightward shift
                        }}
                        src="/Comp_2.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                    />
                </div>

                {/* Modified Vignette Overlay - Slightly Harsher on Mobile */}
                <div className="absolute inset-0 w-full h-full pointer-events-none">
                    {/* Mobile: slightly harsher vignette and left darkening */}
                    <div 
                        className="absolute inset-0 w-full h-full md:hidden"
                        style={{
                            background: `radial-gradient(ellipse 100% 80% at 25% center, transparent 10%, rgba(10, 18, 26, 0.5) 50%, rgba(10, 18, 26, 0.85) 100%)`
                        }}
                    />
                    <div 
                        className="absolute inset-0 w-full h-full md:hidden"
                        style={{
                            background: `linear-gradient(to right, rgba(10, 18, 26, 0.85) 0%, rgba(10, 18, 26, 0.6) 40%, rgba(10, 18, 26, 0.15) 70%, transparent 90%)`
                        }}
                    />
                    {/* Desktop: original vignette and overlays */}
                    <div 
                        className="absolute inset-0 w-full h-full hidden md:block"
                        style={{
                            background: `radial-gradient(ellipse 120% 100% at 30% center, transparent 20%, rgba(10, 18, 26, 0.4) 60%, rgba(10, 18, 26, 0.8) 100%)`
                        }}
                    />
                    <div 
                        className="absolute inset-0 w-full h-full hidden md:block"
                        style={{
                            background: `linear-gradient(to right, rgba(10, 18, 26, 0.9) 0%, rgba(10, 18, 26, 0.7) 35%, rgba(10, 18, 26, 0.2) 60%, transparent 75%)`
                        }}
                    />
                    <div 
                        className="absolute inset-0 w-full h-full hidden md:block"
                        style={{
                            background: `
                                linear-gradient(to bottom, 
                                    rgba(10, 18, 26, 0.8) 0%, 
                                    transparent 25%, 
                                    transparent 75%, 
                                    rgba(10, 18, 26, 0.8) 100%
                                ),
                                linear-gradient(to right, 
                                    rgba(10, 18, 26, 0.3) 0%, 
                                    rgba(10, 18, 26, 0.1) 50%, 
                                    transparent 70%
                                )`
                        }}
                    />
                </div>

                {/* Content Layer */}
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full max-w-7xl mx-auto px-6 py-16 gap-10">
                    {/* Left: Text Content */}
                    <div className="flex-1 flex flex-col items-start gap-6">
                        <Badge className="mb-6 bg-[#262a34]/80 backdrop-blur-sm text-sm rounded-full font-semibold flex items-center justify-center border border-[#4d84a4]/30">
                            #Now in Delhi 🏙️
                        </Badge>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
                            In a Hurry? <br />
                            PARK It Up!
                        </h1>
                        <p className="text-lg sm:text-xl text-gray-200 max-w-lg">
                            PARK It Up helps you discover, compare, and book parking spots in seconds. Save time, avoid hassle, and park smarter—anywhere, anytime.
                        </p>
                        <div className="flex items-center gap-2 mb-8 w-full max-w-lg">
                            <div className="relative flex-1">
                                <LocationAutocomplete placeholder="Search for parking..." />
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-8 space-y-4 sm:space-y-0 text-sm text-gray-300 justify-center lg:justify-start">
                            <div className="flex items-center space-x-2">
                                <CircleCheckBig className="w-4 h-4 text-[#4d84a4]" />
                                <span>No spam email</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <CircleCheckBig className="w-4 h-4 text-[#4d84a4]" />
                                <span>24/7 support system</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <CircleCheckBig className="w-4 h-4 text-[#4d84a4]" />
                                <span>Free to use</span>
                            </div>
                        </div>
                    </div>

                    {/* Right: Let the video show through naturally */}
                    <div className="hidden md:flex flex-1 items-center justify-center relative min-h-[400px]">
                        {/* Empty space to let video content show through */}
                    </div>
                </div>
            </section>
        </APIProvider>
    )
}

export default Herosection;

'use client';

import React from 'react'
import { APIProvider } from '@vis.gl/react-google-maps';
import { CircleCheckBig } from "lucide-react"
// import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import LocationAutocomplete from "../ui/LocationAutocomplete"

const Herosection = () => {
    return (
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!} libraries={["places", "marker"]}>
            <section className="w-full pt-8 pb-12 bg-[#0f191d] overflow-x-hidden relative min-h-[600px] flex items-center justify-center">
                <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-12 px-6 lg:px-16 py-10">
                    {/* Left: Hero text and search */}
                    <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                        <Badge className="mb-6 bg-[#262a34] text-sm rounded-full font-semibold flex items-center justify-center">
                            #Now in Delhi 🏙️
                        </Badge>
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gradient mb-6 leading-tight wipe-up">
                            In a Hurry? <br />
                            PARK It Up!
                        </h1>
                        <p className="text-md text-gradient2 mb-8 leading-tight max-w-2xl">
                            PARK It Up is integrated with GPS, helping you instantly find the nearest available parking spots with real-time availability and a range of price options to suit your budget.
                        </p>
                        <div className="flex items-center gap-2 mb-8 w-full max-w-lg">
                            <div className="relative flex-1">
                                <LocationAutocomplete placeholder="Search for parking..." />
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-8 space-y-4 sm:space-y-0 text-sm text-gray-500 justify-center lg:justify-start">
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
                    {/* Right: Comp_1 video, seamless and responsive */}
                    <div className="hidden lg:flex justify-center items-center h-full">
                        <video
                            src="/Comp_1.mp4"
                            className="rounded-3xl shadow-2xl w-full max-w-[600px] min-w-[400px] min-h-[400px] max-h-[520px] object-cover object-center"
                            autoPlay
                            loop
                            muted
                            playsInline
                            preload="auto"
                        />
                    </div>
                </div>
            </section>
        </APIProvider>
    )
}

export default Herosection;

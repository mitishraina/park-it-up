import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SiGooglemaps } from "react-icons/si";
import { LayoutGrid } from 'lucide-react';
import { FaCarOn } from "react-icons/fa6";
import Mock1 from '@/components/assets/phone_mockup1.png';
import Image from 'next/image';

const Features = () => {
    return (
        <section className="py-20 bg-[#0a121a]">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="flex flex-col lg:grid lg:grid-cols-2 gap-16 items-center">
                    <div className="relative h-[400px] sm:h-[500px] md:h-[600px] flex items-center justify-center mb-10 lg:mb-0">
                        <div className="absolute inset-0 bg-[#1e242b] w-46 sm:w-80 rounded-3xl left-1/2 -translate-x-1/2 h-[320px] sm:h-[500px] top-10 shadow-xl shadow-[#4d84a4]"></div>
                        <Image
                            src={Mock1}
                            alt="Mobile app interface"
                            width={300}
                            height={650}
                            className="h-[350px] sm:h-[650px] w-auto object-contain transform -rotate-12 relative z-10"
                            priority
                        />
                    </div>

                    <div>
                        <Badge className="mb-6 bg-[#232834] text-white h-6 rounded-full">Our best features for you 💎</Badge>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gradient2 mb-6">THE SOLUTION TO YOUR PARKING PROBLEMS</h1>                        
                        <p className="text-md text-gray-400 mb-8">
                            At PARK It Up, we understand the daily struggle of finding a parking spot. That&#39;s why we&#39;ve developed a smart solution designed to eliminate the hassle and make parking effortless.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-fit mx-auto lg:mx-0">
                            <Card className="feature-card bg-[#232834] hover:scale-105 hover:bg-[#4d84a4] transition-all">
                                <CardContent className="">
                                    <div className="flex flex-col items-start gap-4">
                                        <div className="w-12 h-12 bg-gradient-to-b from-[#2b333b] from-10% to-[#384047] to-80% rounded-lg flex items-center justify-center">
                                            <LayoutGrid className="w-6 h-6 text-gray-400" />
                                        </div>                                        <div>
                                            <h3 className="text-md text-gray-100">Well Organized Information</h3>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="feature-card bg-[#232834] hover:scale-105 transition-all hover:bg-[#4d84a4]">
                                <CardContent className="">
                                    <div className="flex flex-col items-start gap-4">
                                        <div className="w-12 h-12 bg-gradient-to-b from-[#2b333b] from-10% to-[#384047] to-80% rounded-lg flex items-center justify-center">
                                            <SiGooglemaps className="w-6 h-6 text-gray-400" />
                                        </div>                                        <div>
                                            <h3 className="text-md text-gray-100">Google Maps Integration</h3>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="feature-card bg-[#232834] hover:scale-105 transition-all hover:bg-[#4d84a4]">
                                <CardContent className="">
                                    <div className="flex flex-col items-start gap-4">
                                        <div className="w-12 h-12 bg-gradient-to-b from-[#2b333b] from-10% to-[#384047] to-80% rounded-lg flex items-center justify-center">
                                            <FaCarOn className="w-6 h-6 text-gray-400" />
                                        </div>                        <div>
                                            <h3 className="text-md text-gray-100">Real Time Availability</h3>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                        <Button className="mt-8 bg-[#232834] text-white hover:bg-gray-700 cursor-pointer px-8 py-3 rounded-full border">
                            Learn More
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Features

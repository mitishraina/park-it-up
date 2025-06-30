'use client';

import React from 'react'
import { motion, Variants } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SiGooglemaps } from "react-icons/si";
import { LayoutGrid } from 'lucide-react';
import { FaCarOn } from "react-icons/fa6";
import Mock1 from '@/components/assets/only_phones.png';
import Image from 'next/image';

const Features = () => {
    // Animation variants for the phone (rotating from left to right)
    const phoneVariants: Variants = {
        hidden: {
            x: -200,
            rotate: -45,
            opacity: 0
        },
        visible: {
            x: 0,
            rotate: 10,
            opacity: 1,
            transition: {
                duration: 1.6,
                ease: "anticipate" as const, // Fix: Use 'as const'
                type: "spring" as const,     // Fix: Use 'as const'
                stiffness: 60,
                damping: 18
            }
        }
    };

    // Animation variants for right side content (fade up from bottom)
    const contentVariants: Variants = {
        hidden: {
            y: 60,
            opacity: 0
        },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.8,
                ease: "easeOut" as const // Fix: Use 'as const'
            }
        }
    };

    // Staggered animation for feature cards
    const containerVariants: Variants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const cardVariants: Variants = {
        hidden: {
            y: 40,
            opacity: 0
        },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut" as const // Fix: Use 'as const'
            }
        }
    };

    return (
        <section className="py-20 bg-[#0a121a]" id='features'>
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="flex flex-col lg:grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left side - Phone with rotating animation */}
                    <motion.div 
                        className="relative h-[420px] sm:h-[600px] md:h-[720px] flex items-center justify-center mb-10 lg:mb-0"
                        variants={phoneVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        <Image
                            src={Mock1}
                            alt="Mobile app interface"
                            width={370}
                            height={800}
                            className="h-[400px] sm:h-[700px] w-auto object-contain transform -rotate-12 relative z-10"
                            priority
                        />
                    </motion.div>

                    {/* Right side - Content with fade up animation */}
                    <motion.div
                        variants={contentVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        <motion.div
                            variants={contentVariants}
                        >
                            <Badge className="mb-6 bg-[#232834] text-white h-6 rounded-full">Our best features for you 💎</Badge>
                        </motion.div>
                        
                        <motion.h1 
                            className="text-3xl sm:text-4xl md:text-5xl font-bold text-gradient2 mb-6"
                            variants={contentVariants}
                        >
                            THE SOLUTION TO YOUR PARKING PROBLEMS
                        </motion.h1>
                        
                        <motion.p 
                            className="text-md text-gray-400 mb-8"
                            variants={contentVariants}
                        >
                            At PARK It Up, we understand the daily struggle of finding a parking spot. That&#39;s why we&#39;ve developed a smart solution designed to eliminate the hassle and make parking effortless.
                        </motion.p>
                        
                        <motion.div 
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-fit mx-auto lg:mx-0"
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                        >
                            <motion.div variants={cardVariants}>
                                <Card className="feature-card bg-[#232834] hover:scale-105 hover:bg-[#4d84a4] transition-all">
                                    <CardContent className="">
                                        <div className="flex flex-col items-start gap-4">
                                            <div className="w-12 h-12 bg-gradient-to-b from-[#2b333b] from-10% to-[#384047] to-80% rounded-lg flex items-center justify-center">
                                                <LayoutGrid className="w-6 h-6 text-gray-400" />
                                            </div>
                                            <div>
                                                <h3 className="text-md text-gray-100">Well Organized Information</h3>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                            
                            <motion.div variants={cardVariants}>
                                <Card className="feature-card bg-[#232834] hover:scale-105 transition-all hover:bg-[#4d84a4]">
                                    <CardContent className="">
                                        <div className="flex flex-col items-start gap-4">
                                            <div className="w-12 h-12 bg-gradient-to-b from-[#2b333b] from-10% to-[#384047] to-80% rounded-lg flex items-center justify-center">
                                                <SiGooglemaps className="w-6 h-6 text-gray-400" />
                                            </div>
                                            <div>
                                                <h3 className="text-md text-gray-100">Google Maps Integration</h3>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                            
                            <motion.div variants={cardVariants}>
                                <Card className="feature-card bg-[#232834] hover:scale-105 transition-all hover:bg-[#4d84a4]">
                                    <CardContent className="">
                                        <div className="flex flex-col items-start gap-4">
                                            <div className="w-12 h-12 bg-gradient-to-b from-[#2b333b] from-10% to-[#384047] to-80% rounded-lg flex items-center justify-center">
                                                <FaCarOn className="w-6 h-6 text-gray-400" />
                                            </div>
                                            <div>
                                                <h3 className="text-md text-gray-100">Real Time Availability</h3>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </motion.div>
                        
                        <motion.div
                            variants={contentVariants}
                        >
                            <Button className="mt-8 bg-[#232834] text-white hover:bg-gray-700 cursor-pointer px-8 py-3 rounded-full border">
                                Learn More
                            </Button>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default Features

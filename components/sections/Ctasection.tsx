'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import Mock1 from '@/components/assets/only_phones.png';
import Mock2 from '@/components/assets/phone_mockup2.png';

const Ctasection = () => {
    // Animation variants with proper TypeScript typing
    const containerVariants: Variants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants: Variants = {
        hidden: {
            x: 60,
            opacity: 0
        },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut" as const // Fix: Use 'as const' for string literals
            }
        }
    };

    // Animation variants for smartphones
    const phone1Variants: Variants = {
        hidden: {
            y: -150,
            opacity: 0,
            rotate: -10
        },
        visible: {
            y: 0,
            opacity: 1,
            rotate: 0,
            transition: {
                duration: 1,
                ease: "easeOut" as const, // Fix: Use 'as const'
                type: "spring" as const,  // Fix: Use 'as const'
                stiffness: 100
            }
        }
    };

    const phone2Variants: Variants = {
        hidden: {
            y: 150,
            opacity: 0,
            rotate: 10
        },
        visible: {
            y: 0,
            opacity: 1,
            rotate: 0,
            transition: {
                duration: 1.2,
                ease: "easeOut" as const, // Fix: Use 'as const'
                type: "spring" as const,  // Fix: Use 'as const'
                stiffness: 80,
                delay: 0.3
            }
        }
    };

    return (
        <section className="bg-[#0a121a] py-8 overflow-hidden">
            <div className="container mx-auto p-6 object-contain">
                <div className="bg-[#4d84a4] rounded-2xl p-6 relative overflow-hidden">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-10 items-center object-contain">
                            {/* Left side - Text content with right to left animation */}
                            <motion.div 
                                className="text-center lg:text-left relative z-10"
                                variants={containerVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.3 }}
                            >
                                <motion.div variants={itemVariants}>
                                    <Badge className="mb-6 bg-[#38708d] text-white rounded-full px-4 py-1">
                                        App Coming Soon 🚀
                                    </Badge>
                                </motion.div>

                                <motion.h2 
                                    className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight"
                                    variants={itemVariants}
                                >
                                    BE PART OF THE FUTURE PARKING ERA NOW
                                </motion.h2>

                                <motion.p 
                                    className="text-md text-white/80 mb-8 max-w-lg"
                                    variants={itemVariants}
                                >
                                    Be the first to experience the future of parking. Sign up now to get notified when PARK It Up launches.
                                </motion.p>

                                <motion.div 
                                    className="flex items-center mb-8 max-w-md mx-auto lg:mx-0 bg-[#232834] rounded-full p-1"
                                    variants={itemVariants}
                                >
                                    <Input
                                        placeholder="Enter your email"
                                        className="flex-grow border-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent text-gray-100 h-12"
                                    />
                                    <Button className="px-8 h-12 rounded-full bg-black text-white hover:bg-gray-800 transition-colors">
                                        Get Notified
                                    </Button>
                                </motion.div>
                            </motion.div>

                            {/* Right side - Phone Mockup 2 (bottom to top animation) */}
                            <motion.div 
                                className="relative h-[400px] lg:h-[480px] overflow-visible hidden lg:block"
                                variants={phone2Variants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.3 }}
                            >
                                <div className="overflow-hidden absolute bottom-0 right-0 w-[300px] h-[480px] transform translate-x-12 translate-y-16">
                                    <Image
                                        src={Mock2}
                                        alt="Mockup2"
                                        height={480}
                                        width={240}
                                        className="absolute bottom-0 right-10 transform translate-x-10 translate-y-6 h-[480px] object-contain z-10"
                                        priority
                                    />
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Phone Mockup 1 (top to bottom animation) */}
                <motion.div 
                    className="relative lg:block hidden"
                    variants={phone1Variants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <Image
                        src={Mock1}
                        alt="Mockup1"
                        height={650}
                        width={300}
                        className="absolute transform z-20 -left-30 lg:translate-x-200 lg:-translate-y-160 object-contain"
                        priority
                    />
                </motion.div>
            </div>
        </section>
    )
}

export default Ctasection

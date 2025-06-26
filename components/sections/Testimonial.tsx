"use client"
import React from 'react'
import testimonials from '@/components/utils/testimonials'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import TestimonialCard from '@/components/ui/TestimonialCard'
import Marquee from '@/components/ui/marquee';

// interface TestimonialType {
//     name: string;
//     image: string;
//     text: string;
//     rating: number;
//     source: string;
// }

const Testimonial = () => {
    return (
        <section className="bg-[#0a121a] py-20">
            <div className="container mx-auto p-8 max-w-7xl rounded-xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="order-2 md:order-1">
                    <Marquee>
                            {testimonials.map((testimonial, idx) => (
                                    <TestimonialCard key={idx} testimonial={testimonial} />
                            ))}
                    </Marquee>
                </div>
                <div className="order-1 md:order-2 text-center md:text-left">
                    <Badge className="bg-[#21252a] rounded-full text-white border-gray-500">Testimonials from user 😋</Badge>
                    <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-6 leading-tight">
                        WHAT OUR USER SAY ABOUT US?
                    </h2>
                    <p className="text-xl text-gray-300 mb-8 max-w-lg mx-auto md:mx-0">
                        With PARK It Up&#39;s powerful features, you&#39;ll enjoy a seamless parking experience—making it quicker and easier than ever to find the perfect spot.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 items-center md:items-start justify-center md:justify-start">
                        <Button className="bg-gray-600 hover:bg-gray-500 text-white px-8 py-3 rounded-full border-2 border-gray-500 hover:border-gray-400 transition-all">
                            Learn More
                        </Button>
                        <div className="flex items-center space-x-4 text-gray-300">
                            <div className="flex items-center space-x-1">
                                <span className="text-2xl font-bold text-blue-400">{testimonials.length}+</span>
                                <span className="text-sm">Happy Users</span>
                            </div>
                            <div className="w-px h-6 bg-gray-600"></div>
                            <div className="flex items-center space-x-1">
                                <span className="text-2xl font-bold text-yellow-400">4.8</span>
                                <span className="text-sm">Avg Rating</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Testimonial

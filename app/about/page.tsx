import React from 'react'
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import '../globals.css';
import Aboutus from '@/components/assets/aboutus.png'
import Image from 'next/image';
import CountUp from '@/components/ui/count-up';

const About = () => {
  return (
    <>
      <Navbar />
      <div>
        <section className="relative bg-[#0a121a] flex min-h-screen items-center justify-center py-16 px-6 sm:px-8 lg:px-16">
        <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <div>
            <h2 className="text-lg md:text-xl text-white font-semibold mb-2 tracking-widest">PARK It Up</h2>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">About Us</h1>
            <p className="text-lg md:text-2xl text-white/80 mb-10 max-w-2xl">
              PARK It Up is a technology company dedicated to solving urban mobility challenges through digital solutions. PARK It Up aims to develop parking experience by developing innovative applications designed to provide efficient stress-free parking solutions for users.
            </p>
            <div className="flex flex-wrap gap-12 mb-10">
              <div>
                <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-1">
                  <CountUp from={0} to={2} direction='up' duration={1}/>+
                </div>
                <div className="text-white/80 text-md md:text-lg">Years of experience</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-1">
                  <CountUp from={0} to={100} direction='up' duration={1}/>+
                </div>
                <div className="text-white/80 text-md md:text-lg">Monthly active users</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-1">
                  <CountUp from={0} to={98} direction='up' duration={1}/>%
                </div>
                <div className="text-white/80 text-md md:text-lg">Customer satisfaction</div>
              </div>
            </div>            <button className="px-8 py-3 rounded-xl bg-[#232834] border border-gray-600 text-white text-lg hover:bg-white hover:text-[#141a24] transition-colors font-semibold">Learn More</button>
          </div>

          {/* Mobile Image */}
          <div className="block md:hidden mt-8">
            <Image
              src={Aboutus}
              alt="hero image"
              width={600}
              height={400}
              className="w-full h-auto object-contain rounded-lg"
            />
          </div>

          {/* Desktop Image */}
          <div className="hidden md:block absolute top-0 right-0 h-full w-1/2">
            <Image
              src={Aboutus}
              alt="hero image"
              width={800}
              height={600}
              className="w-full h-[90vh] object-contain"
            />
          </div>
        </div>
      </section>
    
    </div>
      <Footer />
    </>
  )
}

export default About;

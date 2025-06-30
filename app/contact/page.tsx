import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IoCall, IoLocation } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <div className="bg-[#0a121a] text-white px-6 py-8 sm:p-10 lg:px-20 xl:px-32 w-full">
        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
            CONTACT US
          </h1>
          <h3 className="text-gray-400 pt-3 max-w-xl mx-auto text-lg sm:text-xl md:text-2xl px-4">
            Have a question or need assistance? Let us know by filling out the
            form below.
          </h3>
        </div>
        <form>
          <div className="pt-6 sm:pt-10 flex flex-col lg:flex-row gap-6 lg:gap-10 max-w-6xl mx-auto">
            {/* Left: Form */}
            <div className="flex flex-col gap-4 w-full lg:w-1/2">
              <Input
                id="name"
                type="text"
                placeholder="Name"
                required
                className="bg-[#1e1e24] border-gray-600 text-white placeholder-gray-400 rounded-lg h-12 px-4 focus:border-[#4d84a4] focus:ring-[#4d84a4]"
              />
              <Input
                id="email"
                type="email"
                placeholder="Email"
                required
                className="bg-[#1e1e24] border-gray-600 text-white placeholder-gray-400 rounded-lg h-12 px-4 focus:border-[#4d84a4] focus:ring-[#4d84a4]"
              />
              <Input
                id="subject"
                type="text"
                placeholder="Subject"
                required
                className="bg-[#1e1e24] border-gray-600 text-white placeholder-gray-400 rounded-lg h-12 px-4 focus:border-[#4d84a4] focus:ring-[#4d84a4]"
              />
              <textarea
                id="message"
                placeholder="Message"
                required
                rows={4}
                className="bg-[#1e1e24] border border-gray-600 text-white placeholder-gray-400 rounded-lg p-4 resize-none focus:border-[#4d84a4] focus:ring-1 focus:ring-[#4d84a4] focus:outline-none"
              ></textarea>
              <Button
                type="submit"
                className="w-full bg-[#4d84a4] hover:bg-[#3a6b85] text-white rounded-lg h-12 font-medium transition-colors"
              >
                Send Message
              </Button>
            </div>
            {/* Right: Contact Info */}
            <div className="flex flex-col gap-8 text-white w-full lg:w-3/5">
              <div className="flex items-start gap-4">
                <IoCall className="text-[32px] sm:text-[36px] flex-shrink-0" />
                <div>
                  <h3 className="text-2xl sm:text-3xl font-semibold">Call us</h3>
                  <p className="text-gray-300 cursor-pointer text-lg sm:text-xl">
                    +91 9560967377
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MdOutlineEmail className="text-[32px] sm:text-[36px] flex-shrink-0" />
                <div>
                  <h3 className="text-2xl sm:text-3xl font-semibold">Email us</h3>
                  <p className="text-gray-300 cursor-pointer text-lg sm:text-xl">
                    officialparkitup@gmail.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <IoLocation className="text-[32px] sm:text-[36px] flex-shrink-0" />
                <div>
                  <h3 className="text-2xl sm:text-3xl font-semibold">Visit us</h3>
                  <p className="text-gray-300 cursor-pointer text-lg sm:text-xl">
                    811C, AB4, <br /> Delhi Technological University,
                    <br /> Rohini, Delhi, India
                  </p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}

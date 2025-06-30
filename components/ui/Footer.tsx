import React from "react";
import Link from "next/link";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa6";
// import Logo from "@/components/assets/Parkitup_logo.png";
// import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-[#0a121a] text-white py-10 px-4 flex flex-col justify-between h-full">
      <div className="bg-[#232834] rounded-3xl p-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-8 py-4 w-full">
            <div className="flex flex-col items-start w-full mx-auto">              <h1 className="text-3xl font-bold">PARK It Up</h1>
              <p className="text-gray-400 lg:text-lg text-md mb-4 mt-2">
                Curious about new developments and updates?
              </p>
            </div>

            <div className="flex flex-col items-start md:w-full">
              <div className="font-semibold mb-4 md:mb-6">ADDRESS</div>
              <p className="text-gray-400 text-md">
                811C, AB4,<br /> Delhi Technological University,<br /> Rohini, Delhi, India
              </p>
            </div>
            <div className="flex flex-row w-full ">
              <div className="flex flex-col items-start w-1/2 md:w-full">
                <div className="font-semibold mb-4 md:mb-6">OUR POLICIES</div>
                <ul className="text-gray-400 text-md space-y-1 flex flex-col gap-1">
                  <li>
                    <Link href="#">Privacy Policy</Link>
                  </li>
                  <li>
                    <Link href="#">Term of Use</Link>
                  </li>
                  <li>
                    <Link href="#">Term of order</Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col items-start w-full mx-auto">
              <div className="font-semibold mb-4 md:mb-6">CONTACT US</div>
              <ul className="text-gray-400 text-md space-y-1 flex flex-col gap-1">
                <li>
                  <Link href="tel:+919560967377">+91 9560967377</Link>
                </li>
                <li>
                  <Link href="mailto:officialparkitup@gmail.com">officialparkitup@gmail.com</Link>
                </li>
              </ul>
              {/* <form className="relative w-full mt-4">
                <input
                  type="email"
                  placeholder="Enter email..."
                  className="bg-[#2C3444] text-white rounded-full px-4 py-2 w-full pr-28 text-sm"
                />
                <button
                  type="submit"
                  className="absolute right-0 top-0 h-full bg-[#4d84a4] text-white font-semibold px-6 py-2 rounded-full hover:bg-[#2B63D9] transition text-sm"
                >
                  Submit
                </button>
              </form> */}
            </div>
          </div>
          <div className="w-full border-t border-gray-700 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 mt-4">            <span className="text-gray-400 text-xs text-center w-full md:w-auto">
              © 2025 PARK It Up. All rights reserved.
            </span>
            <div className="flex gap-4 mt-2 md:mt-0 justify-center w-full md:w-auto">
              <Link href="https://www.linkedin.com/company/park-it-up/" className="text-gray-400 hover:text-white">
                <FaLinkedinIn className="w-6 h-6" />
              </Link>
              <Link href="https://www.instagram.com/parkitup_in/" className="text-gray-400 hover:text-white">
                <FaInstagram className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};


export default Footer;

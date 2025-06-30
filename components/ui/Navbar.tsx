"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import ParkitUp from '@/components/assets/Parkitup_logo.png';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useAuthStore } from '@/lib/auth-store';

const Navbar = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const navLinks = [
    {
      name: 'How it works',
      href: '#how-it-works',
    },
    {
      name: 'Features',
      href: '#features',
    },
    {
      name: 'About Us',
      href: '/about',
    },
    {
      name: 'Contact',
      href: '/contact',
    },
    {
      name: 'Services',
      href: '#services',
    }
  ]
  return (
    <nav className="bg-[#0a121a] w-full top-0 backdrop-blur-md z-50">
      <div className="max-w-7xl container mx-auto px-4 py-4">
        <div className="flex items-center justify-between object-contain h-9">
          <Link href='/'>
            <div className="text-2xl font-bold text-blue-400 flex items-center space-x-3">
              <Image src={ParkitUp} alt='ParkitUp_Logo'
                height={300}
                width={300}
                className='h-18 w-auto' />
              <span className='hidden md:block text-white font-bold'>PARK It Up</span>
            </div>
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = (pathname ?? '') === link.href || ((pathname ?? '').startsWith(link.href) && link.href !== '/');
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`${isActive ? "text-[#4d84a4] transition-colors" : "text-gray-100 hover:text-[#4d84a4] transition-colors"}`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="hidden md:flex items-center space-x-3">
            {isAuthenticated ? (
              <Button
                className="bg-red-500 text-white rounded-full hover:bg-red-700 cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </Button>
            ) : (
              <>
                <Link href="/login">
                  <Button className="bg-white text-[#4d84a4] rounded-full hover:bg-[#4d84a4] hover:text-white cursor-pointer">
                    Sign In
                  </Button>
                </Link>
                <Link href='/signup'>
                  <Button className="bg-[#4d84a4] rounded-full hover:bg-white cursor-pointer hover:text-[#4d84a4]" >
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMobileMenu}
              className="text-white hover:text-[#4d84a4]"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#0a121a] border-t border-gray-800">
            <div className="px-4 py-4 space-y-4">
              {navLinks.map((link) => {
                const isActive = (pathname ?? '') === link.href || ((pathname ?? '').startsWith(link.href) && link.href !== '/');
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block py-2 px-3 rounded-md text-base font-medium ${isActive
                      ? "text-[#4d84a4] bg-gray-800"
                      : "text-gray-100 hover:text-[#4d84a4] hover:bg-gray-800"
                      } transition-colors`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <div className="pt-4 border-t border-gray-800 space-y-2">
                {isAuthenticated ? (
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      handleLogout();
                    }}
                    className="block w-full text-center py-2 px-4 bg-red-500 text-white rounded-full hover:bg-red-700 transition-colors"
                  >
                    Logout
                  </button>
                ) : (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block w-full text-center py-2 px-4 bg-white text-[#4d84a4] rounded-full hover:bg-[#4d84a4] hover:text-white transition-colors"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/signup"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block w-full text-center py-2 px-4 bg-[#4d84a4] text-white rounded-full hover:bg-white hover:text-[#4d84a4] transition-colors"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar

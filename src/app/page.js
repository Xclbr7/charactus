'use client'
import { useState, useEffect } from 'react';
import Image from "next/image";
import { Navbar } from "./components/Navbar";
import { Background } from "./components/Background";
import { HeroSection } from "./components/HeroSection";
import { Modal } from "./components/Modal";
import { DialogProvider } from "./contexts/DialogContext";
import { GridSection } from "./components/GridSection";
import { Footer } from "./components/Footer";

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1200); // Adjust this breakpoint as needed
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  if (isMobile) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white text-center p-4 gap-4">
        <div className='flex items-center'>
          <img src="./logo.png" className="w-[85px]" alt="logo" />
          {/* <h1 className='text-white font-bold text-2xl text-center tracking-widest pointer-events-none'>CHARACTUS</h1> */}
        </div>
        <p className="w-1/2 text-lg uppercase tracking-widest">
          Sorry, this website is only available on larger devices.
        </p>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col min-h-screen h-full w-[100%] overflow-x-hidden">
      <DialogProvider>
      <Modal />
      
        <Navbar />
        
        <HeroSection />
        <GridSection />
        <Footer />
      </DialogProvider>
    </div>
  );
}
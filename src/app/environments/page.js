'use client'

import { useState, useEffect } from 'react';
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { DialogProvider } from "@/app/contexts/DialogContext";

export default function Environments() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1200);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  if (isMobile) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white text-center p-4 gap-4">
        <div className='flex items-center'>
          <img src="/logo.png" className="w-[85px]" alt="logo" />
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
        <Navbar />
        <main className="flex-grow">
          <h1 className="text-4xl font-bold text-center my-8">Environments</h1>
          {/* Add your environments content here */}
        </main>
        <Footer />
      </DialogProvider>
    </div>
  );
}
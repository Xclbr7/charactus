'use client'

import { useState, useEffect } from 'react';
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { DialogProvider } from "@/app/contexts/DialogContext";
import { EnvironmentHeroSection } from "@/app/components/EnvironmentHeroSection";
import { EnvironmentGridSection } from "@/app/components/EnvironmentGridSection";
import { Modal } from '../components/Modal';
import { EnvModal } from '../components/EnvModal';
import { Background } from '../components/Background';
import CharacterForm from '../components/CharacterForm';

export default function CharacterCreator() {
  const [isMobile, setIsMobile] = useState(false);
  const [page, setPage] = useState('character_creator');

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
    <div className="w-full h-[100vh] pt-20 flex flex-col items-center text-white relative ">
      <DialogProvider>
        
      <Navbar page={page}/>
      {/* <h1 className="text-2xl font-medium text-white uppercase tracking-widest mb-10">Character Creator</h1> */}
       <CharacterForm/>
       
        <Footer />
        <Background />
      </DialogProvider>
    </div>
  );
}
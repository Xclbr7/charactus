// src/App.js
'use client'
import React from 'react';
import Chatbot from './Chatbot';
import Sidebar from './Sidebar';
// import PersonaContextProvider from './context/PersonaContextProvider';
import SidebarContextProvider from './context/SidebarContextProvider';
import './App.css';
import DetailsContextProvider from './context/DetailsContextProvider';
import Detailsbar from './Detailsbar';
import { useRef, useState, useEffect } from 'react';

function App() {

 const onImportRef = useRef(null);
 const onExportRef = useRef(null);
 const onDeleteRef = useRef(null);
 const authorNoteRef = useRef('No Author Note');
 const apiRef = useRef('No API');
 const userNameRef = useRef('user');

 const [isMobile, setIsMobile] = useState(false);
 
   useEffect(() => {
     const checkIfMobile = () => {
       setIsMobile(window.innerWidth < 1280); // Adjust this breakpoint as needed
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
           Sorry, this website is only available on larger devices for now.
         </p>
       </div>
     );
   }



  return (
    <div className=''>
      {/* <PersonaContextProvider> */}
      {/* <DetailsContextProvider> */}
      <SidebarContextProvider>
      <Sidebar authorNoteRef={authorNoteRef} apiRef={apiRef} userNameRef={userNameRef}/>
      <Detailsbar
      onImport={onImportRef}
      onExport={onExportRef}
      onDelete={onDeleteRef}

      />
      <Chatbot
      onImport={onImportRef}
      onExport={onExportRef}
      onDelete={onDeleteRef}
      authorNoteRef={authorNoteRef}
      apiRef={apiRef}
      userNameRef={userNameRef}
      />
      </SidebarContextProvider>
      {/* </DetailsContextProvider> */}
      {/* </PersonaContextProvider> */}
    </div>
  );
}

export default App;
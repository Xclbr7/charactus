
import React, { useState, useEffect } from 'react'
import Link from 'next/link';

export const Navbar = ({page}) => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
      setAtTop(currentScrollPos < 10);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  return (
    <nav className={`
      flex items-center fixed top-0 left-0 justify-between w-full px-20 text-center 
      ${atTop ? 'bg-transparent min-h-32 ' : 'bg-gradient-to-r from-[#060B1B]/90 to-[#04100B]/90 min-h-20 backdrop-blur-sm'} 
      gap-12 z-[50] transition-all duration-300
      ${visible ? 'translate-y-0' : '-translate-y-full'}
    `}>
      {/* Rest of your navbar content */}
      <div className='flex w-full items-center justify-between gap-12'>
        <div className='flex items-center'>
        <Link href="/">
          <img src="./logo_main.png" className="h-[50px]" alt="logo" />
        </Link>
          {/* <h1 className='text-white font-bold text-2xl text-center tracking-widest pointer-events-none'>CHARACTUS</h1> */}
        </div>
        <div className='flex items-center justify-between gap-4'>
          {/* <a
            className="text-white text-md font-medium hover:text-[#5EFFA9] transition-all duration-300"
            href="https://www.youtube.com/@xclbrxtra"
          >
            YOUTUBE
          </a>
          
          <div className='w-[1px] h-[10px] bg-[#6DCEFF] mx-2'></div> */}
          <Link href="/environments">
          <p
            className={`
              ${page === 'environments' ? 'bg-gradient-to-r from-[#b6f492] to-[#90B2D8] text-transparent bg-clip-text pointer-events-none' : 'text-white hover:text-[#5EFFA9]'}
              text-md font-medium transition-all duration-300
            `}
            
          >
            ENVIRONMENTS
          </p>
          </Link>
        </div>
      </div>
    </nav>
  )
}
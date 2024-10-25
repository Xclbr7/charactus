import React from 'react'

export const Footer = () => {
  return (
    <div className='flex items-center justify-between w-full  px-20 text-center bg-gradient-to-r from-[#060B1B] to-[#04100B] min-h-20'>
        {/* <span className='w-1/4 text-start text-white text-sm font-light uppercase tracking-widest '>Made with ❤️ by XLBR </span> */}
        <div><img src="./footer_logo.png" className="h-[40px]" alt="logo" /></div>
        <span className='w-1/3 text-end text-gray-400 text-[8px] font-light uppercase tracking-widest '>All characters and content are AI-generated fiction. We are not affiliated with or endorsed by any real persons, celebrities, or entities. AI-generated responses do not reflect real individuals' views or beliefs. Content is for entertainment purposes only.</span>
    </div>
  )
}

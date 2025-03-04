import React from 'react'

export const Banner = () => {
  return (
    <div className='flex flex-row justify-center items-center text-white bg-black w-full h-[200px] overflow-hidden relative'>
        <div className='flex flex-row justify-center items-center w-1/3 h-full bg-red-500'>
        <img src='https://ideogram.ai/assets/image/lossless/response/wg8nJtRoRU2_gXk9quoALQ' alt="logo" className='w-full h-auto object-cover' />
        </div>

        <div className='flex flex-row justify-center items-center w-1/3 h-full bg-red-500'>
        <img src='https://ideogram.ai/assets/image/lossless/response/Xui3rjzvQa-MWGGnSc6Pqw' alt="logo" className='w-full h-auto object-cover' />
        </div>

        <div className='flex flex-row justify-center items-center w-1/3 h-full bg-red-500'>
        <img src='https://ideogram.ai/assets/image/lossless/response/rrIVywHAST6wItP10J25oQ' alt="logo" className='w-full h-auto object-cover' />
        </div>
         {/* <h1 className="z-[10] absolute bottom-0 left-1/2 transform -translate-x-1/2  flex flex-row justify-center items-center text-md font-light text-white uppercase tracking-[16px] bg-black bg-opacity-[70%] px-4 py-2 w-full backdrop-blur-[8px]">Latest Character Packs</h1> */}
        
    </div>
  )
}



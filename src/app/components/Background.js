import React from 'react'

export const Background = () => {
  return (
    <div className="absolute inset-0 w-full h-full bg-black overflow-hidden z-[-1]">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-green-900 opacity-20"></div>

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

      
      {/* Glowing orbs */}
      {/* <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-green-500 rounded-full filter blur-3xl opacity-10 animate-pulse"></div>
      <div className="absolute top-1/3 right-1/4 w-[800px] h-[800px] bg-blue-500 rounded-full filter blur-3xl opacity-10 animate-pulse"></div> */}

      {/* Tech-inspired lines */}
      <div className="absolute inset-0 flex justify-around items-center">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-full w-px bg-gradient-to-b from-transparent via-blue-400 to-transparent opacity-20"></div>
        ))}
      </div>

      {/* Circuit-like patterns */}
      <div className="absolute bottom-0 left-0 w-1/2 h-1/3">
        <svg className="w-full h-full text-green-700 opacity-10" viewBox="0 0 100 100">
          <path d="M0 50 Q 25 25, 50 50 T 100 50 M25 0 L25 100 M75 0 L75 100" stroke="currentColor" strokeWidth="0.5" fill="none" />
        </svg>
      </div>
      <div className="absolute top-0 right-0 w-1/2 h-1/3 transform rotate-180">
        <svg className="w-full h-full text-blue-700 opacity-10" viewBox="0 0 100 100">
          <path d="M0 50 Q 25 25, 50 50 T 100 50 M25 0 L25 100 M75 0 L75 100" stroke="currentColor" strokeWidth="0.5" fill="none" />
        </svg>
      </div>
    </div>
  )
}
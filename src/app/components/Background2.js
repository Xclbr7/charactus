import React from 'react'

export const Background2 = () => {
  return (
    <div className="absolute inset-0 w-full h-full bg-black overflow-hidden z-[-1]">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-700 opacity-20"></div>

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

      {/* Tech-inspired lines */}
      <div className="absolute inset-0 flex justify-around items-center">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-full w-px bg-gradient-to-b from-transparent via-gray-400 to-transparent opacity-20 animate-pulse"></div>
        ))}
      </div>

      {/* Cooler circuit-like patterns */}
      <div className="absolute bottom-0 left-0 w-1/2 h-1/3">
        <svg className="w-full h-full text-gray-600 opacity-10" viewBox="0 0 100 100">
          <path d="M10 90 Q 30 70, 50 90 T 90 90 M30 10 C 40 30, 60 30, 70 10 M10 50 L 90 50" stroke="currentColor" strokeWidth="0.5" fill="none" />
          <circle cx="10" cy="90" r="2" fill="currentColor" />
          <circle cx="90" cy="90" r="2" fill="currentColor" />
          <circle cx="30" cy="10" r="2" fill="currentColor" />
          <circle cx="70" cy="10" r="2" fill="currentColor" />
        </svg>
      </div>
      <div className="absolute top-0 right-0 w-1/2 h-1/3 transform rotate-180">
        <svg className="w-full h-full text-gray-500 opacity-10" viewBox="0 0 100 100">
          <path d="M10 90 Q 30 70, 50 90 T 90 90 M30 10 C 40 30, 60 30, 70 10 M10 50 L 90 50" stroke="currentColor" strokeWidth="0.5" fill="none" />
          <circle cx="10" cy="90" r="2" fill="currentColor" />
          <circle cx="90" cy="90" r="2" fill="currentColor" />
          <circle cx="30" cy="10" r="2" fill="currentColor" />
          <circle cx="70" cy="10" r="2" fill="currentColor" />
        </svg>
      </div>
    </div>
  )
}
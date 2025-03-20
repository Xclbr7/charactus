'use client'
// In PersonaContextProvider.js
import React, { useState, useEffect } from 'react';
import PersonaContext from './PersonaContext';

const PersonaContextProvider = ({ children }) => {
  const [personality, setPersonality] = useState(null);
  
  // Load from localStorage on initial mount
  useEffect(() => {
    const storedPersonality = localStorage.getItem('personality');
    if (storedPersonality) {
      setPersonality(JSON.parse(storedPersonality));
    }
  }, []);
  
  // Update localStorage when personality changes
  const updatePersonality = (newPersonality) => {
    setPersonality(newPersonality);
    localStorage.setItem('personality', JSON.stringify(newPersonality));
  };
  
  return (
    <PersonaContext.Provider value={{ personality, setPersonality: updatePersonality }}>
      {children}
    </PersonaContext.Provider>
  );
};

export default PersonaContextProvider;

"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import characterData from "../characters/characters.json";
import { useDialog } from "../contexts/DialogContext";
import { Button } from "@/components/ui/button";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"
  

export const Grid = () => {
  const [jsonData, setJsonData] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { open, setOpen, setChar } = useDialog();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const charactersPerPage = 12;
  const totalPages = Math.ceil(characterData.length / charactersPerPage);

  const fetchJsonData = async (location) => {
    try {
      const response = await fetch(location);
      const data = await response.json();
      setJsonData(data);
    } catch (error) {
      console.error(`Error fetching JSON for character ${location}:`, error);
    }
  };

  useEffect(() => {
    if (hoveredCard) {
      fetchJsonData(`./characters/${characterData[hoveredCard - 1].code}.json`);
      console.log(`JSON data for character ${characterData[hoveredCard - 1].code}:`, jsonData);
    }
  }, [hoveredCard]);

  const handleCardHover = (card, bool) => {
    setHoveredCard(bool ? card.id : null);
    setIsHovered(bool);
  };

  const handlePageChange = (newPage) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage(newPage);
      setIsTransitioning(false);
    }, 300); // This should match the duration in the transition class
  };

  const indexOfLastCharacter = currentPage * charactersPerPage;
  const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;
  const currentCharacters = characterData.slice(indexOfFirstCharacter, indexOfLastCharacter);

  // Fill the remaining slots with placeholder cards
  const placeholdersNeeded = charactersPerPage - currentCharacters.length;
  const placeholders = Array(placeholdersNeeded).fill(null);

  return (
    <div className="w-full">
      <div className={`grid grid-cols-2 md:grid-cols-6 px-20 transition-opacity duration-300 ease-in-out ${
    isTransitioning ? 'opacity-0' : 'opacity-100'
  }`}>
        {currentCharacters.map((character) => (
          <Card
            key={character.id}
            className="rounded-[0px] border-none overflow-hidden relative"
            onMouseEnter={() => handleCardHover(character, true)}
            onMouseLeave={() => handleCardHover(character, false)}
            onClick={() => {
              setOpen(true);
              setChar(character);
            }}
          >
            <CardContent className="flex flex-col justify-end items-center p-4 aspect-[4/5] relative">
              <img
                src={`./characters/${character.code}.png`}
                alt={character.id}
                className="absolute inset-0 w-full h-full object-cover object-top hover:scale-110 transition-transform duration-500"
              />
              <div
                className={`
                  absolute bottom-0 w-full 
                  ${isHovered && character.id === hoveredCard ? "h-[200%]" : "h-[50%]"} 
                  pointer-events-none 
                  transition-[height] duration-500 ease-in-out
                `}
                style={{
                  backgroundImage: "linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent)",
                }}
              ></div>
              <span 
                className={`
                  absolute top-4 w-full h-full text-sm font-medium text-center 
                  tracking-widest pointer-events-none text-white z-10 p-4
                  transition-all duration-500 ease-in-out
                  ${isHovered && character.id === hoveredCard && jsonData?.name === character.name 
                    ? "opacity-100 visible" 
                    : "opacity-0 invisible"}
                `}
              >
                {isHovered && character.id === hoveredCard && jsonData?.name === character.name && jsonData?.creatorcomment}
              </span>
              <span className="text-md font-light text-center uppercase tracking-widest pointer-events-none text-gray-400 z-10">
                    {character?.existence}
                  </span>
              <span className="text-lg font-medium text-center uppercase tracking-widest pointer-events-none text-white z-10">
                {character.name}
              </span>
            </CardContent>
          </Card>
        ))}
        {placeholders.map((_, index) => (
          <div key={`placeholder-${index}`} className="aspect-[4/5]"></div>
        ))}
      </div>
      <Pagination className="mt-8 mb-8">
        <PaginationContent className="flex justify-center gap-2">
          <PaginationItem>
            <PaginationPrevious 
              onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
              disabled={currentPage === 1}
              className="text-gray-200 hover:bg-gray-800 hover:text-white"
            />
          </PaginationItem>
          {[...Array(totalPages)].map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                onClick={() => handlePageChange(index + 1)}
                isActive={currentPage === index + 1}
                className={`
                    text-gray-200 hover:bg-gray-800 hover:text-white
                    ${currentPage === index + 1 
                      ? 'bg-gray-900 text-white hover:bg-gray-800 border-gray-800' 
                      : 'hover:bg-gray-800'}
                  `}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext 
              onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="text-gray-200 hover:bg-gray-800 hover:text-white"
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
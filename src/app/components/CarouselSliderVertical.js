"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import characterData from "../characters/characters.json";
import { useState, useEffect } from "react";
import Autoplay from "embla-carousel-autoplay";
import { useDialog } from "../contexts/DialogContext";
import { PngParser } from './PngParser'

export const CarouselSliderVertical = () => {
    const [jsonData, setJsonData] = useState(null);
    const [isHovered, setIsHovered] = useState(false);
    const [hoveredCard, setHoveredCard] = useState(null);
  
    const { open,setOpen, char, setChar } = useDialog();
  
    const latestCharacters = characterData.slice(-6);

    // const fetchJsonData = async (location) => {
    //   try {
    //     const response = await fetch(location);
    //     const data = await response.json();
    //     setJsonData(data);
    //     console.log(`JSON data for character ${location}:`, data);
    //   } catch (error) {
    //     console.error(`Error fetching JSON for character ${location}:`, error);
    //   }
    // };

    const fetchJsonData = async (filePath) => {
           try {
             // Fetch the file first
             const response = await fetch(filePath);
             if (!response.ok) throw new Error('Failed to fetch PNG file');
             
             // Convert the response to ArrayBuffer
             const arrayBuffer = await response.arrayBuffer();
             const charaData = await PngParser.Parse(arrayBuffer);
             
             const characterInfo = JSON.parse(charaData);
             
             setJsonData(characterInfo);
             
           } catch (error) {
             console.error('Error reading PNG metadata:', error);
           }
         };

  
    useEffect(() => {
      if (hoveredCard) {
        fetchJsonData(`./characters/${latestCharacters[hoveredCard - 1]?.code}.png`);
      }
    }, [hoveredCard]);
  
    const handleCardHover = (card, bool) => {
      setHoveredCard(bool ? card.id : null);
      setIsHovered(bool);
    };

  return (
    <Carousel
        opts={{
          align: "start",
          loop: true, // Enable looping
        }}
        plugins={[
          Autoplay({
            delay: 2500,
            stopOnMouseEnter: true,
            stopOnInteraction: false,
          }),
        ]}
        //  orientation="vertical"
        className="w-full "
      >
        <CarouselContent>
          {latestCharacters.map((character) => (
            <CarouselItem
              key={character.id}
              className="md:basis-1 lg:basis-1/3"
            >
              <Card
                className="rounded-[0px] border-none overflow-hidden relative"
                onMouseEnter={() => handleCardHover(character, true)}
                onMouseLeave={() => handleCardHover(character, false)}
                onClick={() => {
                  setOpen(true);
                  setChar(character);
                }}
              >
                <CardContent className="flex flex-col justify-end items-center p-10 aspect-[4/5] relative">
                  <img
                    src={`./characters/${character.code}.png`}
                    alt={character.id}
                    className="absolute inset-0 w-full h-full object-cover object-top hover:scale-110 transition-transform duration-500"
                    // onClick={() => {
                    //   fetchJsonData(`./characters/${character.code}.json`);
                    // }}
                  />
                  <div
                    className={`
    absolute bottom-0 w-full 
    ${isHovered && character.id === hoveredCard ? "h-[200%]" : "h-[50%]"} 
    pointer-events-none 
    transition-[height] duration-500 ease-in-out
  `}
                    style={{
                      backgroundImage:
                        "linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent)",
                    }}
                  ></div>
              
              {/* <span 
  className={`
    absolute top-4 w-full h-full text-sm font-medium text-center 
    tracking-widest pointer-events-none text-white z-10 p-8
    transition-all duration-500 ease-in-out
    ${isHovered && character.id === hoveredCard && jsonData?.name === character.name 
      ? "opacity-100 visible" 
      : "opacity-0 invisible"}
  `}
>
  {isHovered && character.id === hoveredCard && jsonData?.name === character.name && jsonData?.creatorcomment}
</span> */}
  <span className="text-sm font-light text-center uppercase tracking-widest pointer-events-none text-gray-400 z-10">
                    {character?.existence}
                  </span>
                  <span className="text-sm font-medium text-center uppercase tracking-widest pointer-events-none text-white z-10">
                    {character.name}
                  </span>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* <CarouselPrevious />
      <CarouselNext /> */}
      </Carousel>
  )
}

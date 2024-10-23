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
import { CarouselSlider } from "./CarouselSlider";
import { CarouselSliderVertical } from "./CarouselSliderVertical";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Background } from "./Background";


// --------------------------------------------------------------

export const HeroSection = () => {

  
  // const [jsonData, setJsonData] = useState(null);
  // const [isHovered, setIsHovered] = useState(false);
  // const [hoveredCard, setHoveredCard] = useState(null);

  // const { open,setOpen, char, setChar } = useDialog();

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

  // useEffect(() => {
  //   if (hoveredCard) {
  //     fetchJsonData(`./characters/${characterData[hoveredCard - 1].code}.json`);
  //   }
  // }, [hoveredCard]);

  // const handleCardHover = (card, bool) => {
  //   setHoveredCard(bool ? card.id : null);
  //   setIsHovered(bool);
  // };

  // --------------------------------------------------------------

  return (
    <div className="w-full pt-36 flex flex-col justify-center items-center text-white relative ">
      <Background />
      <h1 className="text-2xl font-medium text-white uppercase tracking-widest mb-10">Our Recommendations 🔥</h1>
      <CarouselSlider />
      <div className="flex flex-row justify-between items-center w-full mt-20 mb-20 px-20 gap-20">
        <div className="w-1/2 flex flex-col justify-center"><h1 className="text-[30px] font-medium text-white uppercase tracking-widest mb-10 leading-[1.3]">Find the best characters for your AI</h1>
        <p className="text-gray-400 leading-7 tracking-widest text-lg">Discover a world of extraordinary AI companions at Charactus. Our curated collection features an array of meticulously crafted characters, each with unique traits, backstories, and conversational styles including celebrities, fictional characters,  historical figures, technical asssitans and more. You can download PNGs, JSONs or even copy paste data (for non Tavern Based Frontends).</p>
        <h1 className="text-xl font-medium text-white uppercase tracking-widest mt-6 flex flex-row items-center gap-4">Some of our latest characters <FaLongArrowAltRight /></h1>
        </div>
        <div className="w-1/2 flex flex-col justify-center h-full items-center">
       
        <CarouselSliderVertical />
  
        </div>
        
      </div>
    </div>
  );
};

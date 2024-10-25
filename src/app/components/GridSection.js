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
import { Background2 } from "./Background2";
import { Grid } from "./Grid";


// --------------------------------------------------------------

export const GridSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // --------------------------------------------------------------

  return (
    <div className="w-full pt-20 flex flex-col justify-center items-center text-white relative pb-16 ">
      <Background2 />
      <div className="w-full flex flex-row justify-between items-center text-white relative px-20 mb-16">
      <h1 className="text-2xl font-medium text-white uppercase tracking-widest">All Characters</h1>
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-1/4 h-12 rounded-full bg-[#00020f] border-[1px] border-white border-opacity-[30%] text-white px-4 active:outline-none focus:outline-none placeholder-opacity-30 placeholder-white"
      />
      </div>
    <Grid searchTerm={searchTerm}/>
    </div>
  );
};

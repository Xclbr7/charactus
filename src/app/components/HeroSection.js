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
import {Banner} from "./Banner"




// --------------------------------------------------------------

export const HeroSection = () => {

  

  return (
    <div className="w-full pt-32 flex flex-col justify-center items-center text-white relative ">
      <Background />
      
      <Banner />
      {/* <h1 className="flex flex-row justify-center items-center text-md font-light text-white uppercase tracking-[18px] bg-black bg-opacity-[20%] px-4 py-2 w-full">Latest Character Packs</h1> */}
      <h1 className="flex flex-row justify-center items-center text-sm font-light text-white uppercase tracking-[12px] bg-black bg-opacity-[40%] px-4 py-2 w-full backdrop-blur-[8px]">Latest Character Packs this month</h1>

      <h1 className="text-2xl font-medium text-white uppercase tracking-widest mb-10 pt-16">Our Recommendations 🔥</h1>
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

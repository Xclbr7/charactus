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
import { EnvCarouselSlider } from "./EnvCarouselSlider";


// --------------------------------------------------------------

export const EnvironmentHeroSection = () => {
 
  // --------------------------------------------------------------

  return (
    <div className="w-full pt-36 flex flex-col justify-center items-center text-white relative ">
      <Background />
      <h1 className="text-2xl font-medium text-white uppercase tracking-widest mb-10">Environments 🔥</h1>
      <p className="w-2/3 text-gray-400 leading-7 tracking-widest text-lg text-center mb-10">Discover a world of extraordinary AI companions at Charactus. Our curated collection features an array of meticulously crafted characters, each with unique traits, backstories, and conversational styles including celebrities, fictional characters,  historical figures, technical asssitans and more. You need to paste these in the Author's Note (for Tavern Based Frontends) and System Prompts or similar (for non Tavern Based Frontends).</p>
      <EnvCarouselSlider />
      
    </div>
  );
};

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
    <div className="w-full pt-20 flex flex-col justify-center items-center text-white relative pb-20 ">
      <Background2 />
      <h1 className="text-2xl font-medium text-white uppercase tracking-widest mb-10">All Characters</h1>
    <Grid />
    </div>
  );
};

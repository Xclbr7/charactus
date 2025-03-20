'use client'
import React from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState, useEffect } from 'react'
import { useDialog } from '../contexts/DialogContext'
import { LuFileJson } from 'react-icons/lu'
import { TbFileTypePng } from 'react-icons/tb'
import CodeBox from './CodeBox'
import { PngParser } from './PngParser'
import PersonaContext from '../chatroom/context/PersonaContext'
// import personalities from '../personalities'
import { useRouter } from 'next/navigation'
import { useContext } from 'react'

export const Modal = () => {
  const { open, setOpen, char, setChar } = useDialog();
  const [jsonData, setJsonData] = useState(null);
  const router = useRouter();
  const { setPersonality } = useContext(PersonaContext);


  
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
    if (char) {
      fetchJsonData(`./characters/${char?.code}.png`);  // Note the leading forward slash
    }
  }, [char]);



  // Function to handle chat with the character
  // const handleChatWithChar = () => {
  //   // Create a personality object based on the character data
  //   const newPersonality = {
  //     id: char?.code || 'default',
  //     name: char?.name || 'Character',
  //     avatar: `./characters/${char?.code}.png`,
  //     description: jsonData?.description || '',
  //     creatorcomment: jsonData?.creatorcomment || '',
  //     // Add any other required properties for your personality object
  //   };
    
  //   // Set the personality in the context
  //   setPersonality(newPersonality);
    
  //   // Navigate to the chatroom page
  //   router.push('/chatroom');
    
  //   // Close the modal
  //   setOpen(false);
  // };
    
  const newPersonality = {
    id: char?.code || 'default',
    name: char?.name || 'Character',
    imageUrl: `./characters/${char?.code}.png`,
    description: jsonData?.description || '',
    creatorcomment: jsonData?.creatorcomment || '',
    // Add any other required properties for your personality object
  };
  
    
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* <DialogTrigger asChild>
        <Button className="w-16" variant="outline">Edit Profile</Button>
      </DialogTrigger> */}
      <DialogContent className=" bg-black bg-opacity-[50%] backdrop-blur-[10px] text-white border-[1px] border-white border-opacity-[10%] sm:max-w-[80%] w-[80%] h-[80%] p-12 flex flex-row gap-4 items-start justify-between">
        <div className="goli flex flex-col gap-4 w-1/4 h-full items-start justify-between">
        <div className='aspect-[4/5] max-w-full'>
            <img src={`./characters/${char?.code}.png`} className="w-full h-full object-cover object-top" alt="logo" />
        </div>
        <DialogHeader className="mt-2 flex flex-col gap-1 justify-start flex-grow ">
          <h1 className="text-start text-2xl tracking-widest uppercase">{char?.name}</h1>
          <p className="text-start text-gray-400">{jsonData?.creatorcomment}</p>
        </DialogHeader>
        <div className='flex flex-row gap-2 w-full'>
        <a 
      href={`data:application/json;charset=utf-8,${encodeURIComponent(JSON.stringify(jsonData, null, 2))}`}
      download={char?.code + ".json"}
    >
        <Button className="w-full bg-[#145231] hover:bg-gray-900 text-[#7ED4FF] rounded-[3px] transition-all duration-300 text-md flex flex-row gap-1 px-2"><LuFileJson />Download JSON</Button>

    </a>
    <a 
      href={`./characters/${char?.code}.png`}
      download={char?.name + ".png"}
    >
        <Button className="w-full bg-[#1E3A87] hover:bg-gray-900 text-[#5EFFA9] rounded-[3px] transition-all duration-300 text-md flex flex-row gap-1 px-2"><TbFileTypePng />Download PNG</Button>

        </a>
        
        </div>
        </div>
         {/* New Chat button */}
         {/* <Button 
          onClick={handleChatWithChar} 
          className="w-full bg-[#871E3A] hover:bg-gray-900 text-white rounded-[3px] transition-all duration-300 text-md flex flex-row gap-1 px-2"
        >
          Chat with {char?.name}
        </Button> */}
        <CodeBox code={jsonData?.description} newPersonality={newPersonality}></CodeBox>
       
      </DialogContent>
    </Dialog>
  )
}

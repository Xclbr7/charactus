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

export const EnvModal = () => {
  const { open, setOpen, char, setChar } = useDialog();
  const [jsonData, setJsonData] = useState(null);


  const fetchJsonData = async (location) => {
    try {
      const response = await fetch(location);
      const data = await response.json();
      setJsonData(data);
      console.log(`JSON data for character ${location}:`, data);
    } catch (error) {
      console.error(`Error fetching JSON for character ${location}:`, error);
    }
  };

  useEffect(() => {
    if (char) {
      fetchJsonData(`./allEnvironments/${char?.code}.json`);
    }
  }, [char]);
    
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* <DialogTrigger asChild>
        <Button className="w-16" variant="outline">Edit Profile</Button>
      </DialogTrigger> */}
      <DialogContent className=" bg-black bg-opacity-[50%] backdrop-blur-[10px] text-white border-[1px] border-white border-opacity-[10%] sm:max-w-[80%] w-[80%] h-[80%] p-12 flex flex-row gap-4 items-start justify-between">
        <div className="goli flex flex-col gap-4 w-1/4 h-full items-start justify-between">
        <div className='aspect-[4/5] max-w-full'>
            <img src={`${char?.img_link}`} className="w-full h-full object-cover object-top" alt="logo" />
        </div>
        <DialogHeader className="mt-2 flex flex-col gap-1 justify-start flex-grow ">
          <h1 className="text-start text-2xl tracking-widest uppercase">{char?.name}</h1>
          <p className="text-start text-gray-400">{jsonData?.summary}</p>
        </DialogHeader>
        <div className='flex flex-row gap-2 w-full'>
        {/* <a 
      href={`./allEnvironments/${char?.code}.json`}
      download={char?.name + ".json"}
    >
        <Button className="w-full bg-[#145231] hover:bg-gray-900 text-[#7ED4FF] rounded-[3px] transition-all duration-300 text-md flex flex-row gap-1 px-2"><LuFileJson />Download JSON</Button>

    </a> */}

    <p className='text-white bg-[#145231] bg-opacity-[50%] text-center uppercase tracking-widest rounded-[5px] text-[12px] flex flex-row gap-1 p-2 pointer-events-none'>Paste the Environment in Author's Note</p>
          
        </div>
        </div>
        <CodeBox code={JSON.stringify(jsonData, null, 2)}></CodeBox>
       
      </DialogContent>
    </Dialog>
  )
}

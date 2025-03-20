// src/Sidebar.js
import React from 'react';
import personalities from './personalities';
import { useState, useContext } from 'react';
import PersonaContext from './context/PersonaContext';
import { RiDeleteBin6Fill } from "react-icons/ri";
import SidebarContext from './context/SidebarContext';
import { FaPeopleGroup } from "react-icons/fa6";

function Sidebar({authorNoteRef, apiRef, userNameRef}) {

    const { personality, setPersonality } = useContext(PersonaContext);
    const { setSidebar, sidebar } = useContext(SidebarContext);
    const [hover, setHover] = useState({ state: false, i: null });

    const handleTextChange = (e) => {

        if (e.target.value) {
            
        authorNoteRef.current = e.target.value;
        }
    };

    const handleAPIChange = (e) => {
        apiRef.current = e.target.value;
    };

    const handleUserNameChange = (e) => {
        userNameRef.current = e.target.value;
    };
    

    


    return (


        <div className={`w-[90%] xl:w-[22%] z-50 xl:h-screen h-[100svh] fixed top-0 left-0 bg-[#00020f] bg-white bg-opacity-[1%] backdrop-blur-[40px] border-r-[1px] border-white border-opacity-[10%] flex flex-col items-center p-4 gap-6 justify-start xl:translate-x-0 transition-transform duration-300
    ${sidebar ? 'translate-x-0' : 'translate-x-[-100%]'}
    
 `}>

<img src="./chatbot_logo.png" className="h-auto w-[65%] mr-8" alt="logo" />


<div className='w-full gap-1 flex flex-col mt-2'>



    <h2 className="text-white text-lg font-semibold pl-2">Your Name</h2>

    <div className="relative bg-[#111111] rounded-[8px] w-full h-[40px] p-0">
    <form id="apiKeyForm" autoComplete="on">
        <input 
            type="text"
            name="user-name"
            id="current-user"
            className="bg-transparent w-full h-[40px] resize-none outline-none px-6 text-gray-400 font-mono text-md"
            placeholder="Enter Your Name..."
            onChange={handleUserNameChange}
            
            style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}
        />
       
    </form>
</div>


</div>
            
           {/* Input Text Box */}
    
    <div className='w-full gap-1 flex flex-col h-2/3 mt-1'>
    <h2 className="text-white text-lg font-semibold pl-2">Author's Note</h2>

    <div className="relative bg-[#111111] rounded-[8px] w-full h-full  p-1">
        <textarea 
            className="bg-transparent w-full h-full resize-none outline-none px-6 pt-2 text-gray-400 overflow-y-auto font-mono text-md"
            placeholder="Enter your storyline..."
            onChange={handleTextChange}
        />
        <style jsx>{`
            /* WebKit and Chromium-based browsers */
            textarea::-webkit-scrollbar {
                width: 10px;
            }
            textarea::-webkit-scrollbar-track {
                background: #333333;
                border-radius: 10px;
            }
            textarea::-webkit-scrollbar-thumb {
                background-color: #5EFFA9;
                border-radius: 20px;
                border: 3px solid #1e3a8a;
            }
        `}</style>
    </div>
    </div>

    <div className='w-full gap-1 flex flex-col mt-1'>

    <h2 className="text-white text-lg font-semibold pl-2">Gemini API</h2>

    <div className="relative bg-[#111111] rounded-[8px] w-full h-[40px] p-0">
    <form id="apiKeyForm" autoComplete="on">
        <input 
            type="password"
            name="password"
            id="current-password"
            autoComplete="current-password"
            className="bg-transparent w-full h-[40px] resize-none outline-none px-6 text-gray-400 font-mono text-md"
            placeholder="Enter API Key..."
            onChange={handleAPIChange}
            style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}
        />
        <button type="submit" style={{display: 'none'}} />
    </form>
</div>


</div>


        </div>
    )
}
export default Sidebar;
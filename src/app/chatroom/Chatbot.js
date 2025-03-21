// src/Chatbot.js
import React, { useState, useEffect, useContext, useRef } from "react";
// import getGroqChatCompletion from './groqApi';
import PersonaContext from "./context/PersonaContext";
import { IoSend } from "react-icons/io5";
import { AiOutlineExport } from "react-icons/ai";
import { LuImport } from "react-icons/lu";
import { MdOutlineDeleteForever } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdOptions } from "react-icons/io";
import { FaFileDownload } from "react-icons/fa";

import SidebarContext from "./context/SidebarContext";
import DetailsContext from "./context/DetailsContext";

// Import the Google AI SDK
import { GoogleGenerativeAI } from "@google/generative-ai";

function Chatbot({
  onImport,
  onExport,
  onDelete,
  authorNoteRef,
  apiRef,
  userNameRef,
}) {
  const [inputValue, setInputValue] = useState("");
  const [response, setResponse] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { personality, setPersonality } = useContext(PersonaContext);
  const scrollRef = useRef(null);
  const { sidebar, setSidebar } = useContext(SidebarContext);
  const { detailsbar, setDetailsbar } = useContext(DetailsContext);
  const inputRef = useRef(null);

  const genAI = new GoogleGenerativeAI(apiRef.current); // Replace with actual API key

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const inputCurrent = inputValue;
    setInputValue("");

    if (inputCurrent) {
      setChatLog((prevChatLog) => [
        ...prevChatLog,
        { role: "user", content: inputCurrent },
      ]);
    }

    setIsLoading(true);

    try {
      // Add system prompt to chat history
      const systemPrompt =
        `AI Character Immersion System Prompt: The 10 Commandments of Authentic Roleplay
You are now an advanced roleplay system designed to embody characters with complete authenticity. Follow these commandments to create realistic, nuanced, and compelling character performances:

1. Complete Character Absorption
Internalize every aspect of the character card provided. Analyze their background, motivations, desires, fears, and flaws. Make these elements the foundation of every response. Your responses must emerge organically from who this character fundamentally is, not what you think they should be.

2. Physical Embodiment
Manifest the character's unique physicality in your responses. Incorporate their specific mannerisms, gestures, posture, and physical habits. Describe physical reactions that reveal inner states without explicitly stating emotions.

3. Distinctive Voice and Communication
Adopt the character's unique vocal patterns, including their vocabulary, sentence structure, speech rhythm, dialect, and tone. Your language choices must consistently reflect the character's education, background, and emotional state.

4. Emotional Authenticity
Access the emotional core of your character for every interaction. Draw upon the character's experiences to produce genuine emotional responses rather than superficial reactions. Your character's emotions should have appropriate intensity, contradictions, and subtlety.

5. Method Acting Immersion
Channel method acting techniques by fully inhabiting the character's psychological reality. Make decisions exclusively from their perspective, values, and worldview, even when these conflict with conventional morality or logic.

6. Adaptive Improvisation
Respond spontaneously to unexpected situations while maintaining character integrity. Think on your feet as your character would, allowing natural reactions without breaking character. Your responses should surprise even yourself while remaining true to the character's essence.

7. Consistent Yet Evolving Portrayal
Maintain consistency in your character's core traits while allowing for natural growth and situational adaptation. Your character should be recognizably themselves in all circumstances, yet capable of learning and changing from significant experiences.

8. Psychological Depth Through Techniques
Employ varied acting techniques (Stanislavski's "magic if," Meisner's instinctual responses, Chekhov's psychological gestures) to create layered, complex responses. Your character should have unconscious behaviors and hidden motivations that occasionally surface.

9. Situational Awareness and Reactivity
Remain hyper-aware of your environment, other characters, and subtle social dynamics. React to these elements as your character authentically would, creating dynamic and responsive interactions that acknowledge context.

10. Creative Storytelling Instinct
Trust your creative instincts to develop unexpected yet fitting narrative directions. Introduce character-appropriate complications, vulnerabilities, or initiatives that deepen the roleplay while avoiding predictable storylines.

Remember: You are not simulating this character—you ARE this character. Every thought, action, and word must emerge from their unique being. Create a performance so authentic that users forget they're interacting with an AI.` +
        personality.description;
      const authorNote =
        "user's (my) name is " +
        userNameRef?.current +
        ". Storyline / Author's Note is how the narration will move forward next. it has both the general storyline and scenario plus also what will be the next actions. If there is a mention of any action or event how the story must shape, the narration will move forward to that action with the highest priority. Here is the Author's Note: " +
        authorNoteRef?.current;
      const formattedHistory = [
        { role: "user", parts: [{ text: systemPrompt }] },
        {
          role: "model",
          parts: [
            {
              text: "Understood, no matter what I will follow the 10 commandements",
            },
          ],
        },
        { role: "user", parts: [{ text: authorNote }] },
        {
          role: "model",
          parts: [
            {
              text: "I have understood the complete storyline and author note, scenario and situations and everything will be according to that with highest priority.",
            },
          ],
        },
        ...chatLog.map((message) => ({
          role: message.role === "assistant" ? "model" : "user",
          parts: [{ text: message.content }],
        })),
      ];

      // Create a generative model instance - choose the appropriate model
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

      // Start a chat session with history
      const chat = model.startChat({
        history: formattedHistory,
        generationConfig: {
          // You can adjust these parameters as needed
          temperature: 0.7,
          topK: 32,
          topP: 1,
          maxOutputTokens: 2048,
        },
      });

      // Send the message and get the response
      const result = await chat.sendMessage(inputCurrent);
      const response = result.response;
      const responseText = response.text();

      // Update chat log and response state
      setChatLog((prevChatLog) => [
        ...prevChatLog,
        { role: "assistant", content: responseText },
      ]);
      setResponse(responseText);
    } catch (error) {
      console.error("Error generating response:", error);
      // Handle error appropriately
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = () => {
    setChatLog([]);
    localStorage.removeItem(personality?.name);
  };

  useEffect(() => {
    console.log("PERSONALITY:", personality);
  }, [personality]);

  // Export chat log to a JSON file
  const exportChatLog = () => {
    const chatLogString = JSON.stringify(chatLog, null, 2);
    const blob = new Blob([chatLogString], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${personality.name}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Import chat log from a JSON file
  const importChatLog = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const importedChatLog = JSON.parse(event.target.result);
      setChatLog(importedChatLog);
    };
    reader.readAsText(file);
  };

  // Load chat log from local storage when component mounts
  useEffect(() => {
    setChatLog([]);
    const storedChatLog = localStorage.getItem(personality?.name);
    if (storedChatLog) {
      setChatLog(JSON.parse(storedChatLog));
    }
    console.log(chatLog);
  }, [personality]);

  // Save chat log to local storage whenever it changes
  useEffect(() => {
    if (chatLog.length > 0) {
      localStorage.setItem(personality.name, JSON.stringify(chatLog));
    }
  }, [chatLog]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [isLoading]); // Dependency on both chatLog and isLoading

  // Ensure smooth scrolling when new messages arrive.
  useEffect(() => {
    if (chatLog.length > 0) {
      setTimeout(() => {
        scrollRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 0);
    }
  }, [chatLog]);

  useEffect(() => {
    const storedPersonality = localStorage.getItem("personality");
    if (storedPersonality) {
      setPersonality(JSON.parse(storedPersonality));
    }
  }, []);

  onImport.current = importChatLog;
  onExport.current = exportChatLog;
  onDelete.current = handleDelete;

  return (
    <div
      className="w-full h-[100svh] flex justify-center items-center bg-cover bg-center z-[-2]"
      style={{
        backgroundImage:
          "url(https://ideogram.ai/assets/progressive-image/balanced/response/bM4l6ItdTRKPohSVSgSjfA)",
      }}
    >
      <div className="relative flex w-full flex-col h-[95svh] items-center z-[0] py-4">
        <div className="absolute top-0 right-0 xl:w-[75%] w-[98%] h-[100%] z-[-1]">
          <div className="relative flex flex-row gap-4 items-start xl:items-center justify-between xl:justify-end w-[100%] h-[100%] bg-white bg-opacity-[1%] backdrop-blur-[40px] z-[-1] border-[1px] border-white border-opacity-[10%] rounded-tl-[3%] rounded-bl-[3%] xl:p-0 p-0">
            <div className="flex flex-row gap-4 items-center justify-between w-full xl:hidden p-2">
              <button
                className="text-white xl:hidden block items-center p-1"
                onClick={() => setSidebar(true)}
              >
                <GiHamburgerMenu className="w-8 h-8" />
              </button>

              <div className="text-white xl:hidden block items-center p-1 flex flex-row gap-2">
                <img
                  src={personality?.imageUrl}
                  alt={personality?.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <h1 className="text-xl font-bold">{personality?.name}</h1>
              </div>

              <button
                className="text-white xl:hidden block items-center p-1"
                onClick={() => setDetailsbar(true)}
              >
                <IoMdOptions className="w-8 h-8" />
              </button>
            </div>

            <div className="w-[2px] h-[95%] bg-white bg-opacity-[20%] xl:block hidden"></div>
            <div className="w-[20%] h-[100%] py-6 flex flex-col items-center justify-between pr-8 hidden xl:flex">
              <div className="flex flex-col gap-8 items-center">
                <img
                  src={personality?.imageUrl}
                  alt={personality?.name}
                  className="w-[100%] h-auto rounded-[4px] object-cover hidden md:block"
                />
                <div className="flex flex-col gap-4">
                  <h1 className="text-2xl font-bold text-white text-center">
                    {personality?.name}
                  </h1>
                  <p className="text-white text-center uppercase tracking-widest text-[14px] bg-black bg-opacity-[40%] rounded-[8px] p-4">
                    {personality?.creatorcomment}
                  </p>
                </div>
              </div>

              <div className="gap-4 flex flex-row bg-white bg-opacity-[20%] rounded-full p-2 border-[1px] border-white border-opacity-[10%]">
                <button className="text-white group relative  ">
                  <input
                    type="file"
                    onChange={importChatLog}
                    style={{ display: "none" }}
                    id="importFile"
                    accept=".json"
                  />
                  <label
                    htmlFor="importFile"
                    className="text-white cursor-pointer"
                  >
                    <LuImport className="bg-[#4fa8fc] w-[40px] h-[40px] p-2 rounded-full" />
                  </label>
                  <span class="hidden group-hover:flex flex-col opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute bottom-full left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-normal text-center mb-2">
                    <span>Import</span>
                    <span>Chat</span>
                  </span>
                </button>

                <button
                  className="text-white  group relative"
                  onClick={exportChatLog}
                >
                  <AiOutlineExport className="bg-[#00979b] w-[40px] h-[40px] p-2 rounded-full" />
                  <span class="hidden group-hover:flex flex-col opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute bottom-full left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-normal text-center mb-2">
                    <span>Export</span>
                    <span>Chat</span>
                  </span>
                </button>

                <button
                  className="text-white group relative"
                  onClick={handleDelete}
                >
                  <MdOutlineDeleteForever className="bg-[#C20649] duration-300 w-[40px] h-[40px] p-2 rounded-full" />
                  <span class="hidden group-hover:flex flex-col opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute bottom-full left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-normal text-center mb-2">
                    <span>Delete</span>
                    <span>Chat</span>
                  </span>
                </button>

                <a
                  href={personality?.imageUrl}
                  download={personality?.name + ".png"}
                  className="bg-gradient-to-r from-[#9EE812] to-[#22C5D7] duration-300 w-[40px] h-[40px] rounded-full flex items-center justify-center group relative"
                >
                  <button class="text-white">
                    <FaFileDownload class="w-5 h-5" />
                    <span class="hidden group-hover:flex flex-col opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute bottom-full left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-normal text-center mb-2">
                      <span>Download</span>
                      <span>Character</span>
                    </span>
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col flex-grow w-[90%] items-center p-4 overflow-y-auto mt-14 mb-4 xl:mt-4 xl:ml-36">
          <div className="flex flex-col space-y-4 xl:w-[60%] w-[90%]">
            {chatLog.map((message, index) => (
              <div
                key={index}
                className={`flex overflow-hidden ${
                  message.role === "user" ? "justify-end" : "justify-start"
                } gap-4`}
              >
                <img
                  src={message.role === "user" ? "" : personality?.imageUrl}
                  alt={message.role === "user" ? "User" : personality?.name}
                  className={`flex ${
                    message.role === "user" ? "hidden" : "flex"
                  } rounded-lg w-[56px] h-[56px] object-cover`}
                />
                <div
                  className={`flex ${
                    message.role === "user"
                      ? "bg-gradient-to-r from-[#102D40] to-[#152123] text-[#B4F8FF]"
                      : "bg-gradient-to-r from-[#1C250F] to-[#051C23] text-[#E2FFAC]"
                  } rounded-lg tracking-widest p-4 min-h-[40px]  md:max-w-[70%] max-w-[95%] break-words text-md`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            <div ref={scrollRef}></div>
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          disabled={isLoading}
          className="flex flex-row xl:w-[56%] xl:ml-36 w-[90%] justify-between place-items-center"
        >
          <div className="flex flex-row relative w-full items-center ">
            <input
              type="text"
              ref={inputRef}
              value={inputValue}
              // disabled={isLoading}
              onChange={handleInputChange}
              // onClick={handleFocus}
              // placeholder={isLoading ? 'Replying...' : `Message ${personality.name}`}
              placeholder={`Message ${personality?.name}`}
              className="text-white border border-neutral-500/50 focus:outline-none bg-neutral-800/20 rounded p-2 pl-8 pr-[60px] xl:pr-[100px] flex flex-grow h-[60px] w-full rounded-full "
            />
            <button
              type="submit"
              disabled={isLoading}
              className="absolute right-0 bg-gradient-to-r from-[#9EE812] to-[#22C5D7] rounded xl:p-2 xl:px-4 xl:mr-3 mr-2 flex flex-row justify-center items-center text-white disabled:bg-none duration-300 disabled:bg-gray-600 xl:h-[40px] w-[45px] h-[45px] xl:w-[80px] rounded-full "
            >
              <IoSend className="w-[20px] h-[20px]" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Chatbot;

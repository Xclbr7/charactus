'use client'
import { useState } from 'react';
import ImageUpload from './ImageUpload';
import { PngWriter } from '../utils/PngWriter';
// import text from 'png-chunk-text';

// Utility class for PNG parsing
class Png {
    static #readChunks(bytes) {
      const chunks = [];
      let offset = 8; // Skip PNG signature
  
      while (offset < bytes.length) {
        const length = new DataView(bytes.buffer).getUint32(offset);
        const type = new TextDecoder().decode(bytes.slice(offset + 4, offset + 8));
        const data = bytes.slice(offset + 8, offset + 8 + length);
        chunks.push({ type, data });
        offset += 12 + length; // Length + Type + Data + CRC
      }
      return chunks;
    }
  
    static #decodeText(data) {
      const nullIndex = data.findIndex(byte => byte === 0);
      const keyword = new TextDecoder().decode(data.slice(0, nullIndex));
      const text = new TextDecoder().decode(data.slice(nullIndex + 1));
      return { keyword, text };
    }
  
    static async Parse(arrayBuffer) {
      const chunks = this.#readChunks(new Uint8Array(arrayBuffer));
      const text = chunks.filter(c => c.type === 'tEXt').map(c => this.#decodeText(c.data));
      
      if (text.length < 1) {
        throw new Error('No PNG text fields found in file');
      }
      
      const chara = text.find(t => t.keyword === 'chara');
      if (chara === undefined) {
        throw new Error('No PNG text field named "chara" found in file');
      }
      
      return new TextDecoder().decode(
        Uint8Array.from(atob(chara.text), c => c.charCodeAt(0))
      );
    }
  }
  

export default function CharacterForm() {
  const [formData, setFormData] = useState({
    name: '',
    summary: '',
    description: '',
    scenario: '',
    first_mes: '',
    examples: '',
    image: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = async (file) => {
    setFormData(prev => ({
      ...prev,
      image: file
    }));

    // Read metadata if it's a PNG file
    if (file.type === 'image/png') {
      try {
        const arrayBuffer = await file.arrayBuffer();
        const charaData = await Png.Parse(arrayBuffer);
        
        // Parse the character data (assuming it's JSON)
        const characterInfo = JSON.parse(charaData);
        
        // Update form with the parsed data
        setFormData(prev => ({
          ...prev,
          image: file,
          name: characterInfo.name || '',
          summary: characterInfo.creatorcomment || '',
          description: characterInfo.description || '',
          scenario: characterInfo.scenario || '',
          first_mes: characterInfo.first_mes || '',
          examples: characterInfo.mes_example || ''
        }));
      } catch (error) {
        console.error('Error reading PNG metadata:', error);
        // Optionally show an alert or handle the error as needed
      }
    }
  };


  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (formData.image) {
        // Create new PNG with metadata using PngWriter
        const newImageFile = await PngWriter.createCharacterPng(formData.image, formData);
        
        // Create downloadable PNG
        const blob = new Blob([await newImageFile.arrayBuffer()], { type: 'image/png' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${formData.name}_with_metadata.png`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error creating PNG with metadata');
    }
  };



  

  return (
    <form onSubmit={handleSubmit} className="flex-1 w-full flex flex-col min-h-[70%] items-center gap-8" 
    >
      <div className='flex flex-row w-[70%] gap-16 mt-16 w-3/4 h-[80%]'>
    <div className="flex flex-col items-center w-1/4 h-full gap-4">
      <ImageUpload onImageUpload={handleImageUpload} />

      
        <div className='w-full'>
          <label className="block text-md font-medium text-gray-400">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className=" w-full h-10 mt-1 block w-full text-gray-400 rounded-md shadow-sm bg-gray-800 focus:outline-none focus:ring-0 resize-none p-4 font-mono text-md whitespace-pre-wrap break-words"
            required
          />
        </div>

        

        <div className="w-full h-full flex flex-col"> 
  <label className="block text-md text-gray-400 font-medium">First Message</label>
  <textarea
    name="first_mes"
    value={formData.first_mes}
    onChange={handleChange}
    rows="2"
    className="mt-1 flex-1 w-full text-gray-400 rounded-md shadow-sm bg-gray-800 focus:outline-none focus:ring-0 resize-none p-4 font-mono text-md whitespace-pre-wrap break-words"
  />
</div>


        </div>

        <div className="flex flex-col items-center w-3/4 gap-4 h-full">

        <div className='w-full h-1/6 py-4 pt-0'>
          <label className="block text-md text-gray-400 font-medium">Summary</label>
          <textarea
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            rows="2"
            className="mt-1 min-h-24 block w-full text-gray-400 rounded-md shadow-sm bg-gray-800 focus:outline-none focus:ring-0 resize-none p-4 font-mono text-md whitespace-pre-wrap break-words"
          />
        </div>


        <div className='w-full h-5/6 pt-4 flex flex-col'>
          <label className="block text-md font-medium text-gray-400">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="mt-1 flex-1 block w-full text-gray-400 rounded-md shadow-sm bg-gray-800 focus:outline-none focus:ring-0 resize-none p-4 font-mono text-md whitespace-pre-wrap break-words"
          />
        </div>

      </div>

      </div>


      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 w-[300px] h-12 py-2 bg-gradient-to-r from-[#5CF7A9] to-[#53BAEA] text-gray-700 font-bold uppercase rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 tracking-wide"
        >
          Create Character
        </button>
      </div>

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

    </form>
  );
}

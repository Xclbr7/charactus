import { useState } from 'react';

export default function ImageUpload({ onImageUpload }) {
  const [preview, setPreview] = useState(null);
  const [dragActive, setDragActive] = useState(false);


  const cropImage = (imageFile) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {

         // Check if the image is already 512x768
      if (img.width === 512 && img.height === 768) {
        resolve(imageFile); // No cropping needed, return the original file
        return;
      }

        // Create canvas
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 768;
        const ctx = canvas.getContext('2d');

        // Calculate crop dimensions
        let sourceX = 0;
        let sourceY = 0;
        let sourceWidth = img.width;
        let sourceHeight = img.height;

        // Calculate aspect ratio
        const targetAspectRatio = 512 / 768;
        const imageAspectRatio = img.width / img.height;

        if (imageAspectRatio > targetAspectRatio) {
          // Image is wider than needed
          sourceWidth = img.height * targetAspectRatio;
          sourceX = (img.width - sourceWidth) / 2;
        } else {
          // Image is taller than needed
          sourceHeight = img.width / targetAspectRatio;
          sourceY = (img.height - sourceHeight) / 2;
        }

        // Draw cropped image
        ctx.drawImage(
          img,
          sourceX,
          sourceY,
          sourceWidth,
          sourceHeight,
          0,
          0,
          512,
          768
        );

        // Convert canvas to blob
        canvas.toBlob((blob) => {
          const croppedFile = new File([blob], imageFile.name, {
            type: 'image/png',
            lastModified: Date.now(),
          });
          resolve(croppedFile);
        }, 'image/png');
      };

      img.src = URL.createObjectURL(imageFile);
    });
  };


  

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };


  
  const handleFile = async (file) => {
    if (file && file.type.startsWith('image/')) {
      try {
        // Crop the image
        const croppedFile = await cropImage(file);
        
        // Set preview
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(croppedFile);
        
        // Pass the cropped file to parent component
        await onImageUpload(croppedFile);
      } catch (error) {
        console.error('Error processing image:', error);
      }
    }
  };


  return (
    <div className="w-full max-w-md mx-auto">
      <div 
        className={`border-2 border-opacity-50 border-dashed rounded-lg p-8 text-center aspect-[2/3] flex flex-col items-center justify-center ${
          dragActive ? 'border-green-500 bg-green-800 bg-opacity-20' : 'border-gray-300'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {preview ? (
          <img 
            src={preview} 
            alt="Preview" 
            className="rounded-lg"
          />
        ) : (
          <div>
            <p className="text-gray-500">Drag and drop image here or</p>
            <input
              type="file"
              className="hidden"
              id="image-upload"
              accept="image/*"
              onChange={(e) => handleFile(e.target.files[0])}
            />
            <label
              htmlFor="image-upload"
              className="mt-2 inline-block px-4 py-2 bg-white text-gray-800 rounded-lg cursor-pointer hover:bg-opacity-80 transition-colors duration-300"
            >
              Choose File
            </label>
          </div>
        )}
      </div>
    </div>
  );
}

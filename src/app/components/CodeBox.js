import React, { useState } from 'react';

const CodeBox = ({ code }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  return (
    <div className="relative bg-[#111111] rounded-[2px] w-full h-full p-2">
  <div className="absolute top-4 right-8 z-10">
    <button
      className={`px-3 py-1 text-sm font-medium text-white rounded-md transition-colors ${
        isCopied ? 'bg-green-500' : 'bg-blue-500 hover:bg-blue-600'
      }`}
      onClick={copyToClipboard}
    >
      {isCopied ? 'Copied!' : 'Copy'}
    </button>
  </div>
  <div className="overflow-y-auto h-full p-6 pt-4 text-gray-400">
    <pre className="font-mono text-md whitespace-pre-wrap break-words">
      <code>{code}</code>
    </pre>
  </div>
  <style jsx>{`
        /* WebKit and Chromium-based browsers */
        .overflow-y-auto::-webkit-scrollbar {
          width: 10px;
          
        }
        .overflow-y-auto::-webkit-scrollbar-track {
          background: #333333;
          border-radius: 10px;

        }
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background-color: #5EFFA9;
          border-radius: 20px;
          border: 3px solid #1e3a8a;
        }
      `}</style>
</div>
  );
};

export default CodeBox;
export class PngWriter {
    static async createCharacterPng(imageFile, characterData) {
      const metadata = {
        name: characterData.name,
        creatorcomment: characterData.summary,
        description: characterData.description,
        scenario: characterData.scenario,
        first_mes: characterData.first_mes,
        mes_example: characterData.examples
      };
  
      const metadataString = JSON.stringify(metadata);
      const base64Data = btoa(metadataString);
      const arrayBuffer = await imageFile.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      const textChunk = this.#createTextChunk('chara', base64Data);
      const newPngData = this.#insertChunkAfterIHDR(uint8Array, textChunk);
  
      return new File([newPngData], imageFile.name, { type: 'image/png' });
    }
  
    static #createTextChunk(keyword, text) {
      const keywordBytes = new TextEncoder().encode(keyword);
      const nullSeparator = new Uint8Array([0]);
      const textBytes = new TextEncoder().encode(text);
      const length = keywordBytes.length + 1 + textBytes.length;
      const chunk = new Uint8Array(12 + length);
      const dv = new DataView(chunk.buffer);
      
      dv.setUint32(0, length);
      chunk[4] = 116; // t
      chunk[5] = 69;  // E
      chunk[6] = 88;  // X
      chunk[7] = 116; // t
      
      let offset = 8;
      chunk.set(keywordBytes, offset);
      offset += keywordBytes.length;
      chunk.set(nullSeparator, offset);
      offset += 1;
      chunk.set(textBytes, offset);
      
      const crc = this.#calculateCRC(chunk.subarray(4, 8 + length));
      dv.setUint32(8 + length, crc);
      
      return chunk;
    }
  
    static #insertChunkAfterIHDR(pngData, newChunk) {
      const ihdrLength = new DataView(pngData.buffer).getUint32(8);
      const insertPosition = 8 + 12 + ihdrLength;
      const newPngData = new Uint8Array(pngData.length + newChunk.length);
      newPngData.set(pngData.subarray(0, insertPosition));
      newPngData.set(newChunk, insertPosition);
      newPngData.set(pngData.subarray(insertPosition), insertPosition + newChunk.length);
      return newPngData;
    }
  
    static #calculateCRC(data) {
      let crc = -1;
      for (let i = 0; i < data.length; i++) {
        crc = (crc >>> 8) ^ this.#crcTable[(crc ^ data[i]) & 0xFF];
      }
      return ~crc;
    }
  
    static #crcTable = (() => {
      const table = new Uint32Array(256);
      for (let i = 0; i < 256; i++) {
        let c = i;
        for (let j = 0; j < 8; j++) {
          c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
        }
        table[i] = c;
      }
      return table;
    })();
  };
  
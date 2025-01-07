// utils/PngParser.js
export class PngParser {
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

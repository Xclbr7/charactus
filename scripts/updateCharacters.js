const fs = require("fs");
const path = require("path");

// Paths to directories and files
const charactersFolder = path.join(__dirname, "../public/characters");
const charactersJsonPath = path.join(__dirname, "../src/app/characters/characters.json");

// Read all PNG files from the public/characters folder
const pngFiles = fs.readdirSync(charactersFolder).filter(file => file.endsWith(".png"));

// Read the existing characters.json file
let charactersData = JSON.parse(fs.readFileSync(charactersJsonPath, "utf-8"));

// Create a map of existing character codes for quick lookup
const existingCodes = new Set(charactersData.map(character => character.code));

// Add new PNGs that are not in characters.json
pngFiles.forEach((file) => {
  const code = file.replace(".png", "");
  if (!existingCodes.has(code)) {
    charactersData.push({
      id: (charactersData.length + 1).toString(),
      name: code.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase()),
      code,
    });
  }
});

// Remove entries from characters.json if the corresponding PNG is missing
charactersData = charactersData.filter(character => {
  if (!pngFiles.includes(`${character.code}.png`)) {
    return false; // Remove character if PNG is missing
  }
  return true;
});

// Reassign IDs to ensure they are sequential and start from 1
charactersData.forEach((character, index) => {
  character.id = (index + 1).toString();
});

// Write the updated data back to characters.json
fs.writeFileSync(charactersJsonPath, JSON.stringify(charactersData, null, 2), "utf-8");

console.log("Updated characters.json successfully!");

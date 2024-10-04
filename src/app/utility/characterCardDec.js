import EXIF from 'exif-js';

export function getImageMetadata(imageUrl) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = function() {
      EXIF.getData(img, function() {
        const allMetaData = EXIF.getAllTags(this);
        const formattedMetadata = formatMetadata(allMetaData);
        resolve(formattedMetadata);
      });
    };
    img.onerror = function() {
      reject("Failed to load image");
    };
    img.src = imageUrl;
  });
}

function formatMetadata(metadata) {
  let formattedMetadata = '';
  for (let key in metadata) {
    if (metadata.hasOwnProperty(key)) {
      formattedMetadata += `## ${key}\n${metadata[key]}\n\n`;
    }
  }
  return formattedMetadata;
}
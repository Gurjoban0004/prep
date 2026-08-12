
const path = require('path');
const fs = require('fs');

function rot13(str) {
  if (!str || typeof str !== 'string') return str;
  return str.replace(/[a-zA-Z]/g, c => {
    return String.fromCharCode((c <= 'Z' ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26);
  });
}

const dataFiles = [
  path.join(__dirname, '../../IOT/data.js'),
  path.join(__dirname, '../../IOT/linux-data.js')
];

dataFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // 1. Decode simple key-value pairs like "html": "...", "question": "...", etc.
  const keysToDecode = ['html', 'question', 'prompt', 'starterCode', 'solutionCode', 'explanation'];
  keysToDecode.forEach(key => {
    const regex = new RegExp(`(["']?${key}["']?\\s*:\\s*")((?:\\\\.|[^"\\\\])*)(")`, 'g');
    content = content.replace(regex, (match, p1, p2, p3) => {
      return p1 + rot13(p2) + p3;
    });
  });

  // 2. Decode options values in MCQ objects
  const optionsRegex = /(["']?options["']?\\s*:\\s*\{)([\s\S]*?)(\})/g;
  content = content.replace(optionsRegex, (match, p1, p2, p3) => {
    const decodedOptions = p2.replace(/(["']?([a-z])["']?\\s*:\\s*")((?:\\.|[^"\\])*)(")/g, (m, o1, o2, o3, o4) => {
      return o1 + rot13(o3) + o4;
    });
    return p1 + decodedOptions + p3;
  });

  fs.writeFileSync(file, content);
  console.log(`Decoded ${file}`);
});

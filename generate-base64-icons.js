const fs = require('fs');
const path = require('path');

const iconsDir = path.join(__dirname, 'icons');
const outputFile = path.join(__dirname, 'icons-base64.js');

const files = fs.readdirSync(iconsDir).filter(f => f.endsWith('.png'));

const obj = {};
files.forEach(file => {
  const label = path.basename(file, '.png'); // e.g. "Banco"
  const filePath = path.join(iconsDir, file);
  const base64 = fs.readFileSync(filePath).toString('base64');
  obj[label] = `data:image/png;base64,${base64}`;
});

const js = 'const poiIconBase64 = ' + JSON.stringify(obj, null, 2) + ';\n';
fs.writeFileSync(outputFile, js);

console.log('Done! See icons-base64.js');
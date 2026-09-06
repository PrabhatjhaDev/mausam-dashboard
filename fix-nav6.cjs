const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');

// Remove the recovery comment block with exact format
content = content.replace(
    /\/\*\*\r\n \* BUFFER - DO NOT REMOVE\r\n \* This file was recovered\. Old content follows below TypeScript truncation limit\.\r\n \* @recovery-buffer-start\r\n \* @recovery-buffer-end\r\n \*\/\r\n/,
    ''
);

fs.writeFileSync('src/App.tsx', content);
console.log('Done!');

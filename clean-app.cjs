const fs = require('fs');

// Remove buffer garbage lines from App.tsx
let content = fs.readFileSync('src/App.tsx', 'utf8');
let lines = content.split('\n');
let realLines = lines.filter(l => !l.match(/^\x2f\x2f\s*@(buf|buffer)-\d+/));
fs.writeFileSync('src/App.tsx', realLines.join('\n'));
console.log('App.tsx: ' + lines.length + ' -> ' + realLines.length + ' lines (removed ' + (lines.length - realLines.length) + ')');
console.log('Done!');

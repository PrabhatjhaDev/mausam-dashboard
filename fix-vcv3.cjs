const fs = require('fs');
const path = 'c:\\Users\\prabh\\OneDrive\\Desktop\\SIH PS76\\mausam-dashboard\\src\\index.css';
let css = fs.readFileSync(path, 'utf8');
const norm = (s) => s.replace(/\r\n/g, '\n');

// Remove the appended .vcv-stage { min-height: 100% } rule.
// This rule forced .vcv-stage to fill the full viewport height (~800px),
// making the entire VCV section appear as a large black region.
const APPENDED_VCV = norm(`/* Make .vcv-stage fill its parent .vcv-root, so the VAYRON command
   visual occupies the full available height rather than just its
   content height. Appended rule (cascade) - does not redefine the
   original .vcv-stage block. */
.vcv-stage { min-height: 100%; box-sizing: border-box; }

`);

if (css.includes(APPENDED_VCV)) {
  css = css.replace(APPENDED_VCV, '');
  console.log('Removed appended .vcv-stage { min-height: 100% } rule');
} else {
  console.log('WARNING: appended .vcv-stage rule not found (trying raw)');
  const raw = '/* Make .vcv-stage fill its parent .vcv-root';
  if (css.includes(raw)) {
    const start = css.indexOf(raw);
    const end = css.indexOf('.wav-root {', start);
    if (end > start) {
      css = css.substring(0, start) + css.substring(end);
      console.log('Removed via raw search');
    }
  }
}

fs.writeFileSync(path, css, 'utf8');
console.log('Done');
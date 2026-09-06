const fs = require('fs');
const path = 'c:\\Users\\prabh\\OneDrive\\Desktop\\SIH PS76\\mausam-dashboard\\src\\index.css';
let css = fs.readFileSync(path, 'utf8');

// 1. Remove appended .vcv-stage { min-height: 100% } rule and its comment
const APPENDED_VCV = `/* Make .vcv-stage fill its parent .vcv-root, so the VAYRON command
   visual occupies the full available height rather than just its
   content height. Appended rule (cascade) - does not redefine the
   original .vcv-stage block. */
.vcv-stage { min-height: 100%; box-sizing: border-box; }`;

const WAV_INTRO = `/* ============================================================
   Weather Atmosphere Visual`;

if (css.includes(APPENDED_VCV)) {
  css = css.replace(APPENDED_VCV, WAV_INTRO.trimStart());
  console.log('Removed appended .vcv-stage { min-height: 100% } rule');
} else {
  console.log('WARNING: appended .vcv-stage rule not found');
}

fs.writeFileSync(path, css, 'utf8');
console.log('Done');
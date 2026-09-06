const fs = require('fs');
const path = 'c:\\Users\\prabh\\OneDrive\\Desktop\\SIH PS76\\mausam-dashboard\\src\\index.css';
let css = fs.readFileSync(path, 'utf8');
const norm = (s) => s.replace(/\r\n/g, '\n');

// Fix .vcv-stage: remove min-height: 100% which was forcing the
// VCV section to fill the entire parent, making it ~800px tall and
// creating the large black region perceived above the atmospheric content.
const OLD = norm(`.vcv-stage {
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-height: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 1.5rem 2rem;
  gap: 1rem;
}`);

const NEW = norm(`.vcv-stage {
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 1.5rem 2rem;
  gap: 1rem;
}`);

if (css.includes(OLD)) {
  css = css.replace(OLD, NEW);
  fs.writeFileSync(path, css, 'utf8');
  console.log('SUCCESS: removed min-height: 100% from .vcv-stage');
} else {
  console.log('WARNING: .vcv-stage block not found');
  const idx = css.indexOf('.vcv-stage {');
  if (idx >= 0) {
    const end = css.indexOf('}', idx);
    console.log('Actual:', css.substring(idx, end + 1));
  }
}
const fs = require('fs');
const path = 'c:\\Users\\prabh\\OneDrive\\Desktop\\SIH PS76\\mausam-dashboard\\src\\index.css';
let css = fs.readFileSync(path, 'utf8');

// === FIX 1: html, body, #root { height: 100% } ===
// Root cause: height:100% constrains #root to exactly viewport height,
// clipping any content that overflows (which is most of the app: atmosphere
// + VCV + header + dashboard). This makes the layout LOOK like it has empty
// black space at the top because the page is actually being clipped.
// min-height: 100vh lets #root grow naturally while still covering viewport.
const OLD1 = 'html, body, #root { height: 100%; margin: 0; padding: 0; }';
const NEW1 = 'html, body, #root { min-height: 100vh; margin: 0; padding: 0; }';
if (css.includes(OLD1)) {
  css = css.replace(OLD1, NEW1);
  console.log('FIX 1: html,body,#root height:100% -> min-height:100vh');
} else {
  console.log('WARNING: rule 1 not found');
}

// === FIX 2: body, #root { height: 100% } (appended duplicate) ===
// Same fix applied to the appended duplicate.
const OLD2 = 'body, #root { height: 100%; margin: 0; padding: 0; }';
const NEW2 = 'body, #root { min-height: 100%; margin: 0; padding: 0; }';
if (css.includes(OLD2)) {
  css = css.replace(OLD2, NEW2);
  console.log('FIX 2: body,#root height:100% -> min-height:100%');
} else {
  console.log('WARNING: rule 2 not found');
}

fs.writeFileSync(path, css, 'utf8');
console.log('Saved.');

// Verify
const v = fs.readFileSync(path, 'utf8');
const check1 = v.includes('html, body, #root { min-height: 100vh');
const check2 = v.includes('body, #root { min-height: 100%');
const noHeight1 = !/html, body, #root\s*\{\s*height:\s*100%/.test(v);
const noHeight2 = !/body, #root\s*\{\s*height:\s*100%/.test(v);
console.log('Rule 1 uses min-height:', check1, '| no height:100%:', noHeight1);
console.log('Rule 2 uses min-height:', check2, '| no height:100%:', noHeight2);
// Fix App.tsx - remove onVayronOpen from WeatherMapView and AIInsightsView
let app = fs.readFileSync('src/App.tsx', 'utf8');
app = app.replace(
  '<WeatherMapView onVayronOpen={() => document.dispatchEvent(new CustomEvent("vayron:open"))} />',
  '<WeatherMapView />'
);
app = app.replace(
  '<AIInsightsView onVayronOpen={() => document.dispatchEvent(new CustomEvent("vayron:open"))} />',
  '<AIInsightsView />'
);
fs.writeFileSync('src/App.tsx', app);

// Fix AIInsightsView.tsx - remove unused Props interface
let ai = fs.readFileSync('src/views/AIInsightsView.tsx', 'utf8');
ai = ai.replace(/\n\ninterface AIInsightsViewProps \{\n  onVayronOpen: \(\) => void;\n\}\n/, '\n');
fs.writeFileSync('src/views/AIInsightsView.tsx', ai);

// Fix WeatherMapView.tsx - remove unused Props interface
let wm = fs.readFileSync('src/views/WeatherMapView.tsx', 'utf8');
wm = wm.replace(/\n\ninterface WeatherMapViewProps \{\n  onVayronOpen: \(\) => void;\n\}\n/, '\n');
fs.writeFileSync('src/views/WeatherMapView.tsx', wm);

console.log('All props fixes applied!');

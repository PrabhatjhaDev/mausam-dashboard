const fs = require('fs');

// 1. Fix App.tsx - remove trailing garbage
let app = fs.readFileSync('src/App.tsx', 'utf8');
let appEnd = '\r\n\r\n// @ts-ignore\r\n-NoNewline\r\n';
if (app.endsWith(appEnd)) {
    app = app.slice(0, app.length - appEnd.length);
    fs.writeFileSync('src/App.tsx', app);
    console.log('App.tsx: removed trailing garbage');
} else {
    // Try alternate ending
    let altEnd = '\r\n// @ts-ignore\r\n-NoNewline\r\n';
    if (app.endsWith(altEnd)) {
        app = app.slice(0, app.length - altEnd.length);
        fs.writeFileSync('src/App.tsx', app);
        console.log('App.tsx: removed trailing garbage (alt)');
    } else {
        console.log('App.tsx: could not find expected trailing garbage');
    }
}

// 2. Fix AIInsightsView.tsx - remove unused interface and ts-ignore
let aiv = fs.readFileSync('src/views/AIInsightsView.tsx', 'utf8');
let aivOld = '\r\n// (unused Props interface removed)\r\n// @ts-ignore\r\ninterface AIInsightsViewProps {\r\n  onVayronOpen: () => void;\r\n}\r\n';
if (aiv.includes(aivOld)) {
    aiv = aiv.replace(aivOld, '\r\n');
    fs.writeFileSync('src/views/AIInsightsView.tsx', aiv);
    console.log('AIInsightsView.tsx: removed unused interface and @ts-ignore');
} else {
    console.log('AIInsightsView.tsx: could not find expected pattern');
}

// 3. Fix WeatherMapView.tsx - remove unused interface and ts-ignore
let wmv = fs.readFileSync('src/views/WeatherMapView.tsx', 'utf8');
let wmvOld = '\r\n// @ts-ignore\r\ninterface WeatherMapViewProps {\r\n  onVayronOpen: () => void;\r\n}\r\n';
if (wmv.includes(wmvOld)) {
    wmv = wmv.replace(wmvOld, '\r\n');
    fs.writeFileSync('src/views/WeatherMapView.tsx', wmv);
    console.log('WeatherMapView.tsx: removed unused interface and @ts-ignore');
} else {
    console.log('WeatherMapView.tsx: could not find expected pattern');
}

// 4. Search all src files for any remaining @ts-ignore from recovery
console.log('\nSearching for @ts-ignore directives:');
const srcDir = 'src';
const files = [];
function walk(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const e of entries) {
        if (e.name === 'node_modules') continue;
        const p = dir + '/' + e.name;
        if (e.isDirectory()) walk(p);
        else if (e.name.endsWith('.ts') || e.name.endsWith('.tsx')) files.push(p);
    }
}
walk(srcDir);
for (const f of files) {
    const c = fs.readFileSync(f, 'utf8');
    const lines = c.split('\n');
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('@ts-ignore')) {
            console.log('  ' + f + ':' + (i + 1) + ': ' + lines[i].trim());
        }
    }
}

console.log('\nDone!');

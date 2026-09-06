const fs = require('fs');

function cleanFile(path, pattern) {
    let content = fs.readFileSync(path, 'utf8');
    let lines = content.split('\n');
    let kept = lines.filter(l => !l.match(pattern));
    fs.writeFileSync(path, kept.join('\n'));
    console.log('Cleaned ' + path + ': ' + lines.length + ' -> ' + kept.length + ' lines');
}

cleanFile('src/App.tsx', /\x2f\x2f\s*@xbuf-/);
cleanFile('src/views/AIInsightsView.tsx', /\x2f\x2f\s*@aibuf2-/);

console.log('Done!');
const fs = require('fs');
const css = fs.readFileSync('dist/assets/index-DQ2gWpIM.css', 'utf8');

// Find the rule for lg:ml-64
const re = /\.lg\\:ml-64\s*\{[^}]*\}/g;
let m;
const results = [];
while ((m = re.exec(css)) !== null) {
  results.push(m[0]);
}
console.log('lg:ml-64 rules:', results.length);
results.forEach(r => console.log(' ', r));

// Find min-h-screen
const re2 = /\.min-h-screen\s*\{[^}]*\}/g;
const r2 = [];
while ((m = re2.exec(css)) !== null) r2.push(m[0]);
console.log('\nmin-h-screen rules:', r2.length);
r2.forEach(r => console.log(' ', r));

// Find flex-col
const re3 = /\.flex-col\s*\{[^}]*\}/g;
const r3 = [];
while ((m = re3.exec(css)) !== null) r3.push(m[0]);
console.log('\nflex-col rules:', r3.length);
r3.forEach(r => console.log(' ', r));

// Find flex
const re4 = /\.flex(?![-a-z])\s*\{[^}]*\}/g;
const r4 = [];
while ((m = re4.exec(css)) !== null) r4.push(m[0]);
console.log('\nflex rules:', r4.length);
r4.forEach(r => console.log(' ', r));

// Find pb-20 and lg:pb-0
const re5 = /\.pb-20\s*\{[^}]*\}/g;
const r5 = [];
while ((m = re5.exec(css)) !== null) r5.push(m[0]);
console.log('\npb-20 rules:', r5.length);
r5.forEach(r => console.log(' ', r));

const re6 = /\.lg\\:pb-0\s*\{[^}]*\}/g;
const r6 = [];
while ((m = re6.exec(css)) !== null) r6.push(m[0]);
console.log('\nlg:pb-0 rules:', r6.length);
r6.forEach(r => console.log(' ', r));

// Find h-screen
const re7 = /\.h-screen\s*\{[^}]*\}/g;
const r7 = [];
while ((m = re7.exec(css)) !== null) r7.push(m[0]);
console.log('\nh-screen rules:', r7.length);
r7.forEach(r => console.log(' ', r));

// Find sticky
const re8 = /\.sticky\s*\{[^}]*\}/g;
const r8 = [];
while ((m = re8.exec(css)) !== null) r8.push(m[0]);
console.log('\nsticky rules:', r8.length);
r8.forEach(r => console.log(' ', r));

// Find top-0
const re9 = /\.top-0\s*\{[^}]*\}/g;
const r9 = [];
while ((m = re9.exec(css)) !== null) r9.push(m[0]);
console.log('\ntop-0 rules:', r9.length);
r9.forEach(r => console.log(' ', r));

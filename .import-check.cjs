const fs = require('fs');
const path = require('path');

const root = path.resolve('src');
const files = [];
(function walk(dir){
  for (const entry of fs.readdirSync(dir, {withFileTypes:true})) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p);
    else if (entry.isFile() && p.endsWith('.js')) files.push(p);
  }
})(root);

const unresolved = [];
const importRegex = /(?:import\s+(?:[^'";]+?\s+from\s+)?|export\s+[^'";]*?from\s*)["']([^"']+)["']/g;
for (const file of files) {
  const text = fs.readFileSync(file, 'utf8');
  let m;
  while ((m = importRegex.exec(text)) !== null) {
    const spec = m[1];
    if (!spec.startsWith('.')) continue;
    const base = path.resolve(path.dirname(file), spec);
    const candidates = [base, base + '.js', path.join(base, 'index.js')];
    const ok = candidates.some(c => fs.existsSync(c) && fs.statSync(c).isFile());
    if (!ok) unresolved.push({file: path.relative(process.cwd(), file), spec});
  }
}

if (!unresolved.length) {
  console.log('ALL_RESOLVED');
} else {
  for (const u of unresolved) console.log(`${u.file} :: ${u.spec}`);
  process.exitCode = 2;
}

const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) {
      walkDir(p, callback);
    } else if (f.endsWith('.astro') || f.endsWith('.tsx') || f.endsWith('.ts')) {
      callback(p);
    }
  });
}

walkDir('d:\\lop12\\src', filePath => {
  let content = fs.readFileSync(filePath, 'utf-8');
  let original = content;

  // Replace window.location.href = '/...'
  content = content.replace(/window\.location\.href\s*=\s*'\/([^l'][^m'][^s']|[^']*)'/g, (match, p1) => {
    if (p1.startsWith('lms/') || p1 === 'lms') return match;
    return `window.location.href = '/lms/${p1}'`;
  });

  // Replace window.location.href = `/...`
  content = content.replace(/window\.location\.href\s*=\s*`\/([^`]*)`/g, (match, p1) => {
    if (p1.startsWith('lms/') || p1 === 'lms') return match;
    return `window.location.href = \`/lms/${p1}\``;
  });

  // Specific fix for login.astro redirect variable
  content = content.replace(/params\.get\('redirect'\) \|\| '\/dashboard'/g, "params.get('redirect') || '/lms/dashboard'");

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log('Fixed:', filePath);
  }
});

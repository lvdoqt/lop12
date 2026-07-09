import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.join(__dirname, '..', 'src');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      walkDir(dirPath, callback);
    } else if (f.endsWith('.astro') || f.endsWith('.ts') || f.endsWith('.tsx')) {
      callback(dirPath);
    }
  });
}

let modifiedFiles = 0;

walkDir(srcDir, (filePath) => {
  let content = fs.readFileSync(filePath, 'utf-8');
  let original = content;

  // Replace href="/..." but not href="/lms..."
  content = content.replace(/href="\/([^l"]*[^m"]*[^s"]*|[^"]*)"/g, (match, p1) => {
    if (p1.startsWith('lms/') || p1 === 'lms') return match;
    return `href="/lms/${p1}"`.replace(/\/+/g, '/');
  });

  // Replace href={'/...'}
  content = content.replace(/href=\{'\/([^l'][^m'][^s']|[^']*)'\}/g, (match, p1) => {
    if (p1.startsWith('lms/') || p1 === 'lms') return match;
    return `href={'/lms/${p1}'}`.replace(/\/+/g, '/');
  });

  // Replace href={`/...`}
  content = content.replace(/href=\{`\/([^`]*?)`\}/g, (match, p1) => {
    if (p1.startsWith('lms/') || p1 === 'lms') return match;
    return `href={\`/lms/${p1}\`}`.replace(/\/\//g, '/'); // wait, replace /lms// -> /lms/
  });

  // Replace src="/..."
  content = content.replace(/src="\/([^l"]*[^m"]*[^s"]*|[^"]*)"/g, (match, p1) => {
    if (p1.startsWith('lms/') || p1 === 'lms') return match;
    return `src="/lms/${p1}"`.replace(/\/+/g, '/');
  });

  // Replace Astro.redirect('/...')
  content = content.replace(/Astro\.redirect\('\/([^l'][^m'][^s']|[^']*)'\)/g, (match, p1) => {
    if (p1.startsWith('lms/') || p1 === 'lms') return match;
    return `Astro.redirect('/lms/${p1}')`.replace(/\/+/g, '/');
  });
  
  // Astro.redirect(`/...`)
  content = content.replace(/Astro\.redirect\(`\/([^`]*)`\)/g, (match, p1) => {
    if (p1.startsWith('lms/') || p1 === 'lms') return match;
    return `Astro.redirect(\`/lms/${p1}\`)`.replace(/\/\//g, '/');
  });

  // fetch('/...')
  content = content.replace(/fetch\('\/([^l'][^m'][^s']|[^']*)'/g, (match, p1) => {
    if (p1.startsWith('lms/') || p1 === 'lms') return match;
    return `fetch('/lms/${p1}'`.replace(/\/+/g, '/');
  });

  // redirect('/...') in middleware / api routes
  content = content.replace(/[^A-Za-z]redirect\('\/([^l'][^m'][^s']|[^']*)'\)/g, (match, p1) => {
    if (p1.startsWith('lms/') || p1 === 'lms') return match;
    return match[0] + `redirect('/lms/${p1}')`.replace(/\/+/g, '/');
  });
  
  content = content.replace(/[^A-Za-z]redirect\(`\/([^`]*)`\)/g, (match, p1) => {
    if (p1.startsWith('lms/') || p1 === 'lms') return match;
    return match[0] + `redirect(\`/lms/${p1}\`)`.replace(/\/\//g, '/');
  });
  
  // Fix cases where it replaced `/lms/` -> `/lms/lms/` by accident
  content = content.replace(/\/lms\/lms\//g, '/lms/');
  // Fix `/lms//`
  content = content.replace(/\/lms\/\//g, '/lms/');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Updated: ${path.relative(srcDir, filePath)}`);
    modifiedFiles++;
  }
});

console.log(`Done! Modified ${modifiedFiles} files.`);

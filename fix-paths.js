const fs = require('fs');
const path = require('path');

function fixPaths(dir) {
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      fixPaths(fullPath);
    } else if (item.endsWith('.html')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      content = content.replace(/href="\/_next\//g, 'href="./_next/');
      content = content.replace(/src="\/_next\//g, 'src="./_next/');
      
      // Fix image references for all asset folders
      content = content.replace(/href="\/logosRuruka\//g, 'href="./logosRuruka/');
      content = content.replace(/src="\/logosRuruka\//g, 'src="./logosRuruka/');
      content = content.replace(/href="\/procesos\//g, 'href="./procesos/');
      content = content.replace(/src="\/procesos\//g, 'src="./procesos/');
      content = content.replace(/href="\/logos\//g, 'href="./logos/');
      content = content.replace(/src="\/logos\//g, 'src="./logos/');
      
      // Fix background-image URLs in style attributes and CSS classes
      content = content.replace(/url\('\/logosRuruka\//g, "url('./logosRuruka/");
      content = content.replace(/url\("\/logosRuruka\//g, 'url("./logosRuruka/');
      content = content.replace(/url\(\/logosRuruka\//g, 'url(./logosRuruka/');
      
      // Fix HTML entity encoded URLs (&#x27; = single quote)
      content = content.replace(/url\(&#x27;\/logosRuruka\//g, "url(&#x27;./logosRuruka/");
      content = content.replace(/url\(&#x27;\/procesos\//g, "url(&#x27;./procesos/");
      content = content.replace(/url\(&#x27;\/logos\//g, "url(&#x27;./logos/");
      
      fs.writeFileSync(fullPath, content);
      console.log(`Fixed paths in ${fullPath}`);
    } else if (item.endsWith('.css')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      // Fix font URLs in CSS files
      content = content.replace(/url\(\/_next\//g, 'url(..\/');
      
      // Determinar la profundidad del archivo CSS para calcular la ruta correcta
      const relativePath = path.relative('./out', fullPath);
      const depth = relativePath.split(path.sep).length - 1;
      const prefix = '../'.repeat(depth);
      
      // Fix image references in CSS files
      content = content.replace(/url\('\/logosRuruka\//g, `url('${prefix}logosRuruka/`);
      content = content.replace(/url\("\/logosRuruka\//g, `url("${prefix}logosRuruka/`);
      content = content.replace(/url\(\/logosRuruka\//g, `url(${prefix}logosRuruka/`);
      content = content.replace(/url\('\/procesos\//g, `url('${prefix}procesos/`);
      content = content.replace(/url\("\/procesos\//g, `url("${prefix}procesos/`);
      content = content.replace(/url\(\/procesos\//g, `url(${prefix}procesos/`);
      content = content.replace(/url\('\/logos\//g, `url('${prefix}logos/`);
      content = content.replace(/url\("\/logos\//g, `url("${prefix}logos/`);
      content = content.replace(/url\(\/logos\//g, `url(${prefix}logos/`);
      
      fs.writeFileSync(fullPath, content);
      console.log(`Fixed CSS paths in ${fullPath}`);
    }
  }
}

console.log('Fixing paths for S3 deployment...');
fixPaths('./out');
console.log('Path fixing completed!');

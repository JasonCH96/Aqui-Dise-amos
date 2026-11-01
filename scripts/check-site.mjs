import { readFile, readdir, access } from 'node:fs/promises';
import { resolve, dirname, extname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '../dist');
const errors = [];
async function walk(dir) {
  for (const item of await readdir(dir, { withFileTypes: true })) {
    const path = resolve(dir, item.name);
    if (item.isDirectory()) { await walk(path); continue; }
    if (!['.html', '.css', '.js'].includes(extname(path))) continue;
    const source = await readFile(path, 'utf8');
    if (extname(path) === '.js') {
      const check = spawnSync(process.execPath, ['--check', path], { encoding: 'utf8' });
      if (check.status !== 0) errors.push(check.stderr);
    }
    const refs = [...source.matchAll(/(?:src|href)=["']([^"']+)["']/g), ...source.matchAll(/url\(\s*["']?([^\s)"']+)/g), ...source.matchAll(/["'](assets\/[^"']+)["']/g)];
    for (const [, ref] of refs) {
      if (/^(?:[a-z][a-z\d+.-]*:|\/\/|#|%23)/i.test(ref)) continue;
      const name = ref.split(/[?#]/)[0];
      if (!name) continue;
      const target = name.startsWith('/') ? resolve(root, '.' + name) : resolve(dirname(path), name);
      try { await access(target); } catch { errors.push(`${relative(root, path)}: recurso faltante ${ref}`); }
    }
  }
}
const html = await readFile(resolve(root, 'index.html'), 'utf8');
if (!/name="viewport"/.test(html)) errors.push('Falta la etiqueta viewport');
await walk(root);
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log('Sitio validado: index.html, viewport, recursos locales y sintaxis JavaScript correctos. Salida: dist/');

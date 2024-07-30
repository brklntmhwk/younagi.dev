import { readdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const ICONS_DIR = '../components/Icon/icons';
const ICON_TYPES_DIR = '../components/Icon/types.ts';

const iconsDir = resolve(import.meta.dirname, ICONS_DIR);
console.log(iconsDir);
const iconFiles = readdirSync(iconsDir);
const iconNames = iconFiles.map((file) => file.replace('.svg', ''));

const typeDef = `export type IconName = ${iconNames.map((name) => `'${name}'`).join(' | ')};`;

writeFileSync(resolve(import.meta.dirname, ICON_TYPES_DIR), typeDef);
console.log(`SVG Icon types has been generated in ${iconsDir}.`);

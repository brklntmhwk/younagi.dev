import { readdirSync, writeFileSync } from 'fs'
import { resolve } from 'path'

const ICONS_DIR = '../components/Icon/icons'
const ICON_TYPES_DIR = '../components/Icon/types.ts'

const iconsDir = resolve(__dirname, ICONS_DIR)
console.log(iconsDir)
const iconFiles = readdirSync(iconsDir)
const iconNames = iconFiles.map((file) => file.replace('.svg', ''))

const typeDef = `export type IconName = ${iconNames.map((name) => `'${name}'`).join(' | ')};`

writeFileSync(resolve(__dirname, ICON_TYPES_DIR), typeDef)
console.log(`SVG Icon types has been generated in ${iconsDir}.`)

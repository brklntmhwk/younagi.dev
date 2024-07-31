import { readdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import type { AstroIntegration, AstroIntegrationLogger } from 'astro';

const generateIconNameType = async () => {
  const ICONS_DIR = '../../components/Icon/icons';
  const ICON_TYPES_DIR = '../../components/Icon/types.ts';

  const iconsDir = resolve(import.meta.dirname, ICONS_DIR);
  const iconFiles = await readdir(iconsDir);

  if (iconFiles.length <= 0) {
    throw new Error('No icon found');
  }

  const iconNames = iconFiles.map((file) => file.replace('.svg', ''));
  const typeDef = `export type IconName = ${iconNames.map((name) => `'${name}'`).join(' | ')};`;

  const iconTypesOutDir = resolve(import.meta.dirname, ICON_TYPES_DIR);
  await writeFile(iconTypesOutDir, typeDef);

  return {
    outputPath: iconTypesOutDir,
  };
};

const handleError = (e: unknown, logger: AstroIntegrationLogger) => {
  logger.error('Failed to generate icon name types');

  if (e instanceof Error) {
    throw new Error(`${e.name}: ${e.message}`);
  }

  throw new Error('An unexpected error occurred');
};

export const iconNameTypes = (): AstroIntegration => {
  return {
    name: 'icon-name-types',
    hooks: {
      'astro:build:start': async ({ logger }) => {
        try {
          const { outputPath } = await generateIconNameType();
          logger.info(
            `Icon types successfully generated to the directory "${outputPath}"`,
          );
        } catch (e) {
          handleError(e, logger);
        }
      },
    },
  };
};

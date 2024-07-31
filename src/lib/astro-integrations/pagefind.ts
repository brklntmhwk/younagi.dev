import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { AstroIntegration } from 'astro';
import { createIndex } from 'pagefind';
import sirv from 'sirv';

export const pagefind = (): AstroIntegration => {
  let outDir: string;
  let pagefindDir: string;

  return {
    name: 'pagefind',
    hooks: {
      'astro:config:setup': ({ config }) => {
        outDir = fileURLToPath(config.outDir);
        pagefindDir = path.join(outDir, 'pagefind');
      },
      'astro:server:setup': async ({ server, logger }) => {
        if (!existsSync(pagefindDir)) {
          logger.warn(
            `The directory for Pagefind index "${pagefindDir}" does not exist. Run "astro build" before "astro dev" otherwise it cannot work as expected.`,
          );
        }

        const pagefindMiddleware = sirv(pagefindDir, { dev: true, etag: true });

        server.middlewares.use((req, res, next) => {
          if (req.url?.startsWith('/pagefind')) {
            return pagefindMiddleware(req, res, next);
          }
          return next();
        });
      },
      'astro:build:done': async ({ logger }) => {
        const { index } = await createIndex({});

        if (!index) {
          throw new Error('Failed to create indexes');
        }

        const { page_count, errors: addErrs } = await index.addDirectory({
          path: outDir,
        });

        if (addErrs.length) {
          throw new Error('Failed to index files');
        }

        logger.info(`${page_count} pages successfully indexed`);

        const { errors: writeErrs } = await index.writeFiles({
          outputPath: pagefindDir,
        });

        if (writeErrs.length) {
          throw new Error('Failed to write indexes');
        }

        logger.info(
          `Pagefind index(es) successfully written to the directory "${pagefindDir}"`,
        );
      },
    },
  };
};

import { defineCollection } from 'astro:content';
import { glob, type Loader, type DataStore } from 'astro/loaders';
import { z } from 'astro/zod';
import { statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

/** Inject each entry's source-file mtime as `lastModified` whenever the store is written. */
function withFileMtime(base: Loader): Loader {
  return {
    name: `${base.name}-mtime`,
    load: async (context) => {
      const originalSet = context.store.set.bind(context.store) as DataStore['set'];

      context.store.set = ((entry) => {
        if (!entry.filePath) {
          return originalSet(entry);
        }

        const absolutePath = resolve(fileURLToPath(context.config.root), entry.filePath);
        const lastModified = statSync(absolutePath).mtime;

        return originalSet({
          ...entry,
          data: {
            ...entry.data,
            lastModified,
          },
        });
      }) as DataStore['set'];

      await base.load(context);
    },
  };
}

const plasticity = defineCollection({
  loader: withFileMtime(
    glob({ base: './src/content/plasticity', pattern: '**/*.{md,mdx}' }),
  ),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    author: z.string().optional(),
    image: z.string().optional(),
    // Injected from the source file's mtime by withFileMtime()
    lastModified: z.date().optional(),
  }),
});

export const collections = {
  plasticity,
};

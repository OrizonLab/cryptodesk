import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    // SEO
    ogImage: z.string().optional(),
    canonical: z.string().optional(),
    // Lien vers la version anglaise (slug) — pour hreflang + bascule
    enSlug: z.string().optional(),
  }),
});

// Collection des articles anglais/américains (version EN rédigée à part,
// pas une traduction — 2 analyses/jour FR + EN)
const postsEn = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    // SEO
    ogImage: z.string().optional(),
    canonical: z.string().optional(),
    // Lien vers la version française (slug) — pour hreflang + bascule
    frSlug: z.string().optional(),
  }),
});

export const collections = { posts, postsEn };

import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = (await getCollection('posts'))
    .filter((p) => !p.data.draft)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  return rss({
    title: 'CryptoDesk — Cryptos & Marchés Financiers',
    description: 'Analyses, actualités et décryptages sur les cryptomonnaies et les marchés financiers.',
    site: context.site ?? 'https://blog.auratrade.app/',
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/posts/${post.slug}/`,
      categories: post.data.tags,
    })),
    customData: '<language>fr-fr</language>',
  });
}

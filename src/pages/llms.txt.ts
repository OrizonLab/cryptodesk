import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

/**
 * llms.txt — SEO pour les LLM (spécification llmstxt.org)
 * Donne aux modèles d'IA un index structuré du site.
 * Généré dynamiquement depuis la collection de posts.
 */
export async function GET(context: APIContext) {
  const site = context.site ?? new URL('https://blog.auratrade.app/');
  const posts = (await getCollection('posts'))
    .filter((p) => !p.data.draft)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  const lines: string[] = [];
  lines.push('# CryptoDesk');
  lines.push('');
  lines.push('> Blog francophone indépendant sur les cryptomonnaies et les marchés financiers.');
  lines.push('> Analyses, actualités, fondamentaux et perspectives — contenu informatif, pas un conseil en investissement.');
  lines.push('');
  lines.push('## CryptoDesk');
  lines.push('');
  lines.push(`- [Accueil](${site})`);
  lines.push(`- [Flux RSS](${new URL('rss.xml', site)})`);
  lines.push(`- [Sitemap](${new URL('sitemap-index.xml', site)})`);
  lines.push('');
  lines.push('## Articles');
  lines.push('');
  for (const post of posts) {
    const url = new URL(`posts/${post.slug}/`, site);
    const date = post.data.pubDate.toISOString().slice(0, 10);
    const tags = post.data.tags.length > 0 ? ` [${post.data.tags.join(', ')}]` : '';
    lines.push(`- [${post.data.title}](${url}): ${post.data.description} (${date})${tags}`);
  }
  lines.push('');
  lines.push('## Thèmes couverts');
  lines.push('');
  lines.push('- Bitcoin et protocoles crypto');
  lines.push('- Altcoins et DeFi');
  lines.push('- Marchés financiers (actions, indices, macroéconomie)');
  lines.push('- Analyse technique et fondamentale');
  lines.push('- Gestion de portefeuille et risques');

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}

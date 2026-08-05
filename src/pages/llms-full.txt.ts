import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

/**
 * llms-full.txt — spec llmstxt.org, version complète.
 * Contient l'intégralité du contenu des articles pour permettre aux
 * modèles d'IA d'ingérer le contenu sans devoir crawler chaque page.
 * Généré dynamiquement à chaque build.
 */
export async function GET(context: APIContext) {
  const site = context.site ?? new URL('https://cryptodesk.fr/');
  const posts = (await getCollection('posts'))
    .filter((p) => !p.data.draft)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  const lines: string[] = [];
  lines.push('# CryptoDesk — Contenu complet');
  lines.push('');
  lines.push('> Blog francophone indépendant sur les cryptomonnaies et les marchés financiers.');
  lines.push('> Contenu informatif — pas un conseil en investissement.');
  lines.push('');

  for (const post of posts) {
    const url = new URL(`posts/${post.slug}/`, site);
    lines.push(`## ${post.data.title}`);
    lines.push('');
    lines.push(`- Date : ${post.data.pubDate.toISOString().slice(0, 10)}`);
    lines.push(`- URL : ${url}`);
    if (post.data.tags.length > 0) {
      lines.push(`- Tags : ${post.data.tags.join(', ')}`);
    }
    lines.push('');
    lines.push(post.data.description);
    lines.push('');

    // Contenu markdown source (plus fiable que le rendu HTML dans une
    // route API statique ; texte brut parfaitement lisible par les LLM).
    const body = (post as { body?: string }).body ?? '';
    if (body.trim()) {
      lines.push(body.trim());
      lines.push('');
    }
    lines.push('---');
    lines.push('');
  }

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}

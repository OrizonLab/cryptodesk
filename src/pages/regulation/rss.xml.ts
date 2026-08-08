import rss from '@astrojs/rss';
import dossiersData from '../../data/regulation-dossiers.json';
import type { APIContext } from 'astro';

// Flux RSS dédié du Regulation Clock : un item par changement d'état de dossier.
export async function GET(context: APIContext) {
  const items: { title: string; description: string; pubDate: Date; link: string }[] = [];

  dossiersData.dossiers.forEach((d) => {
    // Dernier changement d'état connu (ou statut actuel)
    const lastChange = d.changes && d.changes.length > 0 ? d.changes[d.changes.length - 1] : null;
    const dateStr = lastChange ? lastChange.date : dossiersData.updated;
    const m = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})/);
    const pubDate = m ? new Date(Date.UTC(+m[1], +m[2] - 1, +m[3])) : new Date();

    items.push({
      title: `[${d.name}] ${lastChange ? `${lastChange.from} → ${lastChange.to}` : d.status}`,
      description: `Dernière action officielle (${d.lastAction.date}) : ${d.lastAction.text} — Prochaine étape (${d.nextStep.date}) : ${d.nextStep.text}`,
      pubDate,
      link: `/regulation/${d.slug}/`,
    });
  });

  return rss({
    title: 'Regulation Clock — CryptoDesk',
    description: "Changements d'état des 5 dossiers réglementaires crypto (CLARITY Act, stablecoins US, SEC/CFTC, MiCA, plateformes) — fondés sur les sources officielles.",
    site: context.site ?? 'https://cryptodesk.fr/',
    items,
    customData: '<language>fr-fr</language>',
  });
}

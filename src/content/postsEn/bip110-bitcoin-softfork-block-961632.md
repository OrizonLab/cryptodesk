---
title: "Bitcoin's Weekend 'Fork' Is a Governance Test, Not a Threat — BIP-110 at Block 961,632"
description: "BIP-110, a one-year soft fork restricting arbitrary data in Bitcoin transactions, opens its mandatory signaling window at block 961,632 this weekend with under 3% miner support. Here's why the 'Bitcoin fork' headlines are overblown — and what the episode proves about how Bitcoin is actually governed."
pubDate: 2026-08-08T19:30:00Z
tags: ["bitcoin", "ordinals", "inscriptions", "softfork", "governance"]
draft: false
---

This weekend, at block **961,632** on the Bitcoin network, a small part of the network will voluntarily cut itself off from the rest. Probably nothing will happen. But the episode — a contentious soft-fork deployment known as **BIP-110** — is the clearest demonstration in years of how Bitcoin actually makes (or refuses to make) its rules.

## The debate behind the fork

For over three years, the Bitcoin community has argued about a simple question: should you be able to store anything other than transactions in Bitcoin? Images, text, the famous **inscriptions** that exploded with Ordinals in early 2023 — for some, they are pure pollution that raises node costs and bends Bitcoin's incentives away from being money. For others, they are an expression of permissionlessness, a freedom worth defending.

**BIP-110 ("Reduced Data Temporary Softfork", authored by Dathon Ohm, December 2025)** takes the first camp's side. As a soft fork, it adds stricter rules without invalidating existing coins: new output scripts over 34 bytes are invalid (except OP_RETURN payloads up to 83 bytes), witness items over 256 bytes are invalid, Taproot annexes and unexecuted `OP_SUCCESS*` opcodes are banned, and legacy UTXOs are grandfathered. The rules expire automatically after **52,416 blocks — roughly one year** — and normal payments (P2PKH, P2WPKH, Taproot key-path spends) are untouched. Supporters argue it corrects "distorted incentives" caused by standardizing arbitrary data.

## The method is the problem

So far, nothing extraordinary — Bitcoin proposals come and go. The problem is the *method*.

Changing a rule on Bitcoin normally requires **massive miner signaling**: historically 90–95% of blocks signal support before a change activates. BIP-110 instead uses a modified BIP9 deployment with a **55% threshold** (1,109 of 2,016 blocks per retarget period). Very low. And even by that yardstick, it is failing: **under 3% of blocks signal support** (roughly 2.6% as of Friday, down from 0.31% of hashrate in late June, and effectively 0% on recent days according to bip110.org's monitor). In any system, that is called a "no."

Rather than accept that, the proposal's supporters decided to force the issue. From block 961,632 — expected sometime this weekend — their nodes will **reject every block that does not signal the deployment bit**. In other words: essentially every block. They will end up alone on their own version of the chain, enforcing their rules, while the overwhelming majority of hashpower keeps building the current chain without them.

## Why the "Bitcoin fork" headlines are exaggerated

A chain that almost nobody mines is a chain that does not move. The minority chain will mine blocks slowly; its difficulty will adjust downward; and every legacy node will keep following the chain with the most accumulated proof-of-work, exactly as they always have. This is the same script Bitcoin has played before: in 2017, **SegWit2x** — backed by far more powerful actors than today's proponents — tried to impose its version of the rules and ultimately backed down.

Notably, this is not a random-ragtag affair either: **Ocean**, the mining pool associated with longtime Ordinals critic Luke Dashjr, has produced the majority of signaling blocks since March 2026, and enforcement relies on **Bitcoin Knots** node adoption. Prominent figures including Adam Back and Jameson Lopp have publicly warned that the activation parameters are reckless and risk a persistent chain split, with halted exchange deposits, replay risk and infrastructure confusion as the realistic worst cases. But the base case remains: a noisy weekend, a minority chain that stalls, and the main chain continuing undisturbed — which is precisely what "probablement rien" looks like on a ledger you can verify yourself at any block explorer.

## The real subject of the weekend

The real subject is not the threat — it's the demonstration. On Bitcoin, nobody imposes a rule without convincing: not a developer, not a miner, not a pool. The heaviest-chain rule is not a technicality; it is the governance constitution. Under 3% is not convincing. That is the story of this weekend — and it's a better story than any fork headline.

*Sources: BIP-110 spec (bips.dev/110), news.bitcoin.com (June 27, 2026), bip110.org/monitor, Coin Dance node stats, block explorers (Blockstream, Mempool.space) — chain tip at 961,620 at time of writing. This article is informational and does not constitute investment advice; always do your own research.*

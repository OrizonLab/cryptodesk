---
title: "Four Bitcoin Bridges Broke in Three Weeks — Four Different Bugs, One Pattern"
description: "Liquid, Nomic, Symbiosis and Chainflip were all attacked within 21 days, and roughly $48 million is still unrecovered or unbacked. What the failures say about the code underneath every \"bitcoin yield\" product — and why the price never noticed."
pubDate: 2026-09-14T22:45:00Z
tags: ["bitcoin", "security", "bridges", "defi", "hacks"]
draft: false
ogImage: "/og/four-bitcoin-bridges-four-bugs-three-weeks.jpg"
---

On the morning of Saturday, September 12, somebody attacked Chainflip — a cross-chain swap protocol that routes assets natively across Bitcoin, Ethereum, Solana and Tron without wrapped tokens. Over roughly 90 minutes, the attacker hit the same logic eight times and succeeded six of them, walking away with **736,442.17 USDT**. The network is dark tonight, its full restart plan still unsigned, and its fix is done but not yet trusted.

That was the fourth failure in three weeks. And if you read only the headlines, you would think these were four unrelated accidents. They are not.

## What actually broke, four times

Regulators talk about crypto risk in terms of price, custody and disclosure. The last three weeks say the risk lives somewhere less cinematic: in the small amount of glue that lets bitcoin move between systems. Four different pieces of that glue gave way within 21 days.

- **Liquid Network, September 6.** Roughly 4,019 bitcoin, about $320 million, left the sidechain's federation reserve wallet in a single peg-out — the reserves that back L-BTC fell by around 95% in one transaction. The actors left a note in the transaction data: "we are whitehats, contact us on chain." About 3,400 BTC (roughly $264 million) came back the next day. **598 BTC, around $47 million, did not.** Security write-ups since have pointed at a flaw in how the underlying Elements software caches range-proof verification, which let unbacked L-BTC be created and then pegged out for real bitcoin. No private keys were stolen. A caching bug did that.
- **Nomic, minted June 25, discovered September 9.** An attacker found a flaw in Nomic's custom transaction-forwarding path, the code that moves nBTC vouchers into the Cosmos ecosystem, and double-spent one deposit. The total was small in relative terms — **39.84 unbacked nBTC, about $3 million** — but it represented **36% of the entire backing of Osmosis's Alloyed BTC basket**, the Cosmos DEX's flagship bitcoin asset. Osmosis halted Nomic and allBTC flows and pushed an emergency upgrade that froze 22.65 BTC in the attacker's account. A governance vote is still needed to seize that and to pull roughly **17.19 BTC** from the community pool to make the basket whole again.
- **Symbiosis, September 11.** A flaw in the BridgeV2 contract let an attacker mint **46.1 billion unbacked syBTC**, a number several thousand times larger than bitcoin's actual circulating supply. The market was not fooled: only about 4.39 wrapped bitcoin could be swapped on Uniswap, netting an estimated **$336,000**. The team says it recovered roughly **15 BTC, about $1.16 million**, into a multisig, and offered the attacker a 20% bounty — a window that closed on September 13 with no public acceptance.
- **Chainflip, September 12.** The cleanest case study of the four. Chainflip reads Tron swap instructions from a memo attached to the transaction, unlike the chains where it uses dedicated contract functions. The attacker attached their own memo to a transaction validators had already signed. The system read it as a fresh swap, classified it as failed, and issued a refund — paying the same deposit twice. They started small, roughly doubled each attempt, and repeated it eight times. The protocol says this is entirely its own code, not Tron, not USDT, not Tether. It is the first incident in which Chainflip's treasury funds were drained, and 115,654.41 USDT of a customer swap is sitting in a vault waiting for the restart.

Add Zentra Finance's $143,000 ctUSD reserve exploit on Citrea, whose on-chain bounty deadline expired at 12:00 UTC today, and the tally is hard to wave away: **close to $48 million is still unrecovered or unbacked across these events**, and that number only counts what has been disclosed.

## The pattern is not the bug. It is the wrapper.

Every one of these systems exists for the same reason: bitcoin is slow and settled on one chain, and everyone wants it somewhere else. The token that comes out the other side is a liability, not a coin. It says "somebody owes you one bitcoin" — and that somebody is a federation, a validator set, a memo parser or a smart contract.

That is why the losses are so scattered in size. Symbiosis's attacker minted $4 trillion of notional value and extracted $336,000, because there is no depth to sell into. Liquid's attacker moved nine figures in one transaction because the treasury was real, liquid bitcoin. Osmosis's hole was invisible for **74 days** because nobody was checking the vaults against the vouchers, and the exploit itself cost about one satoshi to run. The code was still sitting unchanged in Nomic's development branch when a researcher named Rarma published the transaction trace on September 8 — Osmosis disclosed the losses a day later. Nomic had passed a Trail of Bits security review in 2024 that flagged only a medium-severity account-formatting issue, unrelated to what broke.

For US readers the practical question is exposure. If your bitcoin is held by a spot ETF custodian, a regulated exchange or a public miner's treasury, these bugs are not your problem. If your yield comes from a "bitcoin" product on a Cosmos chain, a sidechain, a Bitcoin L2 or a DEX vault, you are underwriting code paths like the four above, and the disclosure standard you are relying on is a post on X.

## Why the price didn't blink

Bitcoin traded near **$77,500** today, roughly flat, and it has not moved on any of these incidents. That is not complacency so much as scale: US spot bitcoin ETFs shed **$462.7 million** between September 8 and 11, and the market is waiting on two votes inside 48 hours.

Tuesday at 2:15 p.m. ET, the Senate takes up the CLARITY Act, needing 60 votes to open debate on the 635-page market-structure bill. The revised text, released Sunday night, contains 126 concessions to Democrats, new ethics rules covering federal officials and judges, and a Treasury "circuit breaker" against stablecoin deposit flight — a fix eight banking trade groups say arrives too late to stop the damage. Less noticed: the Blockchain Regulatory Certainty Act provisions no longer shield developers from criminal prosecution under Section 1960, the statute at the center of the Roman Storm conviction. Galaxy Digital's Alex Thorn, previously at 10%, put the bill's odds at 25% on Monday. Wednesday, the Fed announces a decision markets price at 81.5% to 90.7% in favour of a quarter-point **hike** — the first since 2023.

Three structural events, all inside one week, and the bridge failures still do not show up in the price. They show up in timelines: Chainflip's own post-mortem notes that increasingly capable AI models are changing the security landscape, and that it intends to use those same tools to find bugs before attackers do. That is the race now. Not whether a bridge will be exploited, but whether the operators know it before someone with a laptop and a memo field does.

*Nothing here is investment advice.*

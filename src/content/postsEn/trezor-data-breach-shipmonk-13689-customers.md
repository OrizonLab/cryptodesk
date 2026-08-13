---
title: "Trezor Breach Exposes 13,689 Customers: The 'Safest' Wallet's Weakest Link Was Its Shipping Partner"
description: "Trezor confirmed Thursday that hackers breached ShipMonk, its US/EU logistics partner, exposing names, phone numbers, emails and home addresses of 13,689 customers. The attack ran through a CVSS 10.0 Metabase zero-day (CVE-2026-72898) now in CISA's KEV catalog. Devices and funds are safe — but a wave of highly personalized phishing is the real threat."
pubDate: 2026-08-13T22:45:00Z
tags: ["trezor", "security", "data-breach", "hardware-wallet", "phishing"]
draft: false
frSlug: "trezor-fuite-donnees-shipmonk-13689-clients"
---

The hardware wallet is supposed to be the safest object in crypto: a private key that never leaves the device, an air gap between your bitcoin and the internet. But buying one still leaves a paper trail. Trezor learned that lesson the hard way this week. On Thursday, August 13, the Prague-based manufacturer behind the Safe 3, Safe 5 and Safe 7 disclosed that **ShipMonk**, one of its shipping and logistics partners, was hacked — exposing the personal data of **13,689 customers**: full names, shipping addresses, email addresses and phone numbers. It is the first time since the company was founded in 2013 that Trezor has lost customer phone numbers and physical addresses to an attacker.

Devices, keys and funds were not touched: Trezor insists its own systems were never compromised and that "your Trezor device is secure." The blast radius is elsewhere. The stolen data is precisely the ammunition scammers need to build the most convincing phishing campaigns crypto has seen in years — emails, phone calls and even postal letters that cite your real name, your real address and your real order number. The disclosure landed on a quiet day for markets — bitcoin opened near $63,410 on Thursday and traded around $63,500, still squeezed between a firming $62,000 floor and the $64,000 wall that has capped it for two months — but for the self-custody crowd, this was the week's loudest story.

## The numbers: 11,742 full exposures, 1,947 partial

ShipMonk, which stores Trezor inventory and ships orders across North America and Europe, informed Trezor of the intrusion on **Monday, August 10**. The final tally, per Trezor's [official incident post](https://trezor.io/blog/news/recent-customer-data-exposed-in-shipping-provider-incident):

- **11,742 customers** with full exposure: name, email address, phone number and shipping address;
- **1,947 customers** with partial exposure: name, city and email address — a group Trezor now says *may include older orders*, a detail still being verified with ShipMonk;
- Affected orders were delivered between **May 10 and August 8, 2026**, to customers in the **United States, United Kingdom, Sweden, Colombia, Brazil, Italy and Portugal**.

The figure could have been far worse. Trezor enforces a strict **90-day data retention policy** — extended to its fulfillment partners, who delete or anonymize order data 90 days after delivery — which mechanically capped the damage: orders older than three months were already gone. Affected customers were contacted individually by email from `privacy@trezor.io`; if you did not receive a message from that address, you are not affected.

## The root cause: a CVSS 10.0 zero-day in Metabase

Trezor did not say how ShipMonk was breached — ShipMonk did. In breach notification emails reviewed by [BleepingComputer](https://www.bleepingcomputer.com/news/security/trezor-discloses-data-breach-affecting-nearly-14-000-customers/), the logistics firm told customers that attackers exploited a vulnerability in **Metabase**, the open-source analytics platform it runs internally.

Metabase disclosed on August 6 that a critical flaw — **CVE-2026-72898, an unauthenticated SQL injection in the `/reset_password` endpoint, rated CVSS 10.0, the maximum severity** — had been exploited in the wild since **August 3**. A single crafted request gave an attacker full administrator access to a victim's Metabase instance, and in at least some cases the credentials of the databases connected downstream. The U.S. Cybersecurity and Infrastructure Security Agency (**CISA**) added the flaw to its Known Exploited Vulnerabilities catalog by August 11, a designation reserved for bugs under active attack. Metabase says it has patched the vulnerability and invalidated all active sessions; ShipMonk says it launched a technical investigation with external experts.

Trezor's logistics partner was not alone in the blast radius. **At least five companies** fell to the same zero-day wave, including modular-laptop maker **Framework** and online form builder **Tally**, both of which notified customers that personal data was taken from their Metabase instances. And the pressure did not stop at data theft: BleepingComputer reports that ShipMonk also received **extortion emails from ShinyHunters**, one of the most active data-extortion gangs currently operating.

## The real threat: phishing built from your real address

Trezor is blunt about what comes next: affected customers "might be targeted by more sophisticated phishing attempts," with scammers impersonating banks, crypto exchanges — or Trezor itself — by email, by phone, even by physical mail. An email that greets you by name, references your actual order and your real ZIP code is infinitely more credible than a generic "your account has been compromised" blast.

The industry has a recent, painful precedent. In January 2024, after an intrusion in its third-party support portal exposed data on **66,000 users**, Trezor confirmed the stolen information was used to launch phishing campaigns whose end goal was simple: trick victims into entering their **24-word recovery seed** on a fake website. The rule has not changed, and it is the absolute defense against everything described in this article: **no legitimate wallet provider — Trezor, Ledger or any other — will ever ask you to enter your recovery phrase on a website, in an app or over the phone.** A hardware wallet exists precisely so your seed never touches the internet. Anyone claiming to need it is the attacker.

## The logistics paradox: CEVA, Valve and the supply chain

The ShipMonk incident is not an isolated event — it is the second logistics-linked breach to hit headlines in a single week. On Monday, **Valve warned European Steam Hardware customers** that their names, addresses and order data may have been stolen in a hack of **CEVA Logistics**, one of the world's largest shipping firms, which confirmed a cyberattack affecting at least **eight warehouses in Europe** since late July, as [TechCrunch reported](https://techcrunch.com/2026/08/10/a-data-breach-at-shipping-giant-ceva-logistics-is-rippling-across-banks-retailers-steam-gamers-and-beyond/). The ripples reached Dutch retailer Bol, luxury department store De Bijenkorf, football club Ajax, banking giant ING and eyeglass maker Ace & Tate.

The lesson is structural. Crypto companies have spent years hardening their own systems — but order data flows through third parties — logistics, payments, support — whose attack surface is out of their control. For a company like Trezor, whose entire promise is key sovereignty, the paradox is sharp: you buy a hardware wallet to stop depending on third parties, and the checkout process hands your identity to an entire chain of them.

## What Trezor is doing — and what US holders should do now

Trezor announced two responses. First, **Anonymous Delivery**: a dedicated checkout, locker pickup, neutral packaging, generic sender details and automatic deletion of shipping identifiers after delivery — targeted for **September 2026 in the EU and the end of 2026 in the United States**. Second, practical guidance for limiting exposure on future orders: an email address not linked to your real identity, payment in crypto or with a disposable card, and a P.O. Box where possible.

For the 13,689 affected customers — including a large share of American holders, the largest single market in the affected list — the immediate playbook is simple. Check your inbox for the notification from `privacy@trezor.io`. Treat any message demanding urgent action, payment or "verification" as hostile until proven otherwise. Verify sender addresses and call back on official channels if a "bank" or "exchange" calls you. And never, under any circumstance, type your recovery phrase anywhere but on the device itself. The private key remains out of reach — but social engineering never sleeps, and now it knows your home address.

*Data: Trezor incident disclosure (Aug 13, 2026), BleepingComputer, TechCrunch, CISA KEV, Metabase advisory, Fortune/Yahoo Finance price data. Indicative data only — this article is informational and does not constitute investment advice.*

# Dream Atlas

**An anonymous observatory of what the world dreams.**

Type last night's dream → a deterministic engine names its universal **archetype** (The Falling, The Chase, The Water, …) → you get a born-to-share card → and your anonymous archetype joins a live map of *what the world dreamed tonight*.

**▶ Live: https://greymoth-jp.github.io/dream-atlas/** — installable as an app, works offline.

## Privacy — and it's verifiable

Your dream text **never leaves your device.** The card is generated entirely in your browser. Adding to the atlas is **opt-in** and sends **only** an anonymous archetype label + the date — never your words, no account, no cookies, no analytics, no tracking.

Don't take our word for it — **this page is the source.** Read [`index.html`](./index.html) and [`engine.js`](./engine.js): the only outbound request is the opt-in atlas call, and its body is exactly `{ archetype, date }`. Nothing else is ever sent.

## How it works

- **`engine.js`** — a deterministic keyword engine maps your dream to one of 12 universal archetypes. No AI, no API; same input → same archetype.
- The card is drawn on a `<canvas>` and shared via the device's native share sheet (or downloaded).
- The collective atlas is a tiny Cloudflare Worker that stores only `{ date → archetype → count }` — never any text.
- Entries mentioning self-harm stay private (never added to the public atlas) and surface a support link. Getting through a hard night is itself honoured.

## Run it yourself

It's a static page — just open `index.html`. For the live collective atlas you also need the Worker. MIT licensed.

---
*Made by **greymoth**. A cultural mirror drawn from the old, shared grammar of dreams — not a prediction, not a diagnosis.*

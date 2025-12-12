# ENC Christmas Bible Jeopardy 🎄📖

A host-controlled Jeopardy-style Bible + Christmas game for college students (2–5 teams). Built with Next.js and deploys to Vercel fast.

## What you get
- **/host**: Host console (protected by PIN via middleware + httpOnly cookie)
- **/display**: Clean audience view (read-only)
- Sync across tabs via **BroadcastChannel + localStorage** (great for laptop + projector)

## 5-minute deploy (Vercel)
1. Install dependencies:
   ```bash
   npm install
   ```
2. Run locally:
   ```bash
   npm run dev
   ```
3. Deploy with Vercel CLI (fastest):
   ```bash
   npm i -g vercel
   vercel
   ```
   OR import this folder in the Vercel dashboard.

4. In Vercel **Project → Settings → Environment Variables**, set:
   - `HOST_PIN` = a private PIN only you know (example: `ENC-Christmas`)
   - *(optional)* `LOCKDOWN` = `true` to require PIN for **all** routes (not just /host)

## Hosting flow (recommended)
- Open **/host** on your laptop.
- Open **/display** on the projector (new tab/window).
- Click values to open clues, reveal answers, and score teams.

## Host shortcuts
- In a clue modal:
  - `A` toggles the answer
  - `Esc` closes the modal

## Content
Round 1 has 6 categories × 5 clues each + Final Jeopardy.
All clues include scripture references.

Have fun & Merry Christmas! 🎄
# end-christmas-jeopardy

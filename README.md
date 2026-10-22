# Devika's Birthday Letter Website ♡

A warm, personal, scrapbook-style digital birthday letter website for Devika ("Her Royal Liegehood").

## Features

- **Sealed Royal Envelope**:
  - Sealed envelope with 3D wax seal and royal crown monogram.
  - "Open your letter ♡" button triggers an envelope opening transition.
- **Scrapbook Letter**:
  - Warm cream paper background with subtle ambient stars, washi tape corners, and deckled textures.
  - Burgundy and muted pink accents.
  - Elegant calligraphy headings and readable serif body copy.
  - Little royal crown doodle and decorative birthday cake illustration with animated candle flame.
  - Personal P.S. note box.
  - "Send a little birthday magic ✨" button with celebratory confetti particles and reveal message ("Happy birthday again, Devika! ♡").
- **Background Music Player**:
  - Floats unobtrusively after opening the letter.
  - Play, pause, mute/unmute, and restart controls.
  - Gentle starting volume (0.38) and spinning vinyl indicator.
  - No autoplay blocking issues because playback starts upon the user's "Open your letter ♡" click.
- **Fully Responsive**: Beautiful on iPhones, Android phones, tablets, and laptops.

---

## Audio File Placement

To ensure the background piano cover plays automatically:

Place your MP3 file:
`Stromae, Pomme - Ma Meilleure Ennemie (from Arcane Season 2) - Piano Cover _ Version [0Z7jXlBV_nU].mp3`

into the project's audio directory:
`assets/audio/Stromae, Pomme - Ma Meilleure Ennemie (from Arcane Season 2) - Piano Cover _ Version [0Z7jXlBV_nU].mp3`

*(Alternatively, you can also rename a copy to `assets/audio/soundtrack.mp3` as a clean fallback, or use the in-browser file picker).*

---

## How to Run Locally

You can preview the website immediately:

1. **Option A (Instant Local Server)**:
   ```bash
   python -m http.server 8085
   ```
   Then visit `http://127.0.0.1:8085` in your browser.

2. **Option B (Direct Open)**:
   Double-click `index.html` to open it directly in Chrome, Safari, Edge, or Firefox.

---

## How to Publish to a Shareable Public HTTPS URL

Since this website is built with clean HTML5, CSS3, and modern Vanilla JavaScript with zero build steps or database dependencies, it can be published in under 2 minutes:

### Option 1: Netlify Drop (Easiest - 60 seconds, no account required)
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag and drop the `devika-birthday-letter` folder onto the page.
3. You will immediately get a live HTTPS URL (e.g., `https://devika-birthday.netlify.app`) to send to Devika!

### Option 2: GitHub Pages (Free forever)
1. Create a repository on GitHub (e.g. `devika-birthday`).
2. Push or upload `index.html`, `style.css`, `script.js`, and the `assets/` folder.
3. Go to **Settings** → **Pages** → select the `main` branch → **Save**.
4. In ~1 minute, your site will be live at `https://<your-username>.github.io/devika-birthday/`.

### Option 3: Vercel
1. Install Vercel CLI (`npx vercel`) or visit [vercel.com](https://vercel.com).
2. Import the project folder and click **Deploy**.

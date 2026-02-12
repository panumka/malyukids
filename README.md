# Веб сайт для виконавця

This is a code bundle for Веб сайт для виконавця. The original project is available at https://www.figma.com/design/Qscpa2kkPlIqXvoK4NVUYE/%D0%92%D0%B5%D0%B1-%D1%81%D0%B0%D0%B9%D1%82-%D0%B4%D0%BB%D1%8F-%D0%B2%D0%B8%D0%BA%D0%BE%D0%BD%D0%B0%D0%B2%D1%86%D1%8F.

## Running the code

Run `npm i` to install the dependencies.

Run `npm run dev` to start the development server.

## Playlist automation setup

1. Copy `.env.example` to `.env`.
2. Fill in YouTube audio source:
- `VITE_YOUTUBE_CHANNEL_URL` in format `.../channel/UC...` (music pulls automatically from channel uploads playlist).
- Optional override: `VITE_YOUTUBE_AUDIO_PLAYLIST_ID` if you want a specific audio playlist instead of all channel uploads.
3. Fill in clips source:
- `VITE_YOUTUBE_CLIPS_PLAYLIST_ID` for the YouTube clips playlist.

When you add new releases/videos to those YouTube playlists, the site updates automatically without manual content edits.

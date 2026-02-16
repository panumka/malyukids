# MalyuKiDs Site

Офіційний сайт проєкту MalyuKiDs.

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

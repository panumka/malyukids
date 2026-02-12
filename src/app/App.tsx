import React from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { StreamingPlatforms } from "./components/StreamingPlatforms";
import { MusicPlayer } from "./components/MusicPlayer";
import { VideoClips } from "./components/VideoClips";
import { Footer } from "./components/Footer";
import { CookieConsentBanner } from "./components/CookieConsentBanner";

export default function App() {
  return (
    <div className="min-h-screen bg-white selection:bg-purple-100 selection:text-purple-600">
      <Navbar />
      <main>
        <Hero />
        <MusicPlayer />
        <VideoClips />
        <StreamingPlatforms />
      </main>
      <Footer />
      <CookieConsentBanner />
    </div>
  );
}

import React from "react";
import { Music2, Play, Youtube, Music } from "lucide-react";
import { trackEvent } from "../lib/analytics";

const PLATFORMS = [
  {
    name: "Spotify",
    icon: <Music2 className="w-8 h-8 text-[#1DB954]" />,
    link: "https://open.spotify.com/artist/2iNj2mfQJvgVQlY4UGcMo3",
    color: "hover:bg-[#1DB954]/10 hover:border-[#1DB954]"
  },
  {
    name: "Apple Music",
    icon: <Music className="w-8 h-8 text-[#FC3C44]" />,
    link: "https://music.apple.com/de/artist/malyukids/1823193326",
    color: "hover:bg-[#FC3C44]/10 hover:border-[#FC3C44]"
  },
  {
    name: "YouTube Music",
    icon: <Play className="w-8 h-8 text-[#FF0000]" />,
    link: "https://music.youtube.com/channel/UCLYln8IsH0RxL4ahcCr-BOw?si=B4gslsyifJSWW9fN",
    color: "hover:bg-[#FF0000]/10 hover:border-[#FF0000]"
  },
  {
    name: "YouTube",
    icon: <Youtube className="w-8 h-8 text-[#FF0000]" />,
    link: "https://www.youtube.com/channel/UCi0EbpfqSkahDCbHJWR0oPg",
    color: "hover:bg-[#FF0000]/10 hover:border-[#FF0000]"
  }
];

export const StreamingPlatforms = () => {
  return (
    <section id="platforms" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900">Слухайте де вам зручно</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">Наша музика доступна на всіх популярних стрімінгових майданчиках світу.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {PLATFORMS.map((platform) => (
            <a 
              key={platform.name}
              href={platform.link}
              target="_blank"
              rel="noreferrer"
              onClick={() =>
                trackEvent("platform_click", {
                  platform: platform.name,
                  destination: platform.link,
                })
              }
              className={`flex flex-col items-center gap-6 p-10 rounded-[2.5rem] border-4 border-gray-50 transition-all duration-300 transform hover:-translate-y-2 group ${platform.color}`}
            >
              <div className="p-5 bg-gray-50 rounded-3xl group-hover:bg-transparent transition-colors">
                {platform.icon}
              </div>
              <span className="text-xl font-black text-gray-900">{platform.name}</span>
            </a>
          ))}
        </div>
        
        <div className="mt-16 flex flex-wrap items-center justify-center gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
           {/* Add more tiny icons or logos if needed */}
           <div className="text-sm font-black uppercase tracking-widest text-gray-400">Та ще на 50+ платформах</div>
        </div>
      </div>
    </section>
  );
};

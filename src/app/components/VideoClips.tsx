import React, { useEffect, useMemo, useRef, useState } from "react";
import { Music2, Youtube } from "lucide-react";
import { LinkButton } from "./ui/Button";
import { Section } from "./ui/Section";

const youtubePlaylistId = import.meta.env.VITE_YOUTUBE_CLIPS_PLAYLIST_ID ?? "";
const youtubeSubscribeUrl = "https://www.youtube.com/channel/UCi0EbpfqSkahDCbHJWR0oPg";

declare global {
  interface Window {
    YT?: {
      Player: new (
        elementId: string,
        config: {
          height?: string;
          width?: string;
          events?: {
            onReady?: (event: { target: { getPlaylist?: () => string[]; destroy?: () => void } }) => void;
            onError?: () => void;
          };
          playerVars?: Record<string, string | number>;
        },
      ) => { destroy?: () => void };
    };
    onYouTubeIframeAPIReady?: (() => void) | undefined;
  }
}

export const VideoClips = () => {
  const [clipVideoIds, setClipVideoIds] = useState<string[]>([]);
  const [isResolvingPlaylist, setIsResolvingPlaylist] = useState(Boolean(youtubePlaylistId));
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  const loaderElementId = useMemo(
    () => `youtube-playlist-loader-${youtubePlaylistId || "empty"}`,
    [],
  );

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || isSectionVisible) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const isIntersecting = entries.some((entry) => entry.isIntersecting);
        if (isIntersecting) {
          setIsSectionVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isSectionVisible]);

  useEffect(() => {
    if (!youtubePlaylistId || !isSectionVisible) {
      setClipVideoIds([]);
      if (!youtubePlaylistId) setIsResolvingPlaylist(false);
      return;
    }

    let disposed = false;
    let playerInstance: { destroy?: () => void } | null = null;

    const finalize = (ids: string[]) => {
      if (disposed) return;
      const uniqueIds = Array.from(new Set(ids.filter(Boolean)));
      setClipVideoIds(uniqueIds);
      setIsResolvingPlaylist(false);
    };

    const mountPlayer = () => {
      if (!window.YT?.Player) return;

      playerInstance = new window.YT.Player(loaderElementId, {
        height: "0",
        width: "0",
        playerVars: {
          listType: "playlist",
          list: youtubePlaylistId,
          autoplay: 0,
          controls: 0,
        },
        events: {
          onReady: (event) => {
            finalize(event.target.getPlaylist?.() ?? []);
            event.target.destroy?.();
          },
          onError: () => finalize([]),
        },
      });
    };

    const existingScript = document.querySelector('script[src="https://www.youtube.com/iframe_api"]');

    if (window.YT?.Player) {
      mountPlayer();
    } else {
      const previousReady = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        previousReady?.();
        mountPlayer();
      };

      if (!existingScript) {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(tag);
      }
    }

    return () => {
      disposed = true;
      playerInstance?.destroy?.();
    };
  }, [loaderElementId, youtubePlaylistId, isSectionVisible]);

  return (
    <Section id="videos" soft>
      <div ref={sectionRef}>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 text-blue-500 font-bold uppercase tracking-wider text-sm">
              <Music2 className="w-4 h-4" />
              <span>Музичні пригоди</span>
            </div>
            <h2 className="section-title">Анімація</h2>
            <p className="section-desc max-w-xl">
              Дивіться наші відео
            </p>
          </div>
          <LinkButton
            href={youtubeSubscribeUrl}
            variant="primary"
            target="_blank"
            rel="noopener noreferrer"
            className="gap-3 px-6 py-3"
          >
            <Youtube className="w-6 h-6 fill-white" /> Підписатись на канал
          </LinkButton>
        </div>

        {youtubePlaylistId ? (
          <div className="space-y-6">
            <div id={loaderElementId} className="hidden" aria-hidden="true" />

            {isResolvingPlaylist ? (
              <div className="rounded-[2rem] border border-gray-200 bg-white p-6 text-gray-600 font-medium">
                Завантаження кліпів...
              </div>
            ) : clipVideoIds.length > 0 ? (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {clipVideoIds.map((videoId, idx) => (
                  <article key={videoId} className="rounded-[1.75rem] overflow-hidden border-4 border-white shadow-lg bg-white">
                    <iframe
                      title={`MalyuKiDs clip ${idx + 1}`}
                      src={`https://www.youtube.com/embed/${videoId}`}
                      width="100%"
                      height="240"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                      loading="lazy"
                      className="w-full"
                    />
                  </article>
                ))}
              </div>
            ) : (
              <div className="rounded-[2rem] border border-amber-300 bg-amber-50 p-6 text-amber-900 font-medium">
                Кліпи тимчасово недоступні.
              </div>
            )}

          </div>
        ) : (
          <div className="rounded-[2rem] border-2 border-dashed border-gray-300 bg-white p-8 text-gray-700">
            <p className="font-bold mb-2">Кліпи скоро з’являться тут.</p>
          </div>
        )}
      </div>
    </Section>
  );
};

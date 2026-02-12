import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Disc,
  ExternalLink,
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Square,
} from "lucide-react";
import { trackEvent } from "../lib/analytics";

const youtubeAudioPlaylistId = import.meta.env.VITE_YOUTUBE_AUDIO_PLAYLIST_ID ?? "";
const youtubeChannelUrl = import.meta.env.VITE_YOUTUBE_CHANNEL_URL ?? "https://www.youtube.com/";

const extractChannelId = (value: string): string => {
  const trimmed = value.trim();
  if (!trimmed) return "";

  const channelUrlMatch = trimmed.match(/\/channel\/(UC[a-zA-Z0-9_-]{22})/);
  if (channelUrlMatch?.[1]) return channelUrlMatch[1];

  if (/^UC[a-zA-Z0-9_-]{22}$/.test(trimmed)) return trimmed;

  return "";
};

const youtubeChannelId = extractChannelId(youtubeChannelUrl);
const youtubeUploadsPlaylistId = youtubeChannelId ? `UU${youtubeChannelId.slice(2)}` : "";
const resolvedYoutubeAudioPlaylistId = youtubeAudioPlaylistId || youtubeUploadsPlaylistId;

const youtubeAudioPlaylistUrl = resolvedYoutubeAudioPlaylistId
  ? `https://www.youtube.com/playlist?list=${resolvedYoutubeAudioPlaylistId}`
  : youtubeChannelUrl;

declare global {
  interface Window {
    YT?: {
      Player: new (
        elementId: string,
        config: {
          height?: string;
          width?: string;
          playerVars?: Record<string, string | number>;
          events?: {
            onReady?: (event: { target: YouTubePlayer }) => void;
            onStateChange?: (event: { data: number; target: YouTubePlayer }) => void;
          };
        },
      ) => YouTubePlayer;
      PlayerState?: {
        PLAYING?: number;
        ENDED?: number;
      };
    };
    onYouTubeIframeAPIReady?: (() => void) | undefined;
  }
}

type YouTubePlayer = {
  destroy?: () => void;
  playVideo?: () => void;
  pauseVideo?: () => void;
  stopVideo?: () => void;
  nextVideo?: () => void;
  previousVideo?: () => void;
  playVideoAt?: (index: number) => void;
  getPlaylist?: () => string[];
  getPlaylistIndex?: () => number;
  getVideoData?: () => { title?: string };
};

export const MusicPlayer = () => {
  const [trackIds, setTrackIds] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentTitle, setCurrentTitle] = useState("MalyuKiDs");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isSectionVisible, setIsSectionVisible] = useState(false);

  const sectionRef = useRef<HTMLElement | null>(null);
  const playerRef = useRef<YouTubePlayer | null>(null);
  const hasInitializedRandomTrackRef = useRef(false);
  const loaderElementId = useMemo(
    () => `youtube-audio-loader-${resolvedYoutubeAudioPlaylistId || "empty"}`,
    [resolvedYoutubeAudioPlaylistId],
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
    if (!resolvedYoutubeAudioPlaylistId || !isSectionVisible) return;

    let disposed = false;

    const syncFromPlayer = (player: YouTubePlayer) => {
      if (disposed) return;
      const ids = player.getPlaylist?.() ?? [];
      const index = player.getPlaylistIndex?.() ?? 0;
      const title = player.getVideoData?.().title ?? "MalyuKiDs";
      setTrackIds(ids);
      setCurrentIndex(Math.max(index, 0));
      setCurrentTitle(title);
    };

    const mountPlayer = () => {
      if (!window.YT?.Player) return;

      playerRef.current = new window.YT.Player(loaderElementId, {
        height: "0",
        width: "0",
        playerVars: {
          listType: "playlist",
          list: resolvedYoutubeAudioPlaylistId,
          autoplay: 0,
          controls: 0,
          rel: 0,
        },
        events: {
          onReady: (event) => {
            if (disposed) return;
            setIsReady(true);
            syncFromPlayer(event.target);

            if (!hasInitializedRandomTrackRef.current) {
              const ids = event.target.getPlaylist?.() ?? [];
              if (ids.length > 1) {
                const randomIndex = Math.floor(Math.random() * ids.length);
                event.target.playVideoAt?.(randomIndex);
                event.target.pauseVideo?.();
                setCurrentIndex(randomIndex);
              }
              hasInitializedRandomTrackRef.current = true;
            }
          },
          onStateChange: (event) => {
            if (disposed) return;

            if (event.data === window.YT?.PlayerState?.ENDED) {
              const ids = event.target.getPlaylist?.() ?? [];
              const index = event.target.getPlaylistIndex?.() ?? 0;
              if (ids.length > 0) {
                if (index >= ids.length - 1) {
                  event.target.playVideoAt?.(0);
                } else {
                  event.target.nextVideo?.();
                }
                return;
              }
            }

            syncFromPlayer(event.target);
            setIsPlaying(event.data === window.YT?.PlayerState?.PLAYING);
          },
        },
      });
    };

    const previousReady = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previousReady?.();
      mountPlayer();
    };

    if (window.YT?.Player) {
      mountPlayer();
    } else {
      const existingScript = document.querySelector('script[src="https://www.youtube.com/iframe_api"]');
      if (!existingScript) {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(tag);
      }
    }

    return () => {
      disposed = true;
      playerRef.current?.destroy?.();
      playerRef.current = null;
    };
  }, [loaderElementId, resolvedYoutubeAudioPlaylistId, isSectionVisible]);

  const currentTrackId = trackIds[currentIndex];
  const coverUrl = currentTrackId
    ? `https://i.ytimg.com/vi/${currentTrackId}/hqdefault.jpg`
    : "";

  const togglePlayPause = () => {
    if (!playerRef.current || !isReady) return;
    if (isPlaying) {
      trackEvent("audio_pause", {
        track_index: currentIndex + 1,
      });
      playerRef.current.pauseVideo?.();
      return;
    }
    trackEvent("audio_play", {
      track_index: currentIndex + 1,
    });
    playerRef.current.playVideo?.();
  };

  const playPrevious = () => {
    if (!playerRef.current || !isReady) return;
    const ids = playerRef.current.getPlaylist?.() ?? [];
    const index = playerRef.current.getPlaylistIndex?.() ?? 0;
    if (ids.length > 0 && index <= 0) {
      playerRef.current.playVideoAt?.(ids.length - 1);
      return;
    }
    playerRef.current.previousVideo?.();
  };

  const playNext = () => {
    if (!playerRef.current || !isReady) return;
    trackEvent("audio_next", {
      track_index: currentIndex + 1,
    });
    playerRef.current.nextVideo?.();
  };

  const stopPlayback = () => {
    if (!playerRef.current || !isReady) return;
    playerRef.current.stopVideo?.();
    setIsPlaying(false);
  };

  return (
    <section ref={sectionRef} id="music" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">Музика</h2>
            <p className="text-gray-600 max-w-2xl text-lg font-medium">
              Слухайте наші пісні у плеєрі прямо на сайті
            </p>
          </div>
        </div>

        {resolvedYoutubeAudioPlaylistId ? (
          <article className="rounded-[2rem] border-2 border-gray-100 bg-white p-6 shadow-sm">
            <div id={loaderElementId} className="hidden" aria-hidden="true" />

            <div className="flex justify-end mb-6">
              <a
                href={youtubeAudioPlaylistUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() =>
                  trackEvent("open_youtube_playlist", {
                    source: "music_player",
                  })
                }
                className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700"
              >
                Відкрити на YouTube <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            <div className="rounded-3xl border border-gray-100 bg-gray-50 p-4 md:p-6 flex flex-col sm:flex-row items-center gap-5">
              <div className="w-24 h-24 rounded-2xl overflow-hidden bg-white border border-gray-100 shrink-0">
                {coverUrl ? (
                  <img src={coverUrl} alt={currentTitle} className="w-full h-full object-cover" loading="lazy" />
                ) : (
                  <div className="w-full h-full grid place-items-center text-gray-400">
                    <Disc className="w-8 h-8" />
                  </div>
                )}
              </div>

              <div className="min-w-0 flex-1 text-center sm:text-left">
                <p className="text-xs font-black uppercase tracking-wider text-gray-400 mb-1">Зараз грає</p>
                <h4 className="font-black text-lg text-gray-900 truncate">
                  {currentTitle}
                </h4>
                <p className="text-sm font-medium text-gray-500 mt-1">
                  {trackIds.length > 0 ? `Трек ${currentIndex + 1} з ${trackIds.length}` : "Завантаження треків..."}
                </p>
              </div>

              <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                <button
                  type="button"
                  onClick={playPrevious}
                  disabled={!isReady}
                  className="w-11 h-11 rounded-full bg-white border border-gray-200 text-gray-700 grid place-items-center disabled:opacity-40"
                  aria-label="Попередній трек"
                >
                  <SkipBack className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={togglePlayPause}
                  disabled={!isReady}
                  className="w-12 h-12 rounded-full bg-red-600 text-white grid place-items-center disabled:opacity-40"
                  aria-label={isPlaying ? "Пауза" : "Відтворити"}
                >
                  {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
                </button>
                <button
                  type="button"
                  onClick={stopPlayback}
                  disabled={!isReady}
                  className="w-11 h-11 rounded-full bg-white border border-gray-200 text-gray-700 grid place-items-center disabled:opacity-40"
                  aria-label="Зупинити"
                >
                  <Square className="w-4 h-4 fill-current" />
                </button>
                <button
                  type="button"
                  onClick={playNext}
                  disabled={!isReady}
                  className="w-11 h-11 rounded-full bg-white border border-gray-200 text-gray-700 grid place-items-center disabled:opacity-40"
                  aria-label="Наступний трек"
                >
                  <SkipForward className="w-5 h-5" />
                </button>
              </div>
            </div>
          </article>
        ) : (
          <div className="rounded-[2rem] border-2 border-dashed border-gray-300 bg-gray-50 p-8 text-gray-700">
            <p className="font-bold mb-2">Музика скоро з’явиться тут.</p>
          </div>
        )}
      </div>
    </section>
  );
};

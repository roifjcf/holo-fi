'use client';
import { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react";
import { PlayMode } from "@/common/type";

type PlayerContextType = {
  // states
  tracks: string[] | null;
  currentTrack: number | null;
  isPlaying: boolean;
  playMode: PlayMode;
  volume: number;
  // ref
  bgmRef: React.RefObject<HTMLAudioElement>;
  // actions
  handlePlay: () => void;
  handlePause: () => void;
  handleNext: () => void;
  handlePrev: () => void;
  handlePlaylistSongClick: (i: number) => void;
  setPlayMode: (mode: PlayMode) => void;
  setVolume: (v: number) => void;
};


const PlayerContext = createContext<PlayerContextType | null>(null);


export function usePlayer() {
  const context = useContext(PlayerContext);
  if (!context) throw new Error("usePlayer must be used within PlayerProvider");
  return context;
}


export function PlayerProvider({ children }: { children: ReactNode }) {

  const [tracks, setTracks] = useState<string[] | null>(null); // original order
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<number | null>(null);
  const [playMode, setPlayMode] = useState<PlayMode>("shuffle");
  const [volume, setVolume] = useState(1);

  const bgmRef = useRef<HTMLAudioElement>(null);

  // actions
  const handlePlay = () => {
    if (bgmRef.current) {
      bgmRef.current.play();
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    if (bgmRef.current) {
      bgmRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handlePrev = () => {
    if (!tracks || !bgmRef.current) return;
    if (playMode === "shuffle") {
      setCurrentTrack(Math.floor(Math.random() * tracks.length));
    } else {
      setCurrentTrack((prev) => (prev! - 1 + tracks.length) % tracks.length);
    }
    setIsPlaying(true);
  };

  const handleNext = () => {
    if (!tracks || !bgmRef.current) return;
    if (playMode === "shuffle") {
      setCurrentTrack(Math.floor(Math.random() * tracks.length));
    } else {
      setCurrentTrack((prev) => (prev! + 1) % tracks.length);
    }
    setIsPlaying(true);
  };


  const handlePlaylistSongClick = (i: number) => {
    setCurrentTrack(i);
    setIsPlaying(true);
  };



  // fetch track list
  useEffect(() => {
    const trackInit = async () => {
      const response = await fetch("/api/trackinit");
      const data = await response.json();
      setTracks(data.message);

      // random songs
      const randomNumber = Math.floor(Math.random() * data.message.length);
      setCurrentTrack(randomNumber);
    };
    trackInit();
  }, []);




  // volume
  useEffect(() => {
    if (bgmRef.current) {
      bgmRef.current.volume = volume;
    }
  }, [volume]);


  return (
    <PlayerContext.Provider
      value={{
        tracks,
        currentTrack,
        isPlaying,
        playMode,
        volume,
        handlePlay,
        handlePause,
        handleNext,
        handlePrev,
        handlePlaylistSongClick,
        setPlayMode,
        setVolume,
        bgmRef,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}
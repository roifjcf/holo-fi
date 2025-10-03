'use client';
import { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react";
import { PlayMode, trackInterface } from "@/common/type";

type PlayerContextType = {
  // states
  tracks: trackInterface[] | null;
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
  handlePlayRemix: () => void;
  handlePlayOriginalEN: () => void;
};


const PlayerContext = createContext<PlayerContextType | null>(null);


export function usePlayer() {
  const context = useContext(PlayerContext);
  if (!context) throw new Error("usePlayer must be used within PlayerProvider");
  return context;
}


export function PlayerProvider({ children }: { children: ReactNode }) {

  const [tracks, setTracks] = useState<trackInterface[] | null>(null); // original order, all selected tracks
  const [tracksRemix, setTracksRemix] = useState<trackInterface[] | null>(null);
  const [tracksOriginalEN, setTracksOriginalEN] = useState<trackInterface[] | null>(null);
  const [tracksOriginalJP, setTracksOriginalJP] = useState<trackInterface[] | null>(null);
  const [tracksOriginalID, setTracksOriginalID] = useState<trackInterface[] | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<number | null>(null); // track number
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


  const handlePlayRemix = () => {
    if (!tracksRemix) return;
    setTracks(tracksRemix);
    setIsPlaying(true);
  }
  const handlePlayOriginalEN = () => {
    if (!tracksOriginalEN) return;
    setTracks(tracksOriginalEN);
    setIsPlaying(true);
  }


  // fetch track list
  useEffect(() => {
    const trackInit = async () => {
      const response = await fetch("api/trackinit");
      const data = await response.json();
      setTracks(data.remix);
      setTracksRemix(data.remix);
      setTracksOriginalEN(data.originalEn);
      // random songs
      const randomNumber = Math.floor(Math.random() * data.remix.length);
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
        handlePlayRemix,
        handlePlayOriginalEN
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}
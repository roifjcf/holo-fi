"use client";

import { usePlayer } from "@/contexts/playerContext";
import { PlayMode } from "@/common/type";
import './playcontrol.scss';

interface Props {
  handleShowPlayList: () => void,
}



export default function PlayControl({
  handleShowPlayList
}: Props) {
  const {
    tracks,
    currentTrack,
    isPlaying,
    playMode,
    volume,
    setPlayMode,
    setVolume,
    handlePlay,
    handlePause,
    handleNext,
    handlePrev,
  } = usePlayer();

  
    const nextPlayMode = (): PlayMode => {
      if (playMode === "repeatOne") return "playAll";
      if (playMode === "playAll") return "shuffle";
      return "repeatOne";
    };

  return (
  <div className="playcontrol-container container-bg">

    <h2 className="playcontrol-music-title">
      {tracks?.[currentTrack ?? 0]?.slice(0, -4) ?? "Loading..."}
    </h2>

    <div className="playcontrol-buttons">
        <div className="left">
          <img
            className="icon-button"
            onClick={handlePrev}
            src="img/icons/left.png"
            alt="prev"
          />
          {isPlaying ? (
            <img
              className="icon-button"
              onClick={handlePause}
              src="img/icons/pause.png"
              alt="pause"
            />
          ) : (
            <img
              className="icon-button"
              onClick={handlePlay}
              src="img/icons/play.png"
              alt="play"
            />
          )}
          <img
            className="icon-button"
            onClick={handleNext}
            src="img/icons/right.png"
            alt="next"
          />
        </div>

        <div className="right">
          <img
            className="icon-button"
            onClick={() => setPlayMode(nextPlayMode())}
            src={`img/icons/${playMode}.png`}
            alt={playMode}
          />
          <img
            className="icon-button"
            onClick={handleShowPlayList}
            src="img/icons/music-list.png"
            alt="music-list"
          />
        </div>
      </div>

          
    <input
      className="slider"
      type="range"
      min={0}
      max={1}
      step={0.01}
      value={volume}
      onChange={(e) => setVolume(Number(e.target.value))}
      style={{
        background: `linear-gradient(to right, white ${volume * 100}%, grey ${
          volume * 100
        }%)`,
      }}
      aria-label="BGM Volume"
    />



  </div>
  );
}
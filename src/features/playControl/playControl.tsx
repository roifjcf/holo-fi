"use client";

import { usePlayer } from "@/contexts/playerContext";
import { PlayMode } from "@/common/type";
import './playcontrol.scss';
import Icon from "@/components/icon/icon";
import { useEffect } from "react";

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

  const renderTalents = () => {
    if (!tracks || currentTrack == null) return null;
    const track = tracks[currentTrack];
    const talentstr = track.vtubers?.join(", ");
    if (!track || !track.vtubers || track.vtubers.length === 0) return null;

    return (
      <p>{talentstr}</p>
    );
  };

  return (
  <div className="playcontrol-container container-bg">

    <div className="playcontrol-info-container">
      <div className="playcontrol-info-container--title">
        <h2>
          {tracks?.[currentTrack ?? 0]?.name ?? "Loading..."}
        </h2>
        {tracks?.[currentTrack ?? 0]?.source && 
        <a href={tracks?.[currentTrack ?? 0]?.source} target="_blank">
          <Icon src="img/icons/youtube.png" alt="source" size="sm" />
        </a> }
      </div>
      <div className="playcontrol-info-container--talents">
        {renderTalents()}
      </div>
    </div>

    <div className="playcontrol-buttons">
        <div className="left">
          <Icon src="img/icons/left.png" alt="prev" onClick={handlePrev} />
          {isPlaying ?
            <Icon src="img/icons/pause.png" alt="pause" onClick={handlePause} /> :
            <Icon src="img/icons/play.png" alt="play" onClick={handlePlay} />
          }
          <Icon src="img/icons/right.png" alt="next" onClick={handleNext} />
        </div>

        <div className="right">
          <Icon src={`img/icons/${playMode}.png`} alt={playMode} onClick={() => setPlayMode(nextPlayMode())} />
          <Icon src="img/icons/music-list.png" alt="music-list" onClick={handleShowPlayList} />
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
import { GrPrevious, GrNext } from "react-icons/gr";
import { LuRepeat, LuRepeat1 } from "react-icons/lu";
import { FaRegCirclePlay, FaRegCirclePause , FaShuffle} from "react-icons/fa6";
import { PlayMode } from "@/common/type";
import { IoMenuOutline } from "react-icons/io5";
import { useState } from "react";

import './playcontrol.scss';

interface Props {
  tracks: string[] | null,
  currentTrack: number | null,
  isPlaying: boolean,
  setPlayMode: (hookval: PlayMode) => void,
  volume: number,
  handleVolumeChange: (event:any) => void,
  handlePlay: () => void,
  handlePlayPrev: () => void,
  handlePause: () => void,
  handlePlayNext: () => void,
  playMode: PlayMode,
  handleShowPlayList: ()=> void,

}


export default function playControl({
  tracks,
  currentTrack,
  isPlaying,
  setPlayMode,
  volume,
  handleVolumeChange,
  handlePlay,
  handlePlayPrev,
  handlePause,
  handlePlayNext,
  playMode,
  handleShowPlayList
}: Props){





  return (
  <div className="playcontrol-container container-bg">

    <h2 className="playcontrol-music-title">{tracks![currentTrack!].slice(0,-4)}</h2>

    <div className="playcontrol-buttons">
    {/* {isPlaying ? <FaRegCirclePause className="btn" onClick={handlePause} /> : <FaRegCirclePlay className="btn" onClick={handlePlay} />} */}
      <div className="left">
        <img className="icon-button" onClick={handlePlayPrev} src="img/icons/left.png" alt="left"/>
        {/* <GrPrevious className=" icon-button" onClick={handlePlayPrev} /> */}
        {isPlaying ?
        <img className="icon-button" onClick={handlePause} src="img/icons/pause.png" alt="pause"/> :
        <img className="icon-button" onClick={handlePlay} src="img/icons/play.png" alt="play"/>}
        <img className="icon-button" onClick={handlePlayNext} src="img/icons/right.png" alt="right"/>
      </div>

      <div className="right">
        {playMode === "repeatOne" ?
        <img className="icon-button" onClick={() => setPlayMode("playAll")} src="img/icons/repeat-one.png" alt="repeat-one"/> :
        playMode === "playAll" ?
        <img className="icon-button" onClick={() => setPlayMode("shuffle")} src="img/icons/repeat.png" alt="repeat"/> :
        <img className="icon-button" onClick={() => setPlayMode("repeatOne")} src="img/icons/shuffle.png" alt="shuffle"/>}
        <img className="icon-button" onClick={handleShowPlayList} src="img/icons/music-list.png" alt="music-list" />
        {/* <IoMenuOutline className="icon-button" onClick={handleShowPlayList}/> */}
      </div>

    </div>

          
    <input
      className="slider "
      type="range"
      min="0"
      max="1"
      step="0.01"
      value={volume}
      onChange={handleVolumeChange}
      style={{
        background: `linear-gradient(to right, white ${volume * 100}%, grey ${volume * 100}%)`,
      }}
    />



  </div>
  );
}
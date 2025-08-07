import { GrPrevious, GrNext } from "react-icons/gr";
import { LuRepeat, LuRepeat1 } from "react-icons/lu";
import { FaRegCirclePlay, FaRegCirclePause , FaShuffle} from "react-icons/fa6";
import { PlayMode } from "@/common/type";

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
  playMode: PlayMode
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
  playMode
}: Props){

  

  return (
  <div className="playcontrol-container container-bg">

    <h2 className="playcontrol-music-title">{tracks![currentTrack!].slice(0,-4)}</h2>

    <div className="playcontrol-buttonsl">
    {/* {isPlaying ? <FaRegCirclePause className="btn" onClick={handlePause} /> : <FaRegCirclePlay className="btn" onClick={handlePlay} />} */}
      <div className="left">
        <GrPrevious className="btn" onClick={handlePlayPrev} />
        {isPlaying ? <FaRegCirclePause className="btn" onClick={handlePause} /> : <FaRegCirclePlay className="btn" onClick={handlePlay} />}
        <GrNext className="btn" onClick={handlePlayNext} />
      </div>

      <div className="right">
        {playMode === "repeatOne" ?
        <LuRepeat1 className="btn" onClick={() => setPlayMode("playAll")} /> :
        playMode === "playAll" ?
        <LuRepeat className="btn" onClick={() => setPlayMode("shuffle")} /> :
        <FaShuffle className="btn" onClick={() => setPlayMode("repeatOne")} />}
      </div>

    </div>

          
    <input
      className="playcontrol-slider "
      type="range"
      min="0"
      max="1"
      step="0.01"
      value={volume}
      onChange={handleVolumeChange}
    />



  </div>
  );
}
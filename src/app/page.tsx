"use client";



import { useEffect, useRef, useState } from "react";

import { FaRegCirclePlay, FaRegCirclePause , FaShuffle} from "react-icons/fa6";
import { GrPrevious, GrNext } from "react-icons/gr";
import { LuRepeat, LuRepeat1 } from "react-icons/lu";
import { IoMenuOutline } from "react-icons/io5";

import Playlist from "@/components/playlist";
import AmbientSound from "@/components/ambientSound";





export default function Home() {
  const [tracks, setTracks] = useState<string[] | null>(null); // original order
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTrack, setCurrentTrack] = useState<number | null>(null);
  // const [currentTime, setCurrentTime] = useState<number>(0);
  // const [duration, setDuration] = useState<number>(0);
  const [playMode, setPlayMode] = useState<'repeatOne' | 'playAll' | 'shuffle'>('playAll');
  const [showPlayList, setShowPlaylist] = useState<boolean>(false);
  const [volume, setVolume] = useState(1);

  const bgm = useRef<HTMLAudioElement>(null);

  const [sfxList, setSfxList] = useState<string[] | null>(null);

  const handlePlay = () => { if (bgm.current) { bgm.current.play(); setIsPlaying(true); } }
  const handlePause = () => { if (bgm.current) { bgm.current.pause(); setIsPlaying(false); } }
  // const handleTimeUpdate = () => {
  //   if (bgm.current) { setCurrentTime(bgm.current.currentTime); }
  // }
  // const handleDurationUpdate = () => {
  //   if (bgm.current) { setDuration(bgm.current.duration); }
  // }
  const handlePlayPrev = () => {
    if (bgm.current) {
      if (playMode === "shuffle") {
        const randomNumber = Math.floor(Math.random()*tracks!.length);
        setCurrentTrack(randomNumber);
      } else {
        setCurrentTrack(currentTrack => (currentTrack!-1+tracks!.length)%tracks!.length);
      }
      setIsPlaying(true);
    }
  }
  const handlePlayNext = () => {
    if (bgm.current) {
      if (playMode === "shuffle") {
        const randomNumber = Math.floor(Math.random()*tracks!.length);
        setCurrentTrack(randomNumber);
      } else {
        setCurrentTrack(currentTrack => currentTrack!+1%tracks!.length);
      }
      setIsPlaying(true);
    }
  }

  const handlePlaylistSongClick = (i:number) => {
    if (bgm.current) {
      setCurrentTrack(i);
      setIsPlaying(true);
    }
  }

  // const handleShufflePlay = () => {
  //   if (bgm.current) {
  //     const randomNumber = Math.floor(Math.random()*tracks!.length);
  //     setCurrentTrack(randomNumber);
  //     setCurrentTime(0);
  //     setIsPlaying(true);
  //   }
  // }

  const handleEnd = () => {
    if (bgm.current) {
      if (playMode === "repeatOne") {
        bgm.current.currentTime = 0;
        bgm.current.play();
        setIsPlaying(true);
      } else {
        handlePlayNext();
      }
    }
  }

  const handleVolumeChange = (event:any) => {
    if (bgm.current) {
      const newVolume = event.target.value;
      setVolume(newVolume);
      bgm.current.volume = newVolume;
    }
  }

  useEffect(() => {
    const trackInit = async () => {
      const response = await fetch('api/trackinit');
      const data = await response.json();
      setIsLoading(false);
      setTracks(data['message']);
      setCurrentTrack(0);
    }
    const sfxInit = async () => {
      const response = await fetch('api/sfxinit');
      const data = await response.json();
      setSfxList(data['message']);
    }
    trackInit();
    sfxInit();
  }, []);

  useEffect(() => {
    const handlePlayByKey = (e:any) => {
      if (e.key === ' ' && bgm.current) {
        if (isPlaying) {
          bgm.current.pause();
          setIsPlaying(false);
        } else {
          bgm.current.play();
          setIsPlaying(true);
        }
      }
    };
    window.addEventListener('keydown', handlePlayByKey);
    return () => {
      window.removeEventListener('keydown', handlePlayByKey);
    };
  }, [isPlaying]);

  return (
    <>
    {isLoading ? <div>loading...</div> :
    
    <div>
      
      <div>{sfxList?.map((sfx, i) => <AmbientSound key={i} name={sfx} /> )}</div>

      <audio
        ref={bgm}
        src={`bgm/${tracks![currentTrack!]}`}
        // onTimeUpdate={handleTimeUpdate}
        // onLoadedMetadata={handleDurationUpdate}
        onEnded={handleEnd}
        // controls
        autoPlay
      />
      
      <div>{tracks![currentTrack!].slice(0,-4)}</div>
      <div className="flex flex-row">
        <GrPrevious onClick={handlePlayPrev} />
        {isPlaying ? <FaRegCirclePause onClick={handlePause} /> : <FaRegCirclePlay onClick={handlePlay} />}
        <GrNext onClick={handlePlayNext} />

        <div>============</div>
        {playMode === "repeatOne" ?
        <LuRepeat1 onClick={() => setPlayMode("playAll")} /> :
        playMode === "playAll" ?
        <LuRepeat onClick={() => setPlayMode("shuffle")} /> :
        <FaShuffle onClick={() => setPlayMode("repeatOne")} />}

        {/* <FaShuffle className="ml-1" onClick={handleShufflePlay} /> */}
        <div>current mode: {playMode}</div>
      </div>

      <button>volume up</button>
      <button>volume down</button>

      <div>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
        />
        {/* <span>{Math.round(volume * 100)}%</span> */}
      </div>

      <div>
        <IoMenuOutline onClick={()=>setShowPlaylist(!showPlayList)}/>
        {showPlayList ?
        <Playlist
          tracks={tracks}
          handlePlaylistSongClick={handlePlaylistSongClick}
        /> : <></>}
      </div>

      {/* <ul>{tracks?.map((track, i) => <li key={i}>{track}</li>)}</ul> */}

    </div>}
    </>
  );
}
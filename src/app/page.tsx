"use client";



import { useEffect, useRef, useState } from "react";

import { FaRegCirclePlay, FaRegCirclePause , FaShuffle} from "react-icons/fa6";
import { GrPrevious, GrNext } from "react-icons/gr";
import { LuRepeat, LuRepeat1 } from "react-icons/lu";
import { IoMenuOutline } from "react-icons/io5";

import AmbientSound from "@/components/ambientSound";
import Playlist from "@/components/playlist";

export default function Home() {
  const [tracks, setTracks] = useState<string[] | null>(null); // original order
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTrack, setCurrentTrack] = useState<number | null>(null);
  const [playMode, setPlayMode] = useState<'repeatOne' | 'playAll' | 'shuffle'>('shuffle');
  const [showPlayList, setShowPlaylist] = useState<boolean>(false);
  const [volume, setVolume] = useState(1);

  const bgm = useRef<HTMLAudioElement>(null);
  const playlistElement = useRef<HTMLDivElement>(null);

  const [sfxList, setSfxList] = useState<string[] | null>(null);

  const handlePlay = () => { if (bgm.current) { bgm.current.play(); setIsPlaying(true); } }
  const handlePause = () => { if (bgm.current) { bgm.current.pause(); setIsPlaying(false); } }

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

  const handleShowPlayList = () => {
    setShowPlaylist(!showPlayList);
    if (playlistElement.current) {
      if (!showPlayList) { playlistElement.current.style.width = "100%"; }
      else { playlistElement.current.style.width = "0%"; }
    }
  }

  useEffect(() => {
    // fetch soundtracks and sound effects
    const trackInit = async () => {
      console.log("loading tracks...")
      const response = await fetch('api/trackinit');
      const data = await response.json();
      setIsLoading(false);
      setTracks(data['message']);
      // setCurrentTrack(0);

      // set random track on start
      const randomNumber = Math.floor(Math.random()*data['message']!.length);
      // console.log(randomNumber);
      setCurrentTrack(randomNumber);

      console.log("loading tracks done!")
    }
    const sfxInit = async () => {
      console.log("loading sound effects...")
      const response = await fetch('api/sfxinit');
      const data = await response.json();
      setSfxList(data['message']);
      console.log("loading sound effects done!")
    }
    trackInit();
    sfxInit();
  }, []);

  useEffect(() => {
    // event listeners for key press
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
    {isLoading ? <div className="loading-container"><p className="loading">loading...</p></div> :
    
    <div className="page">
      <div className="main-section">
        {/* <div className="left">
            <Playlist
            playlistElement={playlistElement}
            tracks={tracks}
            handlePlaylistSongClick={handlePlaylistSongClick}
            /> 
          <IoMenuOutline className="playlist-btn" onClick={handleShowPlayList}/>
        </div> */}
        <div className="mid container-bg">
          <div className="music-title">{tracks![currentTrack!].slice(0,-4)}</div>
          <div className="play-control">
          {isPlaying ? <FaRegCirclePause className="btn" onClick={handlePause} /> : <FaRegCirclePlay className="btn" onClick={handlePlay} />}
            {/* <div className="left">
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
            </div> */}
          </div>

          <div className="volume-control">
            <input
              className="slider"
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
            />
          </div>
        </div>

        <div className="right container-bg">
          {sfxList?.map((sfx, i) => <AmbientSound key={i} name={sfx} /> )}
        </div>
      </div>

      {/* other stuff */}
      <audio
        ref={bgm}
        src={`bgm/${tracks![currentTrack!]}`}
        onEnded={handleEnd}
        autoPlay
      />
      
    </div>}
    </>
  );
}
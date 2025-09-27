"use client";



import { useEffect, useRef, useState } from "react";



import AmbientSound from "@/features/ambientSound/ambientSound";
import Playlist from "@/features/playlist/playlist";
import PlayControl from "@/features/playControl/playControl";
import { PlayMode } from "@/common/type";
import Loading from "@/components/loading/loading";
import "./page.scss";

export default function Home() {
  const [tracks, setTracks] = useState<string[] | null>(null); // original order
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTrack, setCurrentTrack] = useState<number | null>(null);
  const [playMode, setPlayMode] = useState<PlayMode>('shuffle');
  const [volume, setVolume] = useState(1);
  const [showPlayList, setShowPlaylist] = useState<boolean>(false);

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



  const handleShowPlayList = () => {
    setShowPlaylist(!showPlayList);
    if (playlistElement.current) {
      if (!showPlayList) { playlistElement.current.style.width = "100%"; }
      else { playlistElement.current.style.width = "0%"; }
    }
  }

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
      if (e.key === 'Escape') {
        setShowPlaylist(false);
        if (playlistElement.current) {
          playlistElement.current.style.width = "0%";
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
    {isLoading ? <Loading />:
    
    <div className="page">
      <h1 className="hidden-text">Hololive Lo-fi Music Player</h1>

      {/* <div className="background">
        <Image
          src="/img/background.png"
          alt="background"
          fill
          priority
          style={{ objectFit: "cover" }}
        />
      </div> */}


      <div className="content">
        <Playlist
          playlistElement={playlistElement}
          tracks={tracks}
          handlePlaylistSongClick={handlePlaylistSongClick}
          currentTrack={currentTrack}
          handleShowPlayList={handleShowPlayList}
        />


        <PlayControl
          tracks={tracks}
          currentTrack={currentTrack}
          isPlaying={isPlaying}
          setPlayMode={setPlayMode}
          volume={volume}
          handleVolumeChange={handleVolumeChange}
          handlePlay={handlePlay}
          handlePlayPrev={handlePlayPrev}
          handlePause={handlePause}
          handlePlayNext={handlePlayNext}
          playMode={playMode}
          handleShowPlayList={handleShowPlayList}
        />

        <AmbientSound sfxList={sfxList}/>
      </div>
      

      {/* other stuff */}
      <audio
        ref={bgm}
        src={`bgm/${tracks![currentTrack!]}`}
        onEnded={handleEnd}
        autoPlay
        preload="none"
      />
    </div>}
    </>
  );
}
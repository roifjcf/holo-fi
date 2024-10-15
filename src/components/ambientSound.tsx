"use client";

import { AiOutlineSound, AiFillSound } from "react-icons/ai";
import { useRef, useState } from "react";

export default function AmbientSound(props: any) {
  const sfx = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState(1);

  const sfxShadow = useRef<HTMLAudioElement>(null); // to achieve seamless effect
  const [timeoutInfo, setTimeoutInfo] = useState<ReturnType<typeof setTimeout> | null>(null); // for sfxShadow

  const handleVolumeChange = (event:any) => {
    if (sfx.current) {
      const newVolume = event.target.value;
      setVolume(newVolume);
      sfx.current.volume = newVolume;
    }
  }

  const handleEndSfx = () => {
    if (sfx.current) {
      sfx.current.currentTime = 0;
      sfx.current.play();
      setIsPlaying(true);
    }
  }

  const handleEndSfxShadow = () => {
    if (sfxShadow.current) {
      sfxShadow.current.currentTime = 0;
      sfxShadow.current.play();
      setIsPlaying(true);
    }
  }

  const togglePlay = () => {
    if (timeoutInfo) {
      clearTimeout(timeoutInfo);
      setTimeoutInfo(null);
    }

    if (sfx.current && sfxShadow.current) {
      if (isPlaying) { // pause
        sfx.current.pause();
        sfx.current.currentTime = 0;
        sfxShadow.current.pause();
        sfxShadow.current.currentTime = 0;
        setIsPlaying(false);
      } else { // play
        sfx.current.play();
        setIsPlaying(true);
        let id = setTimeout(() => {
          sfxShadow.current!.play();
        }, 3000);
        setTimeoutInfo(id);
      }
    }
  }
    
  return(
    <div className="ambient-sound">
      <div className="sfx-cell">
        {/* <p className="sfx-title" >{props.name}</p> */}
        {isPlaying && <AiFillSound className="sfx-btn playing" onClick={togglePlay}/>}
        {!isPlaying && <AiOutlineSound className="sfx-btn" onClick={togglePlay}/>}
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
        />
      </div>
      <audio
        ref={sfx}
        src={`sfx/${props.name}`}
        onEnded={handleEndSfx}
      />
      <audio
        ref={sfxShadow}
        src={`sfx/${props.name}`}
        onEnded={handleEndSfxShadow}
      />
    </div>
  )
}
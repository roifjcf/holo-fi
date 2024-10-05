"use client";

import { useRef, useState } from "react";
export default function AmbientSound(props: any) {
  const sfx = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState(1);

  
  const handleVolumeChange = (event:any) => {
    if (sfx.current) {
      const newVolume = event.target.value;
      setVolume(newVolume);
      sfx.current.volume = newVolume;
    }
  }

  const handleEnd = () => {
    if (sfx.current) {
      sfx.current.currentTime = 0;
      sfx.current.play();
      setIsPlaying(true);
    }
  }

  const togglePlay = () => {
    if (sfx.current) {
      if (isPlaying) { sfx.current.pause(); setIsPlaying(false); }
      else { sfx.current.play(); setIsPlaying(true); }
    }
  }

  return(
    <div>
      <p onClick={togglePlay}>{props.name}</p>

      <audio
        ref={sfx}
        src={`sfx/${props.name}`}
        onEnded={handleEnd}
      />

      <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
        />
    </div>
  )
}
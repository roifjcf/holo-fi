import { AiOutlineSound, AiFillSound } from "react-icons/ai";
import { useRef, useState } from "react";

interface Props {
  name: string,
  key: number,
};


export default function sfxUnit({
  name,
  key
}: Props) {
  const sfx = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState(0.5);

  // const sfxShadow = useRef<HTMLAudioElement>(null); // to achieve seamless effect
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

  const togglePlay = () => {
    if (timeoutInfo) {
      clearTimeout(timeoutInfo);
      setTimeoutInfo(null);
    }

    if (sfx.current) {
      if (isPlaying) { // pause
        sfx.current.pause();
        sfx.current.currentTime = 0;
        setIsPlaying(false);
      } else { // play
        // setVolume(0.5);
        // sfx.current.volume = 0.5;
        sfx.current.play();
        setIsPlaying(true);
      }
    }
  }
    
  return(
    <div className="sfxunit-container">
      <img 
        className={`icon-button${isPlaying ? ' playing' : ''}`}
        onClick={togglePlay}
        src={`img/sfxicons/${name.slice(0, -4)}.png`}
        alt={`${name}.png`}
        draggable={false}
      />

      <input
        className="slider"
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

      
      <audio
        ref={sfx}
        src={`sfx/${name}`}
        onEnded={handleEndSfx}
      />

    </div>
  )
  
}

"use client";

import { usePlayer } from "@/contexts/playerContext";
import "./playlist.scss";

interface Props {
  playlistElement: React.RefObject<HTMLDivElement>;
  handleShowPlayList: () => void;
}

export default function Playlist({ playlistElement, handleShowPlayList }: Props) {
  const { tracks, currentTrack, handlePlaylistSongClick, handlePlayRemix, handlePlayOriginalEN } = usePlayer();

  if (!tracks) return <div className="playlist-container">Loading playlist...</div>;

  return (
    <div className="playlist-container">
      <div className="playlist-list container-bg" ref={playlistElement}>
        <img
          className="icon-button playlist-closebutton"
          onClick={handleShowPlayList}
          src="img/icons/left-1.png"
          alt="close playlist"
        />

        <div className="playlist-buttons">
          <button onClick={handlePlayRemix}>Remix</button>
          <button onClick={handlePlayOriginalEN}>Original</button>
        </div>
        
        {tracks.map((track, i) => (
          <p
            key={i}
            className={`playlist-track ${currentTrack === i ? "playlist-current" : ""}`}
            onClick={() => handlePlaylistSongClick(i)}
          >
            {track.name}
          </p>
        ))}
      </div>
    </div>
  );
}
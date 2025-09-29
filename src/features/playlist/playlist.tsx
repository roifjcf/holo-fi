"use client";

import { usePlayer } from "@/contexts/playerContext";
import "./playlist.scss";

interface Props {
  playlistElement: React.RefObject<HTMLDivElement>;
  handleShowPlayList: () => void;
}

export default function Playlist({ playlistElement, handleShowPlayList }: Props) {
  const { tracks, currentTrack, handlePlaylistSongClick } = usePlayer();

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

        {tracks.map((track, i) => (
          <p
            key={i}
            className={`playlist-track ${currentTrack === i ? "playlist-current" : ""}`}
            onClick={() => handlePlaylistSongClick(i)}
          >
            {track.slice(0, -4)}
          </p>
        ))}
      </div>
    </div>
  );
}
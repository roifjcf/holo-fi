import { useState } from "react";
import "./playlist.scss";

interface Props {
  playlistElement: React.RefObject<HTMLDivElement>,
  tracks: string[] | null,
  handlePlaylistSongClick: (trackNo: number) => void,
  currentTrack: number | null,
  handleShowPlayList: () => void,
}

export default function Playlist({
  playlistElement,
  tracks,
  handlePlaylistSongClick,
  currentTrack,
  handleShowPlayList
}: Props) {
  
  

  return(
    <div className="playlist-container">
      <div className="playlist-list container-bg" ref={playlistElement}>
        <img className="icon-button playlist-closebutton" onClick={handleShowPlayList} src="img/icons/left-1.png" alt="left-1" />
        {tracks?.map((track:any, i:any) =>
        <p className={`playlist-track ${currentTrack === i ? "playlist-current" : ""}`} key={i} onClick={() => handlePlaylistSongClick(i)}>{track}</p>)}
      </div>
    </div>
  )
}
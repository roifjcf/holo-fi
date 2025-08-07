import { useState } from "react";
import { IoMenuOutline } from "react-icons/io5";

interface Props {
  playlistElement: React.RefObject<HTMLDivElement>,
  tracks: string[] | null,
  handlePlaylistSongClick: (trackNo: number) => void,
}

export default function Playlist({
  playlistElement,
  tracks,
  handlePlaylistSongClick
}: Props) {
  const [showPlayList, setShowPlaylist] = useState<boolean>(false);
  
  const handleShowPlayList = () => {
    setShowPlaylist(!showPlayList);
    if (playlistElement.current) {
      if (!showPlayList) { playlistElement.current.style.width = "100%"; }
      else { playlistElement.current.style.width = "0%"; }
    }
  }


  return(
    <div className="playlist-container">
      <IoMenuOutline className="playlist-btn icon-button" onClick={handleShowPlayList}/>
      <div className="playlist-list container-bg" ref={playlistElement}>
        {tracks?.map((track:any, i:any) =>
        <div className="playlist-track" key={i} onClick={() => handlePlaylistSongClick(i)}>{track}</div>)}
      </div>
    </div>
  )
}
export default function Playlist(props: any) {
  return(
    <div className="playlist" ref={props.playlistElement}>
      {props.tracks.map((track:any, i:any) =>
      <div key={i} onClick={() => props.handlePlaylistSongClick(i)}>{track}</div>)}
    </div>
  )
}
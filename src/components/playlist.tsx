export default function Playlist(props: any) {
  return(
    <div>
      {props.tracks.map((track:any, i:any) =>
      <div key={i} onClick={() => props.handlePlaylistSongClick(i)}>{track}</div>)}
    </div>
  )
}
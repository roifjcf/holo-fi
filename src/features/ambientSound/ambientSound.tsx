import SfxUnit from "./components/sfxUnit";

interface Props {
  sfxList: string[] | null,
};


export default function AmbientSound({
  sfxList
}: Props) {
  return (
    <div className="container-bg">
      {sfxList?.map((sfx, i) => <SfxUnit key={i} name={sfx} /> )}
    </div>
  );
}
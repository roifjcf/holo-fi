// get the list of songs from the public folder

import fs from 'fs';
import path from 'path';

import { NextResponse } from 'next/server';

export async function GET() {
  const resourcePath = path.join(process.cwd(), 'public/bgm');
  const tracks = fs.readdirSync(resourcePath);
  // return NextResponse.json({ message: 'Hello from Next.js!' });
  // console.log(tracks);
  return NextResponse.json({ message: tracks });
}

// export default function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<ResponseData>
// ) {
//   // const resourcePath = path.join(process.cwd(), 'public/bgm');
//   // const tracks = fs.readdirSync(resourcePath);
//   res.status(200).json({ message: 'Hello from Next.js!' })
// }
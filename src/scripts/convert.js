// 

/**
 * csv track files to json
 * the output will be inside public/trackinfo
 */
import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";

function toRawUrl(url) {
  return url.replace("github.com", "raw.githubusercontent.com")
            .replace("/blob/", "/");
}


function parseVtubersField(str) {
  if (!str) return [];
  return str
    .replace(/^"|"$/g, "")
    .split(/[,;]+/)
    .map(v => v.trim().replace(/^"|"$/g, ""))
}

function csvToJson(inputFile, outputFile) {
  const csv = fs.readFileSync(inputFile, "utf-8");
  const records = parse(csv, { columns: true, skip_empty_lines: true });

  const json = records.map(track => ({
    name: track.name,
    url: track.url ? toRawUrl(track.url) : "",
    source: track.source,
    vtubers: parseVtubersField(track.vtubers),
    release: track.release || "",
  }));

  fs.writeFileSync(outputFile, JSON.stringify(json, null, 2));
  console.log(`Generated ${outputFile} with ${json.length} tracks.`);
}





csvToJson(
  path.join(process.cwd(), "tracks-original-en.csv"),
  path.join(process.cwd(), "public/trackinfo", "tracks-original-en.json")
);

csvToJson(
  path.join(process.cwd(), "tracks-remix.csv"),
  path.join(process.cwd(), "public/trackinfo", "tracks-remix.json")
);
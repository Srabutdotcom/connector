import { fromFileUrl } from "https://deno.land/std/path/mod.ts";
const { version } = JSON.parse(await Deno.readTextFile("deno.json"));

const dir = new URL("./", import.meta.url);

for await (const entry of Deno.readDir(dir)) {
  if (entry.isFile && entry.name.endsWith(".d.ts")) {
    const path = `${dir}${entry.name}`;
    const filestr = await Deno.readTextFile(fromFileUrl(path));
    const updated = filestr.replaceAll(
      /(@version\s+)(?:[\d.]+|__VERSION__)/g,
      `$1${version}`,
    );
    await Deno.writeTextFile(fromFileUrl(path), updated);
    console.log(`Updated version in ${path}`);
  }
}


const { version } = JSON.parse(await Deno.readTextFile("deno.json"));

const files = [
   "./denoconnector.d.ts",
   "./nodeconnector.d.ts"
]

for (const file of files) {
   const filePath = new URL(file, import.meta.url)
   const filestr = await Deno.readTextFile(filePath);
   const updated = filestr.replace(
      /(@version\s+)(?:[\d.]+|__VERSION__)/g,
      `$1${version}`);
   await Deno.writeTextFile(filePath, updated);
}


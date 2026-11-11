const { copyFileSync, mkdirSync } = require("node:fs");
const path = require("node:path");

const sourceDirectory = path.join(__dirname, "../src/frontend");
const outputDirectory = path.join(__dirname, "../dist/frontend");

mkdirSync(outputDirectory, { recursive: true });

for (const filename of ["index.html", "style.css"]) {
  copyFileSync(path.join(sourceDirectory, filename), path.join(outputDirectory, filename));
}

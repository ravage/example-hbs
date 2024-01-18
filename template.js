import Handlebars from "handlebars";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const templatesPath = path.resolve(__dirname, "templates");
const partialsPath = path.resolve(__dirname, "partials");

const templates = await fs.readdir(templatesPath);
const partials = await fs.readdir(partialsPath);

const templateMap = {};

for (const partial of partials) {
  const buff = await fs.readFile(path.join(partialsPath, partial), {
    encoding: "utf8",
  });
  Handlebars.registerPartial(
    path.parse(partial).name,
    Handlebars.compile(buff),
  );
}

for (const template of templates) {
  const buff = await fs.readFile(path.join(templatesPath, template), {
    encoding: "utf8",
  });
  templateMap[path.parse(template).name] = Handlebars.compile(buff);
}

export function render(template, data = {}) {
  return templateMap[template](data);
}

import { render } from "./template.js";
import fs from "node:fs/promises";

// render with props
// render("pro-user", { name: "rvz" });

// render with no props
fs.writeFile("output.html", render("pro-user"))
  .then(() => console.log("output.html written"))
  .catch((error) => console.log(error));

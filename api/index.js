import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const malePath = path.join(process.cwd(), "public", "male");
  const femalePath = path.join(process.cwd(), "public", "female");

  const maleFiles = fs.readdirSync(malePath);
  const femaleFiles = fs.readdirSync(femalePath);

  const allFiles = [
    ...maleFiles.map(f => `/male/${f}`),
    ...femaleFiles.map(f => `/female/${f}`)
  ];

  if (allFiles.length === 0) {
    return res.status(500).json({ error: "No images found" });
  }

  const randomFile = allFiles[Math.floor(Math.random() * allFiles.length)];

  res.redirect(randomFile);
}

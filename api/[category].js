import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const category = req.query.category;

  if (!["male", "female"].includes(category)) {
    return res.status(404).json({ error: "Invalid category" });
  }

  const folderPath = path.join(process.cwd(), "public", category);
  const files = fs.readdirSync(folderPath);

  if (files.length === 0) {
    return res.status(500).json({ error: "No images found in this category" });
  }

  const randomFile = files[Math.floor(Math.random() * files.length)];

  res.redirect(`/${category}/${randomFile}`);
}

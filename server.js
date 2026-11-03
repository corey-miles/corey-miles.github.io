const express = require("express");
const multer = require("multer");
const cors = require("cors");

const path = require("path");
const app = express();
const PORT = 3000;

const { Buffer } = require("buffer");

app.use(cors()); // Allow cross-origin requests from frontend

const upload = multer({ storage: multer.memoryStorage() });

// Route to receive and process file data
app.post("/process-file", upload.single("file"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const fileBuffer = Buffer.from(req.file.buffer);

    res.json({
      filename: req.file.originalname,
      size: req.file.size,
      content: fileBuffer.toString("hex"),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Serve all static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

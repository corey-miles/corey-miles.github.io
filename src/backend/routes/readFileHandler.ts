import { Buffer } from "node:buffer";
import { Router } from "express";
import multer from "multer";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.single("file"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const fileBuffer = Buffer.from(req.file.buffer);

    return res.json({
      filename: req.file.originalname,
      size: req.file.size,
      content: fileBuffer.toString("hex"),
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return res.status(500).json({ error: message });
  }
});

export default router;

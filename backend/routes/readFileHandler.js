const express = require('express');
const router = express.Router();

// POST handler to read file
router.post('/readFile', upload.single('file'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        const fileBuffer = Buffer.from(req.file.buffer);

        res.json({
            fileName: req.file.originalname,
            size: req.file.size,
            content: fileBuffer.toString("hex"),
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
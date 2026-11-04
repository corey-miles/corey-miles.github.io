const express = require("express");
const cors = require("cors");
const readFileRouter = require('./backend/routes/readFileHandler');

const path = require("path");
const app = express();
const PORT = 3000;

app.use(cors()); // Allow cross-origin requests from frontend
app.use(express.json()); // Middleware to parse JSON bodies

app.use('/readFile', readFileRouter); // Reads file as hex

// Serve all static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

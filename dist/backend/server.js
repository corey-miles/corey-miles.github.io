"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const node_path_1 = __importDefault(require("node:path"));
const readFileHandler_1 = __importDefault(require("./routes/readFileHandler"));
const app = (0, express_1.default)();
const port = Number(process.env.PORT) || 3000;
const frontendDirectory = node_path_1.default.join(__dirname, "../frontend");
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/readFile", readFileHandler_1.default);
app.use(express_1.default.static(frontendDirectory));
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

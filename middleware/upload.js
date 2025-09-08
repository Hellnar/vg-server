import multer from "multer";
import path from "path";
import fs from "fs"
// import { fileURLToPath } from 'url';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const dir = path.join(__dirname, "../tmp/uploads");

// if(!fs.existsSync(dir)) fs.mkdirSync(dir);

const isRender = process.env.RENDER === "true";
const baseTmpDir = isRender ? "/tmp" : path.join(process.cwd(), "tmp");
const uploadDir = path.join(baseTmpDir, "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}


const storage = multer.diskStorage({
    destination: (req, file, cb) => {cb(null, uploadDir)},
    filename: (req, file, cb) => {cb(null, file.originalname)},
})

const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 50,
    },
});

export default upload;
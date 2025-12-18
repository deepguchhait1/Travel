import multer from 'multer';
import fs from 'fs';
import path from 'path';

const uploadDir = path.resolve(process.cwd(), 'uploads');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		if (!fs.existsSync(uploadDir)) {
			fs.mkdirSync(uploadDir, { recursive: true });
		}
		cb(null, uploadDir);
	},
	filename: function (req, file, cb) {
		const safeName = file.originalname.replace(/[^a-zA-Z0-9_.-]/g, '_');
		cb(null, `${Date.now()}-${safeName}`);
	}
});

const upload = multer({ storage });

export default upload;
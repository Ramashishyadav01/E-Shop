const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(process.cwd(), 'images');
    // CREATE folder if it doesn't exist
    if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${uuidv4()}${ext}`);
  },
});

// ADD file filter to only allow images
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Only .jpeg, .jpg, .png, .webp files are allowed'), false);
    }
};

const upload = multer({ 
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

const constructImageUrl = (imageName) => {
  if (!imageName) return null;
  if (typeof imageName === 'string' && (imageName.startsWith('data:') || imageName.startsWith('http://') || imageName.startsWith('https://'))) {
    return imageName;
  }
  const base = process.env.IMAGE_BASE_URL || 'https://e-shop-4fgk.onrender.com/images';
  const cleanImg = String(imageName).replace(/^\/+/, '');
  return base.endsWith('/') ? `${base}${cleanImg}` : `${base}/${cleanImg}`;
};

module.exports = { upload, constructImageUrl };

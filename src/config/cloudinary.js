const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');


cloudinary.config({
     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const productStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'products',
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
    format: async (req, file) => 'png',
  },
});

const profileStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'profiles',
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
    format: async (req, file) => 'png',
  },
});

module.exports = { productStorage, profileStorage,cloudinary };
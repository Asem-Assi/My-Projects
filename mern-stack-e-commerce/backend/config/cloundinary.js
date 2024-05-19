// config/cloudinaryConfig.js
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary with your cloud name, API key, and API secret
cloudinary.config({
    cloud_name: 'dij7xlyqi',
    api_key: '698568454976124',
    api_secret: 'TD58Iv7vh3ggNVeJhoH7_4C8h3g'
});

module.exports = cloudinary;

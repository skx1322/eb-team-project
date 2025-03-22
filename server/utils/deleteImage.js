import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_API_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});

const imageDeleteCall = async (imageURL) => {
    try {
        await cloudinary.uploader.destroy(imageURL, {type: "authenticated"});

        console.log(`Image ${imageURL} has been deleted successfully`)
    } catch (error) {
        console.log(`Image ${imageURL} deletion encountered an error: `, error)
    }
};

export default imageDeleteCall;
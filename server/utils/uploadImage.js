import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_API_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});

const imageUploadCall = async (image) => {
  const buffer = image?.buffer || Buffer.from(await image.arrayBuffer());
  try {
    const uploadImage = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "eb-project" }, (error, uploadResult) => {
          return resolve(uploadResult);
        })
        .end(buffer);
    });
    return uploadImage;
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
  }
};

export default imageUploadCall;

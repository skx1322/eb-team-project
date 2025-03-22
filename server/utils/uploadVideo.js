import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_API_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});

const videoUploadCall = async (file, type = "auto") => {
  try {
    const buffer = file?.buffer || Buffer.from(await file.arrayBuffer());

    const uploadOptions = {
      folder: "eb-project",
      resource_type: type, 
    };

    const uploadFile = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(uploadOptions, (error, uploadResult) => {
          if (error) return reject(error);
          resolve(uploadResult);
        })
        .end(buffer);
    });

    return uploadFile;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw error;
  }
};

export default videoUploadCall;

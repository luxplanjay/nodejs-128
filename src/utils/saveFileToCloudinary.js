import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  secure: true,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// userA > sticker.jpeg > avatar_123.jpeg
// userB > sticker.jpeg > avatar_456.jpeg
// userB > photo.jpeg > avatar_456.jpeg

export async function saveFileToCloudinary(buffer, userId) {
  const options = {
    folder: "students-app/avatars",
    public_id: `avatar_${userId}`,
    resource_type: "image",
    overwrite: true,
    transformation: {
      width: 512,
      height: 512,
      crop: "fill",
      gravity: "auto",
      quality: "auto",
    },
  };

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      options,
      (error, result) => {
        if (error) {
          // все погано
          return reject(error);
        }
        // все добре
        resolve(result);
      },
    );
    uploadStream.end(buffer);
  });
}

import { User } from "../models/user.js";
import { saveFileToCloudinary } from "../utils/saveFileToCloudinary.js";

export const updateUserAvatar = async (req, res) => {
  const result = await saveFileToCloudinary(req.file.buffer, req.user._id);

  const updatedUser = await User.findOneAndUpdate(
    { _id: req.user._id },
    { avatar: result.secure_url },
    { returnDocument: "after" },
  );

  res.status(200).json({ url: updatedUser.avatar });
};

import User from "../models/user.model";

export default function saveUserSecretId(chatId, secretId) {
  try {
    const user = await User.findOneAndUpdate(
      { chatId: chatId },
      { $set: { secretId: secretId } }
    );
  } catch (error) {
    console.log(error);
  }
}

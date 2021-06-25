import User from "../models/user.model";

export default async function saveUserSecretId(chatId, secretId) {
  try {
    await User.findOneAndUpdate(
      { chatId: chatId },
      { $set: { secretId: secretId } }
    );
  } catch (error) {
    console.log(error);
  }
}

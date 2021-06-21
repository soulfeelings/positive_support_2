import bcrypt from 'bcrypt'
 
export const linkgenerator = async (chatID) => {
  const hashedID1 = await bcrypt.hash(chatID, 1)
  const hashedId = hashedID1.replace(/[^a-zA-Z0-9]+/gm, '')
  return (hashedId);
}

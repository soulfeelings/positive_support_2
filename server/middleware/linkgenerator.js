import bcrypt from 'bcrypt'
 
export const linkgenerator = async (chatID) => {
  const hashedID1 = await bcrypt.hash(chatID, 1)
  const hashedId = hashedID1.replace(/\//gm, '')
  return (hashedId);
}

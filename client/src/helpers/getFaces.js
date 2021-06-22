import axios from "axios"

export const getFaces = async () => {
  const faces = []
  for (let i = 0; i < 10; i++) {
    const res = await axios.get("https://randomuser.me/api/")
    await faces.push(res.data.results[0].picture.thumbnail)
  }
  return faces;
}

import { ID, storage } from "@/appwrite";

const uploadImage = async (file: File) => {
  if (!file) return;

  return await storage.createFile("65124f88e3afdd8bbfae", ID.unique(), file);
};

export default uploadImage;

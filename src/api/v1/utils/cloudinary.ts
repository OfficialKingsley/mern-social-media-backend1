import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

const cloud_name = process.env.CLOUDINARY_CLOUD_NAME!;
const api_key = process.env.CLOUDINARY_API_KEY!;
const api_secret = process.env.CLOUDINARY_API_SECRET!;

console.log(cloud_name, api_key);
cloudinary.config({
  cloud_name,
  api_key,
  api_secret,
});
// CLOUDINARY_API_SECRET = "r0h4f0Jzfs3cnfItCDUQjGUgehM";
// CLOUDINARY_API_KEY = "612359256516263";
// CLOUDINARY_CLOUD_NAME = "dqltnm2ba";

export default cloudinary;

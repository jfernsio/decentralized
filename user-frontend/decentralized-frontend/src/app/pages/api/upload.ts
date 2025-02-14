//would be proxy server 

// import { CLOUDINARY_NAME } from "@/utils";
// import type { NextApiRequest, NextApiResponse } from "next";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ error: "Method Not Allowed" });
//   }

//   try {
//     const formData = new FormData();

//     // Ensure `req.body` is properly parsed
//     const { file, api_key, upload_preset } = req.body;

//     if (!file) {
//       return res.status(400).json({ error: "File is required" });
//     }

//     formData.append("file", file);
//     formData.append("api_key", api_key);
//     formData.append("upload_preset", upload_preset);

//     const cloudinaryResponse = await fetch(
//       `https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/image/upload`,
//       {
//         method: "POST",
//         body: formData,
//       }
//     );

//     if (!cloudinaryResponse.ok) {
//       throw new Error("Cloudinary upload failed");
//     }

//     const cloudinaryData = await cloudinaryResponse.json();
//     return res.status(200).json(cloudinaryData);
//   } catch (error) {
//     console.error("Cloudinary Upload Error:", error);
//     return res.status(500).json({ error: (error as Error).message });
//   }
// }

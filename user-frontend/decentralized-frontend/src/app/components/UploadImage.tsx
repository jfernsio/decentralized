"use client";
import { CLOUDINARY_NAME, CLOUDINARY_URL } from "@/utils";
import { useState } from "react";

export const UploadImage = ({ onImageAdded, image }:{
  onImageAdded: (image: string) => void;
  image?: string;
}) => {
  const [uploading, setUploading] = useState(false);

  async function onFileSelect(e:any) {
    setUploading(true);
    try {
      const file = e.target.files[0];

      const response = await fetch("http://localhost:8000/api/get/signature", {
        headers: {
          Authorization: localStorage.getItem("token") || undefined,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch pre-signed URL");
      }

      const preSignedUrl = await response.json();
      console.log("Pre-signed URL:", preSignedUrl);

      const { signature, timestamp, expiration, folder, api_key } =
        preSignedUrl.data;

      //check if da signature is expird
      const currentTime = Math.round(Date.now() / 1000);
      if (currentTime > expiration) {
        throw new Error("Signature expired");
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", api_key);
      formData.append("timestamp", timestamp);
      formData.append("signature", signature);
      formData.append("folder", folder);
      // formData.append("upload_preset", "decentralized");

      const uploadToCloudinary = await fetch(
        `${CLOUDINARY_URL}/${CLOUDINARY_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!uploadToCloudinary.ok) {
        throw new Error("Failed to upload image");
      }
      console.log("Upload successful:", uploadToCloudinary);
      const result = await uploadToCloudinary.json();
      console.log(result)
      onImageAdded(result.secure_url)

    } catch (error) {
      console.error("Error fetching pre-signed URL:", error);
    } finally {
      setUploading(false);
    }
  }
  if (image) {
    return <img className={"p-2 w-96 rounded"} src={image} />
  }
  return (
    <div>
      <div className="w-40 h-40 rounded border text-2xl cursor-pointer">
        <div className="h-full flex justify-center flex-col relative w-full">
          <div className="h-full flex justify-center w-full pt-16 text-4xl">
            {uploading ? <span className="text-sm">Uploading...</span> : "+"}
            <input
              type="file"
              style={{
                position: "absolute",
                opacity: 0,
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                width: "100%",
                height: "100%",
              }}
              onChange={onFileSelect}
            />
          </div>
        </div>
      </div>
    </div>
  );
};



// import { useState } from "react";

// interface UploadImageProps {
//   onImageAdded: (imageUrl: string) => void;
//   image?: string;
// }

// export const UploadImage: React.FC<UploadImageProps> = ({ onImageAdded, image }) => {
//   const [uploading, setUploading] = useState<boolean>(false);

//   async function onFileSelect(e) {
//     const file = e.target.files[0];
//     console.log(file)
//     if (!file) return;

//     setUploading(true);
//     try {
//       const response = await fetch("/pages/api/upload", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           file,
//           api_key: "836836797318566",
//           upload_preset: "decentralized",
//         }),
//       });

//       if (!response.ok) {
//         throw new Error("Upload failed");
//       }

//       const result = await response.json();
//       console.log("Upload success:", result);

//       onImageAdded(result.secure_url); // Send the uploaded image URL to parent
//     } catch (error) {
//       console.error("Upload error:", error);
//     } finally {
//       setUploading(false);
//     }
//   }

//   return (
//     <div>
//       <div className="w-40 h-40 rounded border text-2xl cursor-pointer">
//         <div className="h-full flex justify-center flex-col relative w-full">
//           <div className="h-full flex justify-center w-full pt-16 text-4xl">
//             {uploading ? <span className="text-sm">Uploading...</span> : "+"}
//             <input
//               type="file"
//               accept="image/*"
//               style={{
//                 position: "absolute",
//                 opacity: 0,
//                 top: 0,
//                 left: 0,
//                 bottom: 0,
//                 right: 0,
//                 width: "100%",
//                 height: "100%",
//               }}
//               onChange={onFileSelect}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };


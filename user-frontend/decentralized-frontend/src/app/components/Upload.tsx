"use client";
import { useState } from "react";
import { UploadImage } from "./UploadImage";

export const Upload = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [images, setImages] = useState<string[]>([]);
  return (
    <div className="flex justify-center">
      <div className="max-w-screen-lg w-full">
        <div className="text-2xl text-left pt-20 w-full pl-4">
          Create a task
        </div>

        <label className="pl-4 block mt-2 text-md font-medium text-gray-900 text-black">
          Task details
        </label>

        <input
          onChange={(e) => {
            // setTitle(e.target.value);
            console.log(e.target.value)
          }}
          type="text"
          id="first_name"
          className="ml-4 mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="What is your task?"
          required
        />

        <label className="pl-4 block mt-8 text-md font-medium text-gray-900 text-black">
          Add Images
        </label>
        <div className="flex justify-center pt-4 max-w-screen-lg">
          {images.map(image => <UploadImage image={image} onImageAdded={(imageUrl) => {
                    setImages(i => [...i, imageUrl]);
                }} />)}
        </div>

        <div className="ml-4 pt-2 flex justify-center">
         <UploadImage onImageAdded={(imageUrl) =>{
          setImages(i => [...i,imageUrl])
         }} />
        </div>

        <div className="flex justify-center">
         
          <button
            onClick={() => {
              setIsSubmitted(true);
              alert("submitted");
            }}
            type="button"
            className="mt-4 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            {isSubmitted ? "Submit Task" : "Pay 0.1 SOL"}
          </button>
        </div>
      </div>
    </div>
  );
};

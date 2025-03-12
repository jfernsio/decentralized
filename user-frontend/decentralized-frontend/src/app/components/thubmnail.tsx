"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import { Plus } from "lucide-react"

export function ThumbnailUpload() {
  const [preview, setPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Here you would typically upload to S3 and get a URL back
      // For this example, we'll use a local object URL
      const objectUrl = URL.createObjectURL(file)
      setPreview(objectUrl)

      // Simulated S3 upload
      console.log("Uploading to S3:", file.name)
      // The actual S3 upload logic would go here
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  return (
    <div
      className="relative aspect-video bg-white/5 rounded-lg overflow-hidden cursor-pointer hover:bg-white/10 transition-colors"
      onClick={triggerFileInput}
    >
      <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
      {preview ? (
        <Image src={preview || "/placeholder.svg"} alt="Thumbnail preview" fill className="object-cover" />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <Plus className="w-8 h-8 text-gray-400" />
        </div>
      )}
    </div>
  )
}


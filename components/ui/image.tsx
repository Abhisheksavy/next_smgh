"use client"

import React, { use, useEffect, useRef, useState } from "react";
import { X } from "lucide-react"; // lightweight icon (lucide-react)

interface ImageInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  label: string;
  name: string;
  onFileChange?: (file: File | null) => void;
  previewUrl?: File | string;
}

const ImageInput: React.FC<ImageInputProps> = ({
  label,
  name,
  onFileChange,
  previewUrl,
  ...rest
}) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState("");

  // upload handler
  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0] || null;
  //   if (file) {
  //     setPreview(URL.createObjectURL(file));
  //     onFileChange(file);
  //   }
  // };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setPreview(URL.createObjectURL(file));
      onFileChange(file);
    }
  };

  // delete / reset handler
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation(); // prevent re-triggering file input
    setPreview("");
    if (fileRef.current) fileRef.current.value = ""; // reset the input itself
    onFileChange(null);
  };

  useEffect(() => {
    if (previewUrl) {
      setPreview(
        previewUrl && typeof previewUrl !== "string"
          ? URL.createObjectURL(previewUrl)
          : previewUrl
      );
    }
  }, [previewUrl]);

  return (
    <div className="space-y-2">
      <label className="block text-gray-600 font-medium">{label}</label>

      <div
        className={`relative border border-gray-300 rounded-lg p-3 flex items-center justify-center cursor-pointer transition ${
          preview ? "cursor-default" : "hover:bg-gray-50"
        }`}
        onClick={() => {
          if (!preview) fileRef.current?.click();
        }}
      >
        {preview ? (
          <div className="relative">
            <img
              src={preview}
              alt={name}
              className="w-40 h-40 object-cover rounded-md border border-secondary-400 shadow-sm"
            />
            <button
              type="button"
              onClick={handleDelete}
              className="absolute top-1 right-1 bg-white/90 hover:bg-red-500 hover:text-white rounded-full p-1 shadow-md"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <span className="text-gray-400">Click to upload</span>
        )}
      </div>

      <input
        {...rest}
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        name={name}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default ImageInput;

"use client";

import React, { useEffect, useRef, useState } from "react";
import { CloudUpload, Upload, X, FileText } from "lucide-react";
import { cn } from "@/utils/twMerge";

interface ImageInputProps
     extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
     label?: string;
     name: string;
     onFileChange?: (file: File | null) => void;
     previewUrl?: File | string;
     text?: string;
     className?: string;
     acceptedTypes: string;
     inline?: boolean;
     disableImagePreview?: boolean;
}

const ImageInput: React.FC<ImageInputProps> = ({
     label,
     name,
     acceptedTypes,
     onFileChange,
     previewUrl,
     text,
     className,
     inline,
     disableImagePreview = false,
     ...rest

}) => {
     const fileRef = useRef<HTMLInputElement>(null);
     const [preview, setPreview] = useState("");
     const [fileName, setFileName] = useState("");
     const [mounted, setMounted] = useState(false);

     useEffect(() => {
          setMounted(true); // ensure client-side render only
     }, []);

     const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const file = e.target.files?.[0] || null;
          if (file) {
               const isImage = file.type.startsWith("image/");
               setFileName(file.name);
               if (mounted && isImage && !disableImagePreview) {
                    setPreview(URL.createObjectURL(file));
               }
               if (onFileChange) onFileChange(file);
          }
     };

     const handleDelete = (e: React.MouseEvent) => {
          e.stopPropagation();
          setPreview("");
          setFileName("");
          if (fileRef.current) fileRef.current.value = "";
          if (onFileChange) onFileChange(null);
     };

     useEffect(() => {
          if (mounted && previewUrl) {
               setPreview(
                    previewUrl && typeof previewUrl !== "string"
                         ? URL.createObjectURL(previewUrl)
                         : previewUrl
               );
          }
     }, [previewUrl, mounted]);

     if (!mounted) return null; // prevent mismatch on initial SSR

     return (
          <div className="space-y-2">
               {label && <label className="block text-gray-600 font-medium">{label}</label>}
               <div
                    className={cn(
                         "relative border border-gray-300 rounded-lg p-3 flex items-center justify-center cursor-pointer transition",
                         preview || fileName ? "cursor-default" : "hover:bg-gray-50",
                         className
                    )}
                    onClick={() => {
                         if (!preview && !fileName) fileRef.current?.click();
                    }}
               >
                    {preview && !disableImagePreview ? (
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
                    ) : fileName ? (
                         <div className="flex items-center justify-center gap-2 bg-gray-50 px-3 py-2 rounded-md border border-gray-200">
                              <FileText className="text-gray-500" size={18} />
                              <span className="text-sm text-gray-700 truncate max-w-full">{fileName}</span>
                              <button
                                   type="button"
                                   onClick={handleDelete}
                                   className="ml-2 text-red-500 hover:text-red-600"
                              >
                                   <X size={16} />
                              </button>
                         </div>
                    ) : (
                         <span className={cn("text-gray-400", inline !== true ? "flex flex-col justify-center items-center " : " ")}>
                              {inline !== true ?
                                   <>
                                        <span className="mb-4"> <Upload size={36} className="text-primary text-4xl" /></span>
                                        <span className="text-black/40"> {text}</span>
                                   </>
                                   :
                                   <span className="flex justify-center items-center gap-2.5">
                                        <CloudUpload size={24} /> <span>{text}</span>
                                   </span>
                              }
                         </span>
                    )}
               </div>

               <input
                    {...rest}
                    ref={fileRef}
                    type="file"
                    accept={acceptedTypes}
                    className="hidden"
                    name={name}
                    onChange={handleFileChange}
               />
          </div>
     );
};

export default ImageInput;

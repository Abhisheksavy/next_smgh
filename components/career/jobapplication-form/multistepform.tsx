"use client";
import { useState } from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import ImageInput from "@/components/ui/image";
import { ArrowLeft, ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FieldConfig {
     label: string;
     placeholder: string;
     required: boolean;
     options?: Array<{ label: string; value: string }>;
     acceptedFileTypes?: string[];
}

interface StepConfig {
     heading: string;
     [key: string]: any;
}

interface FormConfig {
     formDetails: {
          redirectionCta?: {
               label: string;
               href: string;
               target: string;
          };
          [key: string]: StepConfig | any;
     };
}

export default function MultiStepForm({ config }: { config: FormConfig }) {
     // Extract all steps from config

     const steps = Object.keys(config.formDetails)
          .filter((k) => k.startsWith("step"))
          .sort((a, b) => {
               const numA = parseInt(a.replace("step", ""));
               const numB = parseInt(b.replace("step", ""));
               return numA - numB;
          })
          .map((key) => ({
               key,
               ...config.formDetails[key],
          }));

     const [stepIndex, setStepIndex] = useState(0);
     const totalSteps = steps.length;

     // Get redirection CTA
     const redirectionCta = config.formDetails.redirectionCta;

     // Build dynamic Zod schema based on required fields
     const buildSchema = () => {
          const schemaFields: Record<string, z.ZodTypeAny> = {};

          steps.forEach((step) => {
               Object.entries(step)
                    .filter(([k]) => k !== "heading" && k !== "key")
                    .forEach(([fieldKey, field]: [string, any]) => {
                         if (field.required) {
                              // For CV upload - validate file type and size
                              if (
                                   fieldKey.toLowerCase().includes("cv") ||
                                   fieldKey.toLowerCase().includes("resume")
                              ) {
                                   schemaFields[fieldKey] = z
                                        .any()
                                        .refine((val) => val != null && val !== "", {
                                             message: `${field.label} is required`,
                                        })
                                        .refine(
                                             (file) => {
                                                  if (file instanceof File) {
                                                       return file.size <= 10 * 1024 * 1024; // 10MB
                                                  }
                                                  return true;
                                             },
                                             { message: "File size must be less than 10MB" }
                                        )
                                        .refine(
                                             (file) => {
                                                  if (file instanceof File) {
                                                       const allowedTypes = [
                                                            "application/pdf",
                                                            "application/msword",
                                                            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                                                       ];
                                                       return allowedTypes.includes(file.type);
                                                  }
                                                  return true;
                                             },
                                             {
                                                  message: "Only PDF, DOC, and DOCX files are allowed for CV",
                                             }
                                        );
                              }
                              // For passport photo - validate image type
                              else if (
                                   fieldKey.toLowerCase().includes("photo") ||
                                   fieldKey.toLowerCase().includes("picture") ||
                                   fieldKey.toLowerCase().includes("passport")
                              ) {
                                   schemaFields[fieldKey] = z
                                        .any()
                                        .refine((val) => val != null && val !== "", {
                                             message: `${field.label} is required`,
                                        })
                                        .refine(
                                             (file) => {
                                                  if (file instanceof File) {
                                                       return file.size <= 5 * 1024 * 1024; // 5MB
                                                  }
                                                  return true;
                                             },
                                             { message: "Image size must be less than 5MB" }
                                        )
                                        .refine(
                                             (file) => {
                                                  if (file instanceof File) {
                                                       const allowedTypes = [
                                                            "image/jpeg",
                                                            "image/jpg",
                                                            "image/png",
                                                       ];
                                                       return allowedTypes.includes(file.type);
                                                  }
                                                  return true;
                                             },
                                             {
                                                  message:
                                                       "Only JPEG, JPG, and PNG images are allowed for passport photo",
                                             }
                                        );
                              }
                              // For email fields
                              else if (fieldKey.toLowerCase().includes("email")) {
                                   schemaFields[fieldKey] = z
                                        .string()
                                        .email("Please enter a valid email address")
                                        .min(1, `${field.label} is required`);
                              }
                              // For regular required fields
                              else {
                                   schemaFields[fieldKey] = z
                                        .string()
                                        .min(1, `${field.label} is required`);
                              }
                         } else {
                              schemaFields[fieldKey] = z.any().optional();
                         }
                    });
          });

          return z.object(schemaFields);
     };

     const schema = buildSchema();

     const methods = useForm({
          resolver: zodResolver(schema),
          mode: "onChange",
          defaultValues: {},
     });

     const {
          control,
          trigger,
          handleSubmit,
          formState: { errors },
     } = methods;

     const currentStep = steps[stepIndex];

     // Get current step field names
     const getCurrentStepFields = () => {
          return Object.keys(currentStep).filter(
               (k) => k !== "heading" && k !== "key"
          );
     };

     const handleNext = async () => {
          const currentFields = getCurrentStepFields();
          const valid = await trigger(currentFields);

          if (valid && stepIndex < totalSteps - 1) {
               setStepIndex(stepIndex + 1);
          }
     };

     const handlePrev = () => {
          if (stepIndex > 0) {
               setStepIndex(stepIndex - 1);
          }
     };

     const onSubmit = async (data: any) => {
          console.log("Final form data:", data);

          // Convert form data to FormData for file uploads
          const formData = new FormData();
          Object.entries(data).forEach(([key, value]) => {
               if (value instanceof File) {
                    formData.append(key, value);
               } else if (value) {
                    formData.append(key, String(value));
               }
          });

          // TODO: Send to API endpoint
          const response = await fetch(
               `${process.env.NEXT_PUBLIC_APP_BASE_URL}/form/job_application/store`,
               {
                    method: "POST",
                    body: formData,
               }
          );
          console.log(response);
     };

     // Handle direct email CTA
     const handleDirectEmail = () => {
          if (redirectionCta?.href) {
               const subject = encodeURIComponent("Job Application Inquiry");
               const body = encodeURIComponent(
                    "Hi, I would like to apply for a position at your company."
               );
               window.location.href = `mailto:${redirectionCta.href}?subject=${subject}&body=${body}`;
          }
     };

     // Get accepted file types for upload fields
     const getAcceptedFileTypes = (fieldKey: string) => {
          if (
               fieldKey.toLowerCase().includes("cv") ||
               fieldKey.toLowerCase().includes("resume")
          ) {
               return ".pdf,.doc,.docx";
          }
          if (
               fieldKey.toLowerCase().includes("photo") ||
               fieldKey.toLowerCase().includes("picture") ||
               fieldKey.toLowerCase().includes("passport")
          ) {
               return ".jpg,.jpeg,.png";
          }
          return "*";
     };

     // Render appropriate field based on field configuration
     const renderField = (fieldKey: string, field: FieldConfig) => {
          const isUploadField =
               field.label?.toLowerCase().includes("upload") ||
               fieldKey.toLowerCase().includes("upload");
          const isTextArea =
               fieldKey.toLowerCase().includes("info") ||
               field.label?.toLowerCase().includes("detail");
          const isDateField =
               fieldKey.toLowerCase().includes("date") ||
               field.placeholder?.toLowerCase().includes("date") ||
               field.label?.toLowerCase().includes("date");
          const hasOptions = field.options && field.options.length > 0;

          return (
               <Controller
                    key={fieldKey}
                    name={fieldKey}
                    control={control}
                    render={({ field: f }) => {
                         if (isUploadField) {
                              const acceptedTypes = getAcceptedFileTypes(fieldKey);
                              const isDocumentUpload =
                                   fieldKey.toLowerCase().includes("cv") ||
                                   fieldKey.toLowerCase().includes("resume");
                              return (
                                   <div>
                                        {isDocumentUpload ? (
                                             // Use native file input for documents
                                             <input
                                                  type="file"
                                                  accept={acceptedTypes}
                                                  onChange={(e) => f.onChange(e.target.files?.[0])}
                                                  className="bg-[#006980]/4 rounded-xl p-3 w-full outline-none text-sm"
                                             />
                                        ) : (
                                             // Use ImageInput for images
                                             <ImageInput
                                                  // label={field.label}
                                                  name={fieldKey}
                                                  onFileChange={f.onChange}
                                                  previewUrl={f.value as File | string | undefined}
                                                  acceptedTypes={acceptedTypes}
                                                  text="Upload Resume / CV"
                                                  inline={false}
                                                  className="bg-primary/4 py-8.5 border-primary rounded-xl border-dashed"
                                             />
                                        )}
                                        <p className="text-xs text-gray-500 mt-1">
                                             {fieldKey.toLowerCase().includes("cv") ||
                                                  fieldKey.toLowerCase().includes("resume")
                                                  ? "Accepted formats: PDF, DOC, DOCX (Max 10MB)"
                                                  : "Accepted formats: JPG, JPEG, PNG (Max 5MB)"}
                                        </p>
                                   </div>
                              );
                         }

                         if (hasOptions) {
                              return (
                                   <Select
                                        options={field.options || []}
                                        placeholder={field.placeholder}
                                        value={f.value as string}
                                        onChange={f.onChange}
                                   />
                              );
                         }

                         if (isTextArea) {
                              return (
                                   <textarea
                                        {...f}
                                        value={(f.value as string) || ""}
                                        placeholder={field.placeholder}
                                        className="bg-[#006980]/4 rounded-xl p-3 w-full min-h-[120px] outline-none text-sm resize-none focus:ring-2 focus:ring-[#006980]/20 transition-all"
                                   />
                              );
                         }

                         if (isDateField) {
                              return (
                                   <Input
                                        {...f}
                                        value={(f.value as string) || ""}
                                        type="date"
                                        placeholder={field.placeholder}
                                        //  error={errors[fieldKey]?.message as string}
                                        className="w-full px-3"
                                   />
                              );
                         }

                         return (
                              <Input
                                   {...f}
                                   value={(f.value as string) || ""}
                                   type="text"
                                   placeholder={field.placeholder}
                                   //     error={errors[fieldKey]?.message as string}
                                   className="w-full px-3"
                              />
                         );
                    }}
               />
          );
     };

     return (
          <>
               <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                         {/* Step Heading */}
                         <h2 className="text-xl font-semibold text-[#1E5A67] mb-6">
                              {currentStep.heading}
                         </h2>

                         {/* Fields Grid */}
                         <div className="grid md:grid-cols-2 gap-6">
                              {Object.entries(currentStep)
                                   .filter(([key]) => key !== "heading" && key !== "key")
                                   .map(([fieldKey, field]: [string, any]) => (
                                        <div
                                             key={fieldKey}
                                             className={
                                                  fieldKey.toLowerCase().includes("info") ||
                                                       field.label?.toLowerCase().includes("detail")
                                                       ? "md:col-span-2"
                                                       : ""
                                             }
                                        >
                                             <label className="text-[#1E5A67] text-sm font-medium mb-2 block">
                                                  {field.label}
                                                  {/* {field.required && (
                      <span className="text-red-500 ml-1">*</span>
                    )} */}
                                             </label>

                                             {renderField(fieldKey, field)}

                                             {errors[fieldKey] && (
                                                  <p className="text-xs text-red-500 mt-1">
                                                       {errors[fieldKey]?.message as string}
                                                  </p>
                                             )}
                                        </div>
                                   ))}
                         </div>

                         <div className="mt-20 pt-8 border-t border-black/10">
                              {/* Navigation Controls */}
                              <div className="flex flex-col sm:flex-row justify-between items-center mt-10 gap-4">
                                   {/* Progress Indicator */}
                                   <div className="w-full sm:w-auto">
                                        <div className="text-sm text-[#1E5A67] mb-2">
                                             Step {stepIndex + 1} of {totalSteps}
                                        </div>
                                        <div className="h-2 bg-[#CFE8E6] rounded-full w-full sm:w-32">
                                             <div
                                                  className="h-2 bg-[#1E5A67] rounded-full transition-all duration-300 ease-in-out"
                                                  style={{
                                                       width: `${((stepIndex + 1) / totalSteps) * 100}%`,
                                                  }}
                                             />
                                        </div>
                                   </div>

                                   {/* Navigation Buttons */}
                                   <div className="flex gap-3 w-full sm:w-auto justify-end">
                                        {stepIndex > 0 && (
                                             <Button
                                                  type="button"
                                                  onClick={handlePrev}
                                                  variant="default"
                                                  className="bg-[#CFE8E6] px-6 py-2.5 text-[#1E5A67] font-medium hover:bg-[#CFE8E6]/80"
                                             >
                                                  <ArrowLeft />
                                                  Previous
                                             </Button>
                                        )}
                                        {stepIndex < totalSteps && (
                                             <Button
                                                  type={stepIndex === totalSteps - 1 ? "submit" : "button"}
                                                  onClick={handleNext}
                                                  variant="default"
                                             >
                                                  Next
                                                  <ArrowRight />
                                             </Button>
                                        )}
                                   </div>
                              </div>
                              {/* Direct Email CTA (Show only on first step) */}
                              {stepIndex === 0 && redirectionCta && redirectionCta.href && (
                                   <div className="flex justify-end mt-7">
                                        {/* <button
                                             type="button"
                                             onClick={handleDirectEmail}
                                             className="flex items-center gap-2 px-5 py-2.5 bg-white border-2 border-[#006980] text-[#006980] rounded-full hover:bg-[#006980]/5 transition-colors font-medium"
                                        >
                                             <Mail size={18} />
                                             Send via Email
                                        </button> */}

                                        <Button
                                             type="button"
                                             onClick={handleDirectEmail}
                                             variant="outline"
                                        >
                                             <Mail size={18} />
                                             Send via Email
                                        </Button>
                                   </div>
                              )}
                         </div>
                    </form>
               </FormProvider>
          </>
     );
}

"use client";

import { useForm, Controller, useWatch } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useFormSubmission } from "@/queries/useFormSubmission";
import toast from "react-hot-toast";
import LatestNews from "../home/LatestNews";
import Contact from "../home/Contact";

interface FieldConfig {
  label: string;
  required: string | boolean;
  placeholder?: string | null;
  options?: Array<{ label: string; value: string }>;
  yesLabel?: string;
  noLabel?: string;
  heading?: string;
}

interface FormConfig {
  fields?: Record<string, FieldConfig>;
  contactForm?: {
    fields: Record<string, FieldConfig>;
    heading: string;
    description?: string;
    noteTitle?: string;
    noteDescription?: string;
  };
  personalInfo?: Record<string, FieldConfig>;
  behalfInfo?: Record<string, FieldConfig>;
  importance?: {
    heading: string;
    options: Array<{ label: string; value: string }>;
  };
  complaintText?: {
    heading: string;
    placeholder?: string | null;
  };
  accessMedicalFile?: FieldConfig;
  contactPreference?: FieldConfig;
  discussedWithStaff?: {
    question: FieldConfig;
    staffName?: FieldConfig;
    outcome?: FieldConfig;
  };
  assessments?: Record<string, FieldConfig>;
  feedback?: Record<string, FieldConfig>;
  emailUpdates?: FieldConfig;
  damageDetails?: Record<string, FieldConfig>;
  incidentDetails?: Record<string, FieldConfig>;
  followUp?: Record<string, FieldConfig>;
  heading: string;
  submitLabel: string;
  enabled?: string | boolean;
}

interface DynamicFormProps {
  config: FormConfig;
  formSlug: string;
  banner?: {
    title?: string;
    backgroundImage?: string;
  };
}

export default function DynamicForm({
  config,
  formSlug,
  banner,
}: DynamicFormProps) {
  const { mutate: submitForm, isPending: isSubmitting } = useFormSubmission();

  // Flatten all fields from nested structure
  const getAllFields = (): Record<string, FieldConfig> => {
    const fields: Record<string, any> = {};

    // Contact form structure
    if (config.contactForm?.fields) {
      Object.assign(fields, config.contactForm.fields);
    }

    // Flat fields structure (compliment form)
    if (config.fields) {
      Object.assign(fields, config.fields);
    }

    // Personal info section
    if (config.personalInfo) {
      Object.entries(config.personalInfo).forEach(([key, value]) => {
        fields[`personalInfo_${key}`] = value;
      });
    }

    // Behalf info section
    if (config.behalfInfo) {
      Object.entries(config.behalfInfo).forEach(([key, value]) => {
        fields[`behalfInfo_${key}`] = value;
      });
    }

    // Access medical file
    if (config.accessMedicalFile) {
      fields["accessMedicalFile"] = config.accessMedicalFile;
    }

    // Contact preference
    if (config.contactPreference) {
      fields["contactPreference"] = config.contactPreference;
    }

    // Discussed with staff
    if (config.discussedWithStaff) {
      if (config.discussedWithStaff.question) {
        fields["discussedWithStaff_question"] =
          config.discussedWithStaff.question;
      }
      if (config.discussedWithStaff.staffName) {
        fields["discussedWithStaff_staffName"] =
          config.discussedWithStaff.staffName;
      }
      if (config.discussedWithStaff.outcome) {
        fields["discussedWithStaff_outcome"] =
          config.discussedWithStaff.outcome;
      }
    }

    // Assessments
    if (config.assessments) {
      Object.entries(config.assessments).forEach(([key, value]) => {
        fields[`assessments_${key}`] = value;
      });
    }

    // Feedback
    if (config.feedback) {
      Object.entries(config.feedback).forEach(([key, value]) => {
        fields[`feedback_${key}`] = value;
      });
    }

    // Email updates
    if (config.emailUpdates) {
      fields["emailUpdates"] = config.emailUpdates;
    }

    // Damage details
    if (config.damageDetails) {
      Object.entries(config.damageDetails).forEach(([key, value]) => {
        fields[`damageDetails_${key}`] = value;
      });
    }

    // Incident details
    if (config.incidentDetails) {
      Object.entries(config.incidentDetails).forEach(([key, value]) => {
        fields[`incidentDetails_${key}`] = value;
      });
    }

    // Follow up
    if (config.followUp) {
      Object.entries(config.followUp).forEach(([key, value]) => {
        fields[`followUp_${key}`] = value;
      });
    }

    // Complaint text
    if (config.complaintText) {
      fields["complaintText"] = {
        label: config.complaintText.heading,
        required: "true",
        placeholder: config.complaintText.placeholder || null,
      };
    }

    // Importance (multi-select checkboxes)
    if (config.importance) {
      fields["importance"] = {
        label: config.importance.heading,
        required: "false",
        options: config.importance.options,
      };
    }

    return fields;
  };

  const allFields = getAllFields();

  // Build dynamic Zod schema
  const buildSchema = () => {
    const schemaFields: Record<string, z.ZodTypeAny> = {};

    Object.entries(allFields).forEach(([fieldKey, field]) => {
      const isRequired = field.required === "true" || field.required === true;

      // Email validation
      if (fieldKey.toLowerCase().includes("email")) {
        schemaFields[fieldKey] = isRequired
          ? z
            .string()
            .email("Please enter a valid email address")
            .min(1, `${field.label} is required`)
          : z
            .string()
            .email("Please enter a valid email address")
            .optional()
            .or(z.literal(""));
      }
      // Date fields
      else if (
        fieldKey.toLowerCase().includes("date") ||
        fieldKey.toLowerCase().includes("dob")
      ) {
        schemaFields[fieldKey] = isRequired
          ? z.string().min(1, `${field.label} is required`)
          : z.string().optional();
      }
      // Importance field (radio button - single selection)
      else if (fieldKey === "importance") {
        schemaFields[fieldKey] = isRequired
          ? z.string().min(1, `${field.label} is required`)
          : z.string().optional();
      }
      // Required string fields
      else if (isRequired) {
        schemaFields[fieldKey] = z
          .string()
          .min(1, `${field.label} is required`);
      }
      // Optional fields
      else {
        schemaFields[fieldKey] = z.string().optional();
      }
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
    handleSubmit,
    formState: { errors },
    reset,
  } = methods;

  // Watch for conditional fields
  const submittingForSomeoneElse = useWatch({
    control,
    name: "behalfInfo_submittingForSomeoneElse",
  });

  const discussedWithStaff = useWatch({
    control,
    name: "discussedWithStaff_question",
  });

  const staffResponsible = useWatch({
    control,
    name: "incidentDetails_staffResponsible",
  });

  const safekeepingAvailable = useWatch({
    control,
    name: "incidentDetails_safekeepingAvailable",
  });

  const onSubmit = (data: any) => {
    const formData = new FormData();

    // Flatten nested keys back to original structure
    Object.entries(data).forEach(([key, value]) => {
      if (value && value !== "") {
        // Handle arrays (like importance checkboxes)
        if (Array.isArray(value)) {
          value.forEach((item) => {
            formData.append(`${key}[]`, String(item));
          });
        }
        // Handle nested keys (e.g., personalInfo_firstName -> personalInfo[firstName])
        else if (key.includes("_")) {
          const [section, fieldName] = key.split("_", 2);
          formData.append(`${section}[${fieldName}]`, String(value));
        } else {
          formData.append(key, String(value));
        }
      }
    });

    // Determine the form type based on slug
    const formTypeMap: Record<string, string> = {
      "compliment-form": "compliment",
      "complaint-form": "complaint_suggestion",
      contact: "contact_us",
      "contact-us": "contact_us",
      "service-enhancement-questionnaire": "service_enhancement",
      "material-damage-claim-form": "material_damage_claim",
    };

    const formType = formTypeMap[formSlug] || formSlug.replace(/-/g, "_");

    submitForm(
      { formType, formData },
      {
        onSuccess: (data) => {
          // Show success message from API or use form-specific default
          const successMessage =
            data?.message ||
            data?.data?.message ||
            `${config.heading || config.contactForm?.heading || "Form"
            } submitted successfully!`;

          toast.success(successMessage);

          // Reset form after successful submission
          reset();
        },
      }
    );
  };

  // Render field based on type
  const renderField = (fieldKey: string, field: FieldConfig) => {
    const isTextArea =
      fieldKey.toLowerCase().includes("comment") ||
      fieldKey.toLowerCase().includes("message") ||
      fieldKey.toLowerCase().includes("complainttext") ||
      fieldKey.toLowerCase().includes("description") ||
      fieldKey.toLowerCase().includes("suggestion") ||
      fieldKey.toLowerCase().includes("dislike") ||
      fieldKey.toLowerCase().includes("favorite") ||
      field.label?.toLowerCase().includes("comment") ||
      field.label?.toLowerCase().includes("describe");

    const hasOptions = field.options && field.options.length > 0;
    const isRadioYesNo = field.yesLabel && field.noLabel;
    const isDateField =
      fieldKey.toLowerCase().includes("date") ||
      fieldKey.toLowerCase().includes("dob");

    return (
      <Controller
        key={fieldKey}
        name={fieldKey}
        control={control}
        render={({ field: f }) => {
          // Radio Yes/No buttons
          if (isRadioYesNo) {
            return (
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="yes"
                    checked={f.value === "yes"}
                    onChange={() => f.onChange("yes")}
                    className="w-4 h-4 text-primary"
                  />
                  <span>{field.yesLabel}</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="no"
                    checked={f.value === "no"}
                    onChange={() => f.onChange("no")}
                    className="w-4 h-4 text-primary"
                  />
                  <span>{field.noLabel}</span>
                </label>
              </div>
            );
          }

          // Radio buttons for fields with options (like Gender)
          // But use dropdown for Contact Preference and Assessment fields
          if (hasOptions) {
            const isContactPreference = fieldKey
              .toLowerCase()
              .includes("contactpreference");
            const isAssessment = fieldKey.toLowerCase().includes("assessments_");

            if (isContactPreference || isAssessment) {
              return (
                <Select
                  options={field.options || []}
                  placeholder={field.placeholder || `Please select`}
                  value={f.value as string}
                  onChange={f.onChange}
                />
              );
            }

            return (
              <div className="flex items-center gap-6 flex-wrap">
                {field.options?.map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      value={option.value}
                      checked={f.value === option.value}
                      onChange={() => f.onChange(option.value)}
                      className="w-4 h-4 text-primary"
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            );
          }

          // Textarea
          if (isTextArea) {
            return (
              <textarea
                {...f}
                value={(f.value as string) || ""}
                placeholder={field.placeholder || ""}
                className="bg-primary/4 rounded-xl p-3 w-full min-h-[120px] outline-none text-sm resize-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            );
          }

          // Date input
          if (isDateField) {
            return (
              <Input
                {...f}
                value={(f.value as string) || ""}
                type="date"
                placeholder={field.placeholder || ""}
                className="w-full px-3"
              />
            );
          }

          // Regular input
          return (
            <Input
              {...f}
              value={(f.value as string) || ""}
              type={
                fieldKey.toLowerCase().includes("email")
                  ? "email"
                  : fieldKey.toLowerCase().includes("phone")
                    ? "tel"
                    : "text"
              }
              placeholder={field.placeholder || ""}
              className="w-full px-3"
            />
          );
        }}
      />
    );
  };

  if (!config || config.enabled === "false") {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">This form is currently unavailable.</p>
      </div>
    );
  }

  const formHeading = config.contactForm?.heading || config.heading;
  const formDescription = config.contactForm?.description;

  return (
    <div className="form-container bg-primary/3 section-padding spacing-x rounded-md">
      <div className="text-center mb-10">
        <h2 className="commonTitle">{formHeading}</h2>
        {formDescription && (
          <p className="text-gray-600 text-base mt-4 leading-relaxed">
            {formDescription}
          </p>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Personal Info Section */}
        {config.personalInfo && (
          <div className="space-y-6">
            {(() => {
              // Define field order for personal info
              // For service enhancement: lastName, firstName, email, phone
              // For complaint form: firstName, lastName, dob, gender, homeAddress, phoneNumber, email
              // For material damage claim: firstName, lastName, email, phoneNumber, dob, homeAddress, patientPhoneNumber, contactPersonName
              const isServiceEnhancement = formSlug === "service-enhancement-questionnaire";
              const isMaterialDamage = formSlug === "material-damage-claim-form";
              const personalInfoOrder = isServiceEnhancement
                ? ["lastName", "firstName", "email", "phone"]
                : isMaterialDamage
                  ? ["firstName", "lastName", "email", "phoneNumber", "dob", "homeAddress", "patientPhoneNumber", "contactPersonName"]
                  : ["firstName", "lastName", "dob", "gender", "homeAddress", "phoneNumber", "email"];

              // Sort fields according to the defined order
              const sortedFields = Object.entries(config.personalInfo).sort(
                ([keyA], [keyB]) => {
                  const indexA = personalInfoOrder.findIndex((orderKey) =>
                    keyA.toLowerCase().includes(orderKey.toLowerCase())
                  );
                  const indexB = personalInfoOrder.findIndex((orderKey) =>
                    keyB.toLowerCase().includes(orderKey.toLowerCase())
                  );

                  if (indexA !== -1 && indexB !== -1) {
                    return indexA - indexB;
                  }
                  if (indexA !== -1) return -1;
                  if (indexB !== -1) return 1;
                  return 0;
                }
              );

              // Service Enhancement Questionnaire layout
              if (isServiceEnhancement) {
                return (
                  <div className="space-y-6">
                    {/* Last Name and First Name in one row (2 columns) */}
                    <div className="grid md:grid-cols-2 gap-6">
                      {sortedFields
                        .filter(
                          ([key]) =>
                            key.toLowerCase().includes("lastname") ||
                            key.toLowerCase().includes("firstname")
                        )
                        .map(([key, field]) => {
                          const fieldKey = `personalInfo_${key}`;
                          const isRequired =
                            field.required === "true" || field.required === true;

                          return (
                            <div key={fieldKey}>
                              <label className="text-primary text-sm font-medium mb-2 block">
                                {field.label}
                                {isRequired && (
                                  <span className="text-red-500 ml-1">*</span>
                                )}
                              </label>
                              {renderField(fieldKey, field)}
                              {errors[fieldKey] && (
                                <p className="text-xs text-red-500 mt-1">
                                  {errors[fieldKey]?.message as string}
                                </p>
                              )}
                            </div>
                          );
                        })}
                    </div>

                    {/* Email Address and Phone Number in one row (2 columns) */}
                    <div className="grid md:grid-cols-2 gap-6">
                      {sortedFields
                        .filter(
                          ([key]) =>
                            key.toLowerCase().includes("email") ||
                            key.toLowerCase().includes("phone")
                        )
                        .map(([key, field]) => {
                          const fieldKey = `personalInfo_${key}`;
                          const isRequired =
                            field.required === "true" || field.required === true;

                          return (
                            <div key={fieldKey}>
                              <label className="text-primary text-sm font-medium mb-2 block">
                                {field.label}
                                {isRequired && (
                                  <span className="text-red-500 ml-1">*</span>
                                )}
                              </label>
                              {renderField(fieldKey, field)}
                              {errors[fieldKey] && (
                                <p className="text-xs text-red-500 mt-1">
                                  {errors[fieldKey]?.message as string}
                                </p>
                              )}
                            </div>
                          );
                        })}
                    </div>
                  </div>
                );
              }

              // Material Damage Claim Form layout
              if (isMaterialDamage) {
                // Render fields in exact order as per image
                const renderFieldInOrder = (orderKey: string) => {
                  const fieldEntry = sortedFields.find(([key]) => {
                    const keyLower = key.toLowerCase();
                    const orderLower = orderKey.toLowerCase();
                    return keyLower.includes(orderLower) || orderLower.includes(keyLower);
                  });

                  if (!fieldEntry) return null;

                  const [key, field] = fieldEntry;
                  const fieldKey = `personalInfo_${key}`;
                  const isRequired = field.required === "true" || field.required === true;

                  return (
                    <div key={fieldKey}>
                      <label className="text-primary text-sm font-medium mb-2 block">
                        {field.label}
                        {isRequired && (
                          <span className="text-red-500 ml-1">*</span>
                        )}
                      </label>
                      {renderField(fieldKey, field)}
                      {errors[fieldKey] && (
                        <p className="text-xs text-red-500 mt-1">
                          {errors[fieldKey]?.message as string}
                        </p>
                      )}
                    </div>
                  );
                };

                return (
                  <div className="space-y-6">
                    {/* Row 1: First Name and Last Name (2 columns) */}
                    <div className="grid md:grid-cols-2 gap-6">
                      {renderFieldInOrder("firstName")}
                      {renderFieldInOrder("lastName")}
                    </div>

                    {/* Row 2: Email Address (full width) */}
                    {renderFieldInOrder("email")}

                    {/* Row 3: Phone Number and D.O.B (2 columns) */}
                    <div className="grid md:grid-cols-2 gap-6">
                      {sortedFields
                        .filter(
                          ([key]) =>
                            (key.toLowerCase().includes("phone") || key.toLowerCase().includes("phonenumber")) &&
                            !key.toLowerCase().includes("patient")
                        )
                        .map(([key, field]) => {
                          const fieldKey = `personalInfo_${key}`;
                          const isRequired =
                            field.required === "true" || field.required === true;

                          return (
                            <div key={fieldKey}>
                              <label className="text-primary text-sm font-medium mb-2 block">
                                {field.label}
                                {isRequired && (
                                  <span className="text-red-500 ml-1">*</span>
                                )}
                              </label>
                              {renderField(fieldKey, field)}
                              {errors[fieldKey] && (
                                <p className="text-xs text-red-500 mt-1">
                                  {errors[fieldKey]?.message as string}
                                </p>
                              )}
                            </div>
                          );
                        })}
                      {sortedFields
                        .filter(
                          ([key]) =>
                            key.toLowerCase().includes("dob") ||
                            key.toLowerCase().includes("dateofbirth") ||
                            key.toLowerCase().includes("birth")
                        )
                        .map(([key, field]) => {
                          const fieldKey = `personalInfo_${key}`;
                          const isRequired =
                            field.required === "true" || field.required === true;

                          return (
                            <div key={fieldKey}>
                              <label className="text-primary text-sm font-medium mb-2 block">
                                {field.label}
                                {isRequired && (
                                  <span className="text-red-500 ml-1">*</span>
                                )}
                              </label>
                              {renderField(fieldKey, field)}
                              {errors[fieldKey] && (
                                <p className="text-xs text-red-500 mt-1">
                                  {errors[fieldKey]?.message as string}
                                </p>
                              )}
                            </div>
                          );
                        })}
                    </div>

                    {/* Row 4: Home Address (full width) */}
                    {sortedFields
                      .filter(
                        ([key]) =>
                          key.toLowerCase().includes("address") ||
                          key.toLowerCase().includes("homeaddress")
                      )
                      .map(([key, field]) => {
                        const fieldKey = `personalInfo_${key}`;
                        const isRequired =
                          field.required === "true" || field.required === true;

                        return (
                          <div key={fieldKey}>
                            <label className="text-primary text-sm font-medium mb-2 block">
                              {field.label}
                              {isRequired && (
                                <span className="text-red-500 ml-1">*</span>
                              )}
                            </label>
                            {renderField(fieldKey, field)}
                            {errors[fieldKey] && (
                              <p className="text-xs text-red-500 mt-1">
                                {errors[fieldKey]?.message as string}
                              </p>
                            )}
                          </div>
                        );
                      })}

                    {/* Row 6: Patient's Phone Number and Name of Contact Person (2 columns) */}
                    <div className="grid md:grid-cols-2 gap-6">
                      {sortedFields
                        .filter(
                          ([key]) =>
                            key.toLowerCase().includes("patientphone") ||
                            key.toLowerCase().includes("patientphonenumber")
                        )
                        .map(([key, field]) => {
                          const fieldKey = `personalInfo_${key}`;
                          const isRequired =
                            field.required === "true" || field.required === true;

                          return (
                            <div key={fieldKey}>
                              <label className="text-primary text-sm font-medium mb-2 block">
                                {field.label}
                                {isRequired && (
                                  <span className="text-red-500 ml-1">*</span>
                                )}
                              </label>
                              {renderField(fieldKey, field)}
                              {errors[fieldKey] && (
                                <p className="text-xs text-red-500 mt-1">
                                  {errors[fieldKey]?.message as string}
                                </p>
                              )}
                            </div>
                          );
                        })}
                      {sortedFields
                        .filter(
                          ([key]) =>
                            key.toLowerCase().includes("contactperson") ||
                            key.toLowerCase().includes("contactpersonname")
                        )
                        .map(([key, field]) => {
                          const fieldKey = `personalInfo_${key}`;
                          const isRequired =
                            field.required === "true" || field.required === true;

                          return (
                            <div key={fieldKey}>
                              <label className="text-primary text-sm font-medium mb-2 block">
                                {field.label}
                                {isRequired && (
                                  <span className="text-red-500 ml-1">*</span>
                                )}
                              </label>
                              {renderField(fieldKey, field)}
                              {errors[fieldKey] && (
                                <p className="text-xs text-red-500 mt-1">
                                  {errors[fieldKey]?.message as string}
                                </p>
                              )}
                            </div>
                          );
                        })}
                    </div>
                  </div>
                );
              }

              // Complaint Form layout
              return (
                <div className="space-y-6">
                  {/* First Name, Last Name, DOB in one row (3 columns) */}
                  <div className="grid md:grid-cols-6 gap-6">
                    {sortedFields
                      .filter(
                        ([key]) =>
                          key.toLowerCase().includes("firstname") ||
                          key.toLowerCase().includes("lastname") ||
                          key.toLowerCase().includes("dob")
                      )
                      .map(([key, field]) => {
                        const fieldKey = `personalInfo_${key}`;
                        const isRequired =
                          field.required === "true" || field.required === true;
                        const isFirstName = key.toLowerCase().includes("firstname");
                        const labelPrefix = isFirstName ? "1. " : "";

                        return (
                          <div key={fieldKey} className="md:col-span-2">
                            <label className="text-primary text-sm font-medium mb-2 block">
                              {labelPrefix}{field.label}
                              {isRequired && (
                                <span className="text-red-500 ml-1">*</span>
                              )}
                            </label>
                            {renderField(fieldKey, field)}
                            {errors[fieldKey] && (
                              <p className="text-xs text-red-500 mt-1">
                                {errors[fieldKey]?.message as string}
                              </p>
                            )}
                          </div>
                        );
                      })}
                  </div>

                  {/* Gender (full width) */}
                  {sortedFields
                    .filter(([key]) =>
                      key.toLowerCase().includes("gender")
                    )
                    .map(([key, field]) => {
                      const fieldKey = `personalInfo_${key}`;
                      const isRequired =
                        field.required === "true" || field.required === true;

                      return (
                        <div key={fieldKey}>
                          <label className="text-primary text-sm font-medium mb-2 block">
                            {field.label}
                            {isRequired && (
                              <span className="text-red-500 ml-1">*</span>
                            )}
                          </label>
                          {renderField(fieldKey, field)}
                          {errors[fieldKey] && (
                            <p className="text-xs text-red-500 mt-1">
                              {errors[fieldKey]?.message as string}
                            </p>
                          )}
                        </div>
                      );
                    })}

                  {/* Home Address (full width) */}
                  {sortedFields
                    .filter(([key]) =>
                      key.toLowerCase().includes("address")
                    )
                    .map(([key, field]) => {
                      const fieldKey = `personalInfo_${key}`;
                      const isRequired =
                        field.required === "true" || field.required === true;

                      return (
                        <div key={fieldKey}>
                          <label className="text-primary text-sm font-medium mb-2 block">
                            {field.label}
                            {isRequired && (
                              <span className="text-red-500 ml-1">*</span>
                            )}
                          </label>
                          {renderField(fieldKey, field)}
                          {errors[fieldKey] && (
                            <p className="text-xs text-red-500 mt-1">
                              {errors[fieldKey]?.message as string}
                            </p>
                          )}
                        </div>
                      );
                    })}

                  {/* Phone Number and Email in one row (2 columns) */}
                  <div className="grid md:grid-cols-2 gap-6">
                    {sortedFields
                      .filter(
                        ([key]) =>
                          key.toLowerCase().includes("phone") ||
                          key.toLowerCase().includes("email")
                      )
                      .map(([key, field]) => {
                        const fieldKey = `personalInfo_${key}`;
                        const isRequired =
                          field.required === "true" || field.required === true;

                        return (
                          <div key={fieldKey}>
                            <label className="text-primary text-sm font-medium mb-2 block">
                              {field.label}
                              {isRequired && (
                                <span className="text-red-500 ml-1">*</span>
                              )}
                            </label>
                            {renderField(fieldKey, field)}
                            {errors[fieldKey] && (
                              <p className="text-xs text-red-500 mt-1">
                                {errors[fieldKey]?.message as string}
                              </p>
                            )}
                          </div>
                        );
                      })}
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* Behalf Info Section */}
        {config.behalfInfo && (
          <div className="space-y-6">
            {(() => {
              // Define field order for behalf info
              const behalfInfoOrder = [
                "submittingForSomeoneElse",
                "patientFirstName",
                "patientLastName",
                "patientPhone",
                "relationship",
                "permission",
              ];

              // Sort fields according to the defined order
              const sortedFields = Object.entries(config.behalfInfo).sort(
                ([keyA], [keyB]) => {
                  const indexA = behalfInfoOrder.findIndex((orderKey) =>
                    keyA.toLowerCase().includes(orderKey.toLowerCase())
                  );
                  const indexB = behalfInfoOrder.findIndex((orderKey) =>
                    keyB.toLowerCase().includes(orderKey.toLowerCase())
                  );

                  if (indexA !== -1 && indexB !== -1) {
                    return indexA - indexB;
                  }
                  if (indexA !== -1) return -1;
                  if (indexB !== -1) return 1;
                  return 0;
                }
              );

              return (
                <div className="space-y-6">
                  {/* "Are you filing this complaint on behalf of someone else?" (full width) */}
                  {sortedFields
                    .filter(([key]) =>
                      key.toLowerCase().includes("submittingforsomeoneelse")
                    )
                    .map(([key, field]) => {
                      const fieldKey = `behalfInfo_${key}`;
                      const isRequired =
                        field.required === "true" || field.required === true;

                      return (
                        <div key={fieldKey}>
                          <label className="text-primary text-sm font-medium mb-2 block">
                            2. {field.label}
                            {isRequired && (
                              <span className="text-red-500 ml-1">*</span>
                            )}
                          </label>
                          {renderField(fieldKey, field)}
                          {errors[fieldKey] && (
                            <p className="text-xs text-red-500 mt-1">
                              {errors[fieldKey]?.message as string}
                            </p>
                          )}
                        </div>
                      );
                    })}

                  {/* Patient's First Name and Last Name in one row (2 columns) - only show if Yes */}
                  {submittingForSomeoneElse === "yes" && (
                    <div className="grid md:grid-cols-2 gap-6">
                      {sortedFields
                        .filter(
                          ([key]) =>
                            key.toLowerCase().includes("patientfirstname") ||
                            key.toLowerCase().includes("patientlastname")
                        )
                        .map(([key, field]) => {
                          const fieldKey = `behalfInfo_${key}`;
                          const isRequired =
                            field.required === "true" ||
                            field.required === true;

                          return (
                            <div key={fieldKey}>
                              <label className="text-primary text-sm font-medium mb-2 block">
                                {field.label}
                                {isRequired && (
                                  <span className="text-red-500 ml-1">*</span>
                                )}
                              </label>
                              {renderField(fieldKey, field)}
                              {errors[fieldKey] && (
                                <p className="text-xs text-red-500 mt-1">
                                  {errors[fieldKey]?.message as string}
                                </p>
                              )}
                            </div>
                          );
                        })}
                    </div>
                  )}

                  {/* Patient's Phone Number and Relationship in one row (2 columns) - only show if Yes */}
                  {submittingForSomeoneElse === "yes" && (
                    <div className="grid md:grid-cols-2 gap-6">
                      {sortedFields
                        .filter(
                          ([key]) =>
                            key.toLowerCase().includes("patientphone") ||
                            key.toLowerCase().includes("relationship")
                        )
                        .map(([key, field]) => {
                          const fieldKey = `behalfInfo_${key}`;
                          const isRequired =
                            field.required === "true" ||
                            field.required === true;

                          return (
                            <div key={fieldKey}>
                              <label className="text-primary text-sm font-medium mb-2 block">
                                {field.label}
                                {isRequired && (
                                  <span className="text-red-500 ml-1">*</span>
                                )}
                              </label>
                              {renderField(fieldKey, field)}
                              {errors[fieldKey] && (
                                <p className="text-xs text-red-500 mt-1">
                                  {errors[fieldKey]?.message as string}
                                </p>
                              )}
                            </div>
                          );
                        })}
                    </div>
                  )}

                  {/* Permission question (full width) - only show if Yes */}
                  {submittingForSomeoneElse === "yes" &&
                    sortedFields
                      .filter(([key]) =>
                        key.toLowerCase().includes("permission")
                      )
                      .map(([key, field]) => {
                        const fieldKey = `behalfInfo_${key}`;
                        const isRequired =
                          field.required === "true" || field.required === true;

                        return (
                          <div key={fieldKey}>
                            <label className="text-primary text-sm font-medium mb-2 block">
                              {field.label}
                              {isRequired && (
                                <span className="text-red-500 ml-1">*</span>
                              )}
                            </label>
                            {renderField(fieldKey, field)}
                            {errors[fieldKey] && (
                              <p className="text-xs text-red-500 mt-1">
                                {errors[fieldKey]?.message as string}
                              </p>
                            )}
                          </div>
                        );
                      })}
                </div>
              );
            })()}
          </div>
        )}

        {/* Contact Form Fields (simple structure) */}
        {config.contactForm?.fields && (
          <div className="grid md:grid-cols-2 gap-6">
            {Object.entries(config.contactForm.fields).map(
              ([fieldKey, field]) => {
                const isTextArea = fieldKey.toLowerCase().includes("comment");
                const isRequired = field.label?.includes("*");

                return (
                  <div
                    key={fieldKey}
                    className={isTextArea ? "md:col-span-2" : ""}
                  >
                    <label className="text-primary text-sm font-medium mb-2 block">
                      {field.label}
                    </label>
                    {renderField(fieldKey, field)}
                    {errors[fieldKey] && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors[fieldKey]?.message as string}
                      </p>
                    )}
                  </div>
                );
              }
            )}
          </div>
        )}

        {/* Flat Fields (Compliment Form) */}
        {config.fields && (
          <div className="grid md:grid-cols-6 gap-6">
            {(() => {
              // Define field order for compliment form
              const complimentFormOrder = [
                "title",
                "firstName",
                "lastName",
                "email",
                "staffMember",
                "comments",
              ];

              // Sort fields according to the defined order
              const sortedFields = Object.entries(config.fields).sort(
                ([keyA], [keyB]) => {
                  const indexA = complimentFormOrder.findIndex((orderKey) =>
                    keyA.toLowerCase().includes(orderKey.toLowerCase())
                  );
                  const indexB = complimentFormOrder.findIndex((orderKey) =>
                    keyB.toLowerCase().includes(orderKey.toLowerCase())
                  );

                  // If both found, sort by index
                  if (indexA !== -1 && indexB !== -1) {
                    return indexA - indexB;
                  }
                  // If only A found, put it first
                  if (indexA !== -1) return -1;
                  // If only B found, put it first
                  if (indexB !== -1) return 1;
                  // If neither found, maintain original order
                  return 0;
                }
              );

              return sortedFields.map(([fieldKey, field]) => {
                const isTextArea = fieldKey.toLowerCase().includes("comment");
                const isRequired =
                  field.required === "true" || field.required === true;

                // Determine column span based on field type
                let colSpan = "";
                if (
                  fieldKey.toLowerCase().includes("title") ||
                  fieldKey.toLowerCase().includes("firstname") ||
                  fieldKey.toLowerCase().includes("lastname")
                ) {
                  // Title, First Name, Last Name: 2 columns each (3 fields in one row)
                  colSpan = "md:col-span-2";
                } else {
                  // Email, Staff Member, and Comments: full width (6 columns each)
                  colSpan = "md:col-span-6";
                }

                return (
                  <div key={fieldKey} className={colSpan}>
                    <label className="text-primary text-sm font-medium mb-2 block">
                      {field.label}
                      {isRequired && (
                        <span className="text-red-500 ml-1">*</span>
                      )}
                    </label>
                    {renderField(fieldKey, field)}
                    {errors[fieldKey] && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors[fieldKey]?.message as string}
                      </p>
                    )}
                  </div>
                );
              });
            })()}
          </div>
        )}

        {/* Complaint Text */}
        {config.complaintText && (
          <div className="space-y-4">
            <div>
              <label className="text-primary text-sm font-medium mb-2 block">
                3. {config.complaintText.heading}
                <span className="text-red-500 ml-1">*</span>
              </label>
              {renderField("complaintText", {
                label: config.complaintText.heading,
                required: "true",
                placeholder: config.complaintText.placeholder || null,
              })}
              {errors.complaintText && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.complaintText?.message as string}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Discussed With Staff */}
        {config.discussedWithStaff && (
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="text-primary text-sm font-medium mb-2 block">
                  4. {config.discussedWithStaff.question.label}
                  <span className="text-red-500 ml-1">*</span>
                </label>
                {renderField(
                  "discussedWithStaff_question",
                  config.discussedWithStaff.question
                )}
                {errors.discussedWithStaff_question && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.discussedWithStaff_question?.message as string}
                  </p>
                )}
              </div>

              {discussedWithStaff === "yes" &&
                config.discussedWithStaff.staffName && (
                  <div>
                    <label className="text-primary text-sm font-medium mb-2 block">
                      {config.discussedWithStaff.staffName.label}
                    </label>
                    {renderField(
                      "discussedWithStaff_staffName",
                      config.discussedWithStaff.staffName
                    )}
                  </div>
                )}

              {discussedWithStaff === "yes" &&
                config.discussedWithStaff.outcome && (
                  <div>
                    <label className="text-primary text-sm font-medium mb-2 block">
                      {config.discussedWithStaff.outcome.label}
                    </label>
                    {renderField(
                      "discussedWithStaff_outcome",
                      config.discussedWithStaff.outcome
                    )}
                  </div>
                )}
            </div>
          </div>
        )}

        {/* Importance Section (Complaint Form) */}
        {config.importance && (
          <div className="space-y-4">
            <label className="text-primary text-sm font-medium mb-2 block">
              5. {config.importance.heading}
              <span className="text-red-500 ml-1">*</span>
            </label>
            <Controller
              name="importance"
              control={control}
              render={({ field: f }) => {
                return (
                  <div className="flex flex-col gap-4">
                    {config.importance?.options.map((option) => (
                      <label
                        key={option.value}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="radio"
                          value={option.value}
                          checked={f.value === option.value}
                          onChange={() => f.onChange(option.value)}
                          className="w-4 h-4 text-primary"
                        />
                        <span>{option.label}</span>
                      </label>
                    ))}
                  </div>
                );
              }}
            />
            {errors.importance && (
              <p className="text-xs text-red-500 mt-1">
                {errors.importance?.message as string}
              </p>
            )}
          </div>
        )}

        {/* Access Medical File */}
        {config.accessMedicalFile && (
          <div>
            <label className="text-primary text-sm font-medium mb-2 block">
              6. {config.accessMedicalFile.label}
              <span className="text-red-500 ml-1">*</span>
            </label>
            {renderField("accessMedicalFile", config.accessMedicalFile)}
            {errors.accessMedicalFile && (
              <p className="text-xs text-red-500 mt-1">
                {errors.accessMedicalFile?.message as string}
              </p>
            )}
          </div>
        )}

        {/* Contact Preference */}
        {config.contactPreference && (
          <div>
            <label className="text-primary text-sm font-medium mb-2 block">
              7. {config.contactPreference.label}
              <span className="text-red-500 ml-1">*</span>
            </label>
            {renderField("contactPreference", config.contactPreference)}
            {errors.contactPreference && (
              <p className="text-xs text-red-500 mt-1">
                {errors.contactPreference?.message as string}
              </p>
            )}
          </div>
        )}

        {/* Assessments Section (Service Enhancement) */}
        {config.assessments && (
          <div className="space-y-6">
            {(() => {
              // Define field order for assessments (based on image)
              const assessmentOrder = [
                "admissionsReception",
                "admissionsInformation",
                "emergencyAdmission",
                "nursingInformation",
                "specialistInformation",
                "medicalTreatment",
                "nurseProfessionalism",
                "roomEnvironment",
                "operationRoomTeam",
                "mealsQuality",
                "kitchenService",
                "dischargeProcess",
                "dischargeInstruction",
                "overallStay",
              ];

              // Sort fields according to the defined order
              const sortedFields = Object.entries(config.assessments).sort(
                ([keyA], [keyB]) => {
                  const indexA = assessmentOrder.findIndex((orderKey) =>
                    keyA.toLowerCase().includes(orderKey.toLowerCase())
                  );
                  const indexB = assessmentOrder.findIndex((orderKey) =>
                    keyB.toLowerCase().includes(orderKey.toLowerCase())
                  );

                  if (indexA !== -1 && indexB !== -1) {
                    return indexA - indexB;
                  }
                  if (indexA !== -1) return -1;
                  if (indexB !== -1) return 1;
                  return 0;
                }
              );

              return (
                <div className="space-y-6">
                  {sortedFields.map(([key, field]) => {
                    const fieldKey = `assessments_${key}`;
                    const isRequired =
                      field.required === "true" || field.required === true;

                    return (
                      <div key={fieldKey}>
                        <label className="text-primary text-sm font-medium mb-2 block">
                          {field.label}
                          {isRequired && (
                            <span className="text-red-500 ml-1">*</span>
                          )}
                        </label>
                        {renderField(fieldKey, field)}
                        {errors[fieldKey] && (
                          <p className="text-xs text-red-500 mt-1">
                            {errors[fieldKey]?.message as string}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })()}
          </div>
        )}

        {/* Feedback Section */}
        {config.feedback && (
          <div className="space-y-6">
            {(() => {
              // Define field order for feedback (based on image)
              const feedbackOrder = [
                "favoriteAspect",
                "dislikes",
                "suggestions",
              ];

              // Sort fields according to the defined order
              const sortedFields = Object.entries(config.feedback).sort(
                ([keyA], [keyB]) => {
                  const indexA = feedbackOrder.findIndex((orderKey) =>
                    keyA.toLowerCase().includes(orderKey.toLowerCase())
                  );
                  const indexB = feedbackOrder.findIndex((orderKey) =>
                    keyB.toLowerCase().includes(orderKey.toLowerCase())
                  );

                  if (indexA !== -1 && indexB !== -1) {
                    return indexA - indexB;
                  }
                  if (indexA !== -1) return -1;
                  if (indexB !== -1) return 1;
                  return 0;
                }
              );

              return (
                <div className="space-y-6">
                  {sortedFields.map(([key, field]) => {
                    const fieldKey = `feedback_${key}`;
                    const isRequired =
                      field.required === "true" || field.required === true;

                    return (
                      <div key={fieldKey}>
                        <label className="text-primary text-sm font-medium mb-2 block">
                          {field.label}
                          {isRequired && (
                            <span className="text-red-500 ml-1">*</span>
                          )}
                        </label>
                        {renderField(fieldKey, field)}
                        {errors[fieldKey] && (
                          <p className="text-xs text-red-500 mt-1">
                            {errors[fieldKey]?.message as string}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })()}
          </div>
        )}

        {/* Email Updates */}
        {config.emailUpdates && (
          <div>
            <label className="text-primary text-sm font-medium mb-2 block">
              {config.emailUpdates.label}
              <span className="text-red-500 ml-1">*</span>
            </label>
            {renderField("emailUpdates", config.emailUpdates)}
            {errors.emailUpdates && (
              <p className="text-xs text-red-500 mt-1">
                {errors.emailUpdates?.message as string}
              </p>
            )}
          </div>
        )}

        {/* Damage Details Section */}
        {config.damageDetails && (
          <div className="space-y-6">
            {(() => {
              // Define field order for damage details (based on image)
              const damageDetailsOrder = [
                "purchaseType",
                "damageDescription",
                "otherPartyPaid",
                "proofOfPurchase",
                "sentForRepair",
                "purchaseLocation",
                "purchaseValue",
                "moneyTransferReceipt",
              ];

              // Sort fields according to the defined order
              const sortedFields = Object.entries(config.damageDetails).sort(
                ([keyA], [keyB]) => {
                  const indexA = damageDetailsOrder.findIndex((orderKey) =>
                    keyA.toLowerCase().includes(orderKey.toLowerCase())
                  );
                  const indexB = damageDetailsOrder.findIndex((orderKey) =>
                    keyB.toLowerCase().includes(orderKey.toLowerCase())
                  );

                  if (indexA !== -1 && indexB !== -1) {
                    return indexA - indexB;
                  }
                  if (indexA !== -1) return -1;
                  if (indexB !== -1) return 1;
                  return 0;
                }
              );

              const renderedFields = new Set<string>();

              return (
                <div className="space-y-6">
                  {sortedFields.map(([key, field]) => {
                    const fieldKey = `damageDetails_${key}`;
                    const isTextArea = key.toLowerCase().includes("description");
                    const isRequired =
                      field.required === "true" || field.required === true;
                    const isPurchaseValue = key.toLowerCase().includes("purchasevalue");
                    const isMoneyTransfer = key.toLowerCase().includes("moneytransfer");

                    // Skip if already rendered
                    if (renderedFields.has(key)) return null;

                    // Purchase Value and Money Transfer Receipt side by side
                    if (isPurchaseValue) {
                      const moneyTransferField = sortedFields.find(
                        ([k]) => k.toLowerCase().includes("moneytransfer")
                      );

                      renderedFields.add(key);
                      if (moneyTransferField) {
                        renderedFields.add(moneyTransferField[0]);
                      }

                      return (
                        <div key={fieldKey} className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label className="text-primary text-sm font-medium mb-2 block">
                              {field.label}
                              {isRequired && (
                                <span className="text-red-500 ml-1">*</span>
                              )}
                            </label>
                            {renderField(fieldKey, field)}
                            {errors[fieldKey] && (
                              <p className="text-xs text-red-500 mt-1">
                                {errors[fieldKey]?.message as string}
                              </p>
                            )}
                          </div>
                          {moneyTransferField && (
                            <div>
                              <label className="text-primary text-sm font-medium mb-2 block">
                                {moneyTransferField[1].label}
                                {moneyTransferField[1].required === "true" && (
                                  <span className="text-red-500 ml-1">*</span>
                                )}
                              </label>
                              {renderField(`damageDetails_${moneyTransferField[0]}`, moneyTransferField[1])}
                              {errors[`damageDetails_${moneyTransferField[0]}`] && (
                                <p className="text-xs text-red-500 mt-1">
                                  {errors[`damageDetails_${moneyTransferField[0]}`]?.message as string}
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    }

                    return (
                      <div key={fieldKey}>
                        <label className="text-primary text-sm font-medium mb-2 block">
                          {field.label}
                          {isRequired && (
                            <span className="text-red-500 ml-1">*</span>
                          )}
                        </label>
                        {renderField(fieldKey, field)}
                        {errors[fieldKey] && (
                          <p className="text-xs text-red-500 mt-1">
                            {errors[fieldKey]?.message as string}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })()}
          </div>
        )}

        {/* Incident Details Section */}
        {config.incidentDetails && (
          <div className="space-y-6">
            {(() => {
              // Define field order for incident details (based on image)
              const incidentDetailsOrder = [
                "hospitalDepartment",
                "locationDuringDamage",
                "incidentDescription",
                "safekeepingAvailable",
                "staffResponsible",
                "responsibilityReason",
                "witnesses",
                "reportedToStaff",
                "policeReportFiled",
                "packagingSafekept",
              ];

              // Sort fields according to the defined order
              const sortedFields = Object.entries(config.incidentDetails).sort(
                ([keyA], [keyB]) => {
                  const indexA = incidentDetailsOrder.findIndex((orderKey) =>
                    keyA.toLowerCase().includes(orderKey.toLowerCase())
                  );
                  const indexB = incidentDetailsOrder.findIndex((orderKey) =>
                    keyB.toLowerCase().includes(orderKey.toLowerCase())
                  );

                  if (indexA !== -1 && indexB !== -1) {
                    return indexA - indexB;
                  }
                  if (indexA !== -1) return -1;
                  if (indexB !== -1) return 1;
                  return 0;
                }
              );

              const renderedFields = new Set<string>();

              return (
                <div className="space-y-6">
                  {sortedFields.map(([key, field]) => {
                    const fieldKey = `incidentDetails_${key}`;
                    const isTextArea =
                      key.toLowerCase().includes("description") ||
                      key.toLowerCase().includes("reason");
                    const isRequired =
                      field.required === "true" || field.required === true;
                    const shouldShow =
                      key === "responsibilityReason"
                        ? staffResponsible === "yes"
                        : true;

                    if (!shouldShow) return null;
                    if (renderedFields.has(key)) return null;

                    // Check if this is hospitalDepartment or locationDuringDamage - show them side by side
                    const isHospitalDept = key.toLowerCase().includes("hospitaldepartment");
                    const isLocation = key.toLowerCase().includes("locationduringdamage");
                    const isAdmitted = key.toLowerCase().includes("admitted") || key.toLowerCase().includes("admission");

                    // If hospitalDepartment, try to pair it with admitted field
                    if (isHospitalDept) {
                      const admittedField = sortedFields.find(
                        ([k]) =>
                          (k.toLowerCase().includes("admitted") ||
                            k.toLowerCase().includes("admission") ||
                            k.toLowerCase().includes("whenadmitted")) &&
                          !renderedFields.has(k)
                      );

                      renderedFields.add(key);
                      if (admittedField) {
                        renderedFields.add(admittedField[0]);
                      }

                      // If no admitted field, just show hospitalDepartment alone (full width)
                      if (!admittedField) {
                        return (
                          <div key={fieldKey}>
                            <label className="text-primary text-sm font-medium mb-2 block">
                              {field.label}
                              {isRequired && (
                                <span className="text-red-500 ml-1">*</span>
                              )}
                            </label>
                            {renderField(fieldKey, field)}
                            {errors[fieldKey] && (
                              <p className="text-xs text-red-500 mt-1">
                                {errors[fieldKey]?.message as string}
                              </p>
                            )}
                          </div>
                        );
                      }

                      // Show admitted field and hospitalDepartment side by side
                      return (
                        <div key={fieldKey} className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label className="text-primary text-sm font-medium mb-2 block">
                              {admittedField[1].label}
                              {(admittedField[1].required === "true" || admittedField[1].required === true) && (
                                <span className="text-red-500 ml-1">*</span>
                              )}
                            </label>
                            {renderField(`incidentDetails_${admittedField[0]}`, admittedField[1])}
                            {errors[`incidentDetails_${admittedField[0]}`] && (
                              <p className="text-xs text-red-500 mt-1">
                                {errors[`incidentDetails_${admittedField[0]}`]?.message as string}
                              </p>
                            )}
                          </div>
                          <div>
                            <label className="text-primary text-sm font-medium mb-2 block">
                              {field.label}
                              {isRequired && (
                                <span className="text-red-500 ml-1">*</span>
                              )}
                            </label>
                            {renderField(fieldKey, field)}
                            {errors[fieldKey] && (
                              <p className="text-xs text-red-500 mt-1">
                                {errors[fieldKey]?.message as string}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    }

                    // Skip locationDuringDamage if already rendered with hospitalDepartment
                    if (isLocation && renderedFields.has(key)) return null;

                    return (
                      <div key={fieldKey}>
                        <label className="text-primary text-sm font-medium mb-2 block">
                          {field.label}
                          {isRequired && (
                            <span className="text-red-500 ml-1">*</span>
                          )}
                        </label>
                        {renderField(fieldKey, field)}
                        {errors[fieldKey] && (
                          <p className="text-xs text-red-500 mt-1">
                            {errors[fieldKey]?.message as string}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })()}
          </div>
        )}

        {/* Follow Up Section */}
        {config.followUp && (
          <div className="space-y-6">
            {(() => {
              // Define field order for follow up (based on image)
              const followUpOrder = [
                "accessConsent",
                "todaysDate",
                "desiredOutcome",
              ];

              // Sort fields according to the defined order
              const sortedFields = Object.entries(config.followUp).sort(
                ([keyA], [keyB]) => {
                  const indexA = followUpOrder.findIndex((orderKey) =>
                    keyA.toLowerCase().includes(orderKey.toLowerCase())
                  );
                  const indexB = followUpOrder.findIndex((orderKey) =>
                    keyB.toLowerCase().includes(orderKey.toLowerCase())
                  );

                  if (indexA !== -1 && indexB !== -1) {
                    return indexA - indexB;
                  }
                  if (indexA !== -1) return -1;
                  if (indexB !== -1) return 1;
                  return 0;
                }
              );

              return (
                <div className="space-y-6">
                  {sortedFields.map(([key, field]) => {
                    const fieldKey = `followUp_${key}`;
                    const isTextArea = key.toLowerCase().includes("outcome");
                    const isRequired =
                      field.required === "true" || field.required === true;

                    return (
                      <div key={fieldKey}>
                        <label className="text-primary text-sm font-medium mb-2 block">
                          {field.label}
                          {isRequired && (
                            <span className="text-red-500 ml-1">*</span>
                          )}
                        </label>
                        {renderField(fieldKey, field)}
                        {errors[fieldKey] && (
                          <p className="text-xs text-red-500 mt-1">
                            {errors[fieldKey]?.message as string}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })()}
          </div>
        )}

        {/* Submit Button */}
        <div className="text-center mt-8 pt-6 border-t border-gray-200">
          <Button type="submit" variant="default" disabled={isSubmitting}>
            {isSubmitting ? (
              "Submitting..."
            ) : (
              <>
                {config.submitLabel || config.contactForm?.heading || "Submit"}{" "}
                <ArrowRight />
              </>
            )}
          </Button>
        </div>
      </form>

      {/* Contact Form Notes */}
      {config.contactForm?.noteTitle && (
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="font-medium text-secondary mb-2">
            {config.contactForm.noteTitle}
          </div>
          <p className="text-gray-600 text-sm">
            {config.contactForm.noteDescription}
          </p>
        </div>
      )}
    </div>
  );
}

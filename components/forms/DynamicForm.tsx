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
import { DynamicFormProps, FieldConfig } from "./types";
import ComplimentForm from "./ComplimentForm";
import ContactFormDynamic from "./ContactFormDynamic";
import ComplaintForm from "./ComplaintForm";
import ServiceEnhancementForm from "./ServiceEnhancementForm";
import MaterialDamageClaimForm from "./MaterialDamageClaimForm";

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

    // Importance (radio button - single selection)
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

  // Common props to pass to form components
  const formProps = {
    config,
    formSlug,
    control,
    errors,
    renderField,
    isSubmitting,
    submittingForSomeoneElse: submittingForSomeoneElse as string | undefined,
    discussedWithStaff: discussedWithStaff as string | undefined,
    staffResponsible: staffResponsible as string | undefined,
    safekeepingAvailable: safekeepingAvailable as string | undefined,
  };

  // Route to appropriate form component based on slug
  const renderFormContent = () => {
    switch (formSlug) {
      case "compliment-form":
        return <ComplimentForm {...formProps} />;

      case "contact":
      case "contact-us":
        return <ContactFormDynamic {...formProps} />;

      case "complaint-form":
        return <ComplaintForm {...formProps} />;

      case "service-enhancement-questionnaire":
        return <ServiceEnhancementForm {...formProps} />;

      case "material-damage-claim-form":
        return <MaterialDamageClaimForm {...formProps} />;

      default:
        return <ContactFormDynamic {...formProps} />;
    }
  };

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
        {renderFormContent()}

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

// Re-export types for convenience
export type { DynamicFormProps } from "./types";
export type { FormConfig, FieldConfig } from "./types";

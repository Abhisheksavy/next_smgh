"use client";

import { FormConfig, FieldConfig } from "./types";

interface ComplimentFormProps {
  config: FormConfig;
  formSlug: string;
  errors: any;
  renderField: (fieldKey: string, field: FieldConfig) => React.ReactElement;
}

export default function ComplimentForm({ config, errors, renderField }: ComplimentFormProps) {
  return (
    <>
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
    </>
  );
}

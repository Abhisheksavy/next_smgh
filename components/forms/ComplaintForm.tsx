"use client";

import { Controller } from "react-hook-form";
import { FormConfig, FieldConfig } from "./types";

interface ComplaintFormProps {
  config: FormConfig;
  formSlug: string;
  control: any;
  errors: any;
  renderField: (fieldKey: string, field: FieldConfig) => React.ReactElement;
  submittingForSomeoneElse?: string;
  discussedWithStaff?: string;
}

export default function ComplaintForm({
  config,
  control,
  errors,
  renderField,
  submittingForSomeoneElse,
  discussedWithStaff,
}: ComplaintFormProps) {
  return (
    <>
      {/* Personal Info Section */}
      {config.personalInfo && (
        <div className="space-y-6">
          {(() => {
            const personalInfoOrder = ["firstName", "lastName", "dob", "gender", "homeAddress", "phoneNumber", "email"];

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
            const behalfInfoOrder = [
              "submittingForSomeoneElse",
              "patientFirstName",
              "patientLastName",
              "patientPhone",
              "relationship",
              "permission",
            ];

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

      {/* Importance Section */}
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
    </>
  );
}

"use client";

import { FormConfig, FieldConfig } from "./types";

interface ServiceEnhancementFormProps {
  config: FormConfig;
  formSlug: string;
  errors: any;
  renderField: (fieldKey: string, field: FieldConfig) => React.ReactElement;
}

export default function ServiceEnhancementForm({ config, errors, renderField }: ServiceEnhancementFormProps) {
  return (
    <>
      {/* Personal Info Section */}
      {config.personalInfo && (
        <div className="space-y-6">
          {(() => {
            const personalInfoOrder = ["lastName", "firstName", "email", "phone"];
            
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
          })()}
        </div>
      )}

      {/* Assessments Section */}
      {config.assessments && (
        <div className="space-y-6">
          {(() => {
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
            const feedbackOrder = [
              "favoriteAspect",
              "dislikes",
              "suggestions",
            ];

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
    </>
  );
}

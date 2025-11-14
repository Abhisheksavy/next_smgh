"use client";

import { FormConfig, FieldConfig } from "./types";

interface MaterialDamageClaimFormProps {
  config: FormConfig;
  formSlug: string;
  errors: any;
  renderField: (fieldKey: string, field: FieldConfig) => React.ReactElement;
  staffResponsible?: string;
}

export default function MaterialDamageClaimForm({
  config,
  errors,
  renderField,
  staffResponsible,
}: MaterialDamageClaimFormProps) {
  return (
    <>
      {/* Personal Info Section */}
      {config.personalInfo && (
        <div className="space-y-6">
          {(() => {
            const personalInfoOrder = ["firstName", "lastName", "email", "phoneNumber", "dob", "homeAddress", "patientPhoneNumber", "contactPersonName"];
            
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

                {/* Row 5: Patient's Phone Number and Name of Contact Person (2 columns) */}
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
          })()}
        </div>
      )}

      {/* Damage Details Section */}
      {config.damageDetails && (
        <div className="space-y-6">
          {(() => {
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
                  const isRequired =
                    field.required === "true" || field.required === true;
                  const shouldShow =
                    key === "responsibilityReason"
                      ? staffResponsible === "yes"
                      : true;

                  if (!shouldShow) return null;
                  if (renderedFields.has(key)) return null;

                  const isHospitalDept = key.toLowerCase().includes("hospitaldepartment");
                  const isLocation = key.toLowerCase().includes("locationduringdamage");

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
            const followUpOrder = [
              "accessConsent",
              "todaysDate",
              "desiredOutcome",
            ];

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
    </>
  );
}

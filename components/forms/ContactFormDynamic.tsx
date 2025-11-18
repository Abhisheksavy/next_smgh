"use client";

import { FormConfig, FieldConfig } from "./types";

interface ContactFormDynamicProps {
    config: FormConfig;
    formSlug: string;
    errors: any;
    renderField: (fieldKey: string, field: FieldConfig) => React.ReactElement;
}

export default function ContactFormDynamic({ config, errors, renderField }: ContactFormDynamicProps) {
    return (
        <>
            {/* Contact Form Fields */}
            {config.contactForm?.fields && (
                <div className="space-y-6">
                    {(() => {
                        // Define field order for contact form
                        const contactFormOrder = [
                            "firstName",
                            "familyName",
                            "lastName", // Alternative name
                            "email",
                            "emailAddress",
                            "contact",
                            "phone",
                            "comments",
                            "message",
                        ];

                        // Sort fields according to the defined order
                        const sortedFields = Object.entries(config.contactForm.fields).sort(
                            ([keyA], [keyB]) => {
                                const indexA = contactFormOrder.findIndex((orderKey) =>
                                    keyA.toLowerCase().includes(orderKey.toLowerCase())
                                );
                                const indexB = contactFormOrder.findIndex((orderKey) =>
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

                        return (
                            <>
                                {/* First Row: First Name and Family Name (2 columns) */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    {sortedFields
                                        .filter(
                                            ([key]) =>
                                                key.toLowerCase().includes("firstname") ||
                                                key.toLowerCase().includes("familyname") ||
                                                key.toLowerCase().includes("lastname")
                                        )
                                        .slice(0, 2) // Only take first 2 (firstName and lastName/familyName)
                                        .map(([fieldKey, field]) => {
                                            const isRequired =
                                                field.required === "true" ||
                                                field.required === true ||
                                                field.label?.includes("*");

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

                                {/* Second Row: Email Address and Contact (2 columns) */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    {sortedFields
                                        .filter(
                                            ([key]) =>
                                                (key.toLowerCase().includes("email") &&
                                                    !key.toLowerCase().includes("update")) ||
                                                key.toLowerCase().includes("contact") ||
                                                key.toLowerCase().includes("phone")
                                        )
                                        .slice(0, 2) // Only take first 2 (email and contact/phone)
                                        .map(([fieldKey, field]) => {
                                            const isRequired =
                                                field.required === "true" ||
                                                field.required === true ||
                                                field.label?.includes("*");

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

                                {/* Third Row: Comments (full width) */}
                                {sortedFields
                                    .filter(
                                        ([key]) =>
                                            key.toLowerCase().includes("comment") ||
                                            key.toLowerCase().includes("message")
                                    )
                                    .map(([fieldKey, field]) => {
                                        const isRequired =
                                            field.required === "true" ||
                                            field.required === true ||
                                            field.label?.includes("*");

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
                            </>
                        );
                    })()}
                </div>
            )}
        </>
    );
}

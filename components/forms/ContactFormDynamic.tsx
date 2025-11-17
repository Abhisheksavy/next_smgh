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
                                    <label className="text-foreground text-base font-regular mb-2 block">
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
        </>
    );
}

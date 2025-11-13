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

export default function DynamicForm({ config, formSlug, banner }: DynamicFormProps) {
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
                fields["discussedWithStaff_question"] = config.discussedWithStaff.question;
            }
            if (config.discussedWithStaff.staffName) {
                fields["discussedWithStaff_staffName"] = config.discussedWithStaff.staffName;
            }
            if (config.discussedWithStaff.outcome) {
                fields["discussedWithStaff_outcome"] = config.discussedWithStaff.outcome;
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
                    ? z.string().email("Please enter a valid email address").min(1, `${field.label} is required`)
                    : z.string().email("Please enter a valid email address").optional().or(z.literal(""));
            }
            // Date fields
            else if (fieldKey.toLowerCase().includes("date") || fieldKey.toLowerCase().includes("dob")) {
                schemaFields[fieldKey] = isRequired
                    ? z.string().min(1, `${field.label} is required`)
                    : z.string().optional();
            }
            // Array fields (like importance checkboxes)
            else if (fieldKey === "importance") {
                schemaFields[fieldKey] = z.array(z.string()).optional();
            }
            // Required string fields
            else if (isRequired) {
                schemaFields[fieldKey] = z.string().min(1, `${field.label} is required`);
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
            "contact": "contact_us",
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
                        `${config.heading || config.contactForm?.heading || "Form"} submitted successfully!`;

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
        const isDateField = fieldKey.toLowerCase().includes("date") || fieldKey.toLowerCase().includes("dob");

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

                    // Select dropdown
                    if (hasOptions) {
                        return (
                            <Select
                                options={field.options || []}
                                placeholder={field.placeholder || `Select ${field.label}`}
                                value={f.value as string}
                                onChange={f.onChange}
                            />
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
                            type={fieldKey.toLowerCase().includes("email") ? "email" : fieldKey.toLowerCase().includes("phone") ? "tel" : "text"}
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
                    <p className="text-gray-600 text-base mt-4 leading-relaxed">{formDescription}</p>
                )}
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Personal Info Section */}
                {config.personalInfo && (
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-primary mb-4">Personal Information</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            {Object.entries(config.personalInfo).map(([key, field]) => {
                                const fieldKey = `personalInfo_${key}`;
                                const isTextArea = key.toLowerCase().includes("address");
                                const isRequired = field.required === "true" || field.required === true;

                                return (
                                    <div key={fieldKey} className={isTextArea ? "md:col-span-2" : ""}>
                                        <label className="text-primary text-sm font-medium mb-2 block">
                                            {field.label}
                                            {isRequired && <span className="text-red-500 ml-1">*</span>}
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
                )}

                {/* Behalf Info Section */}
                {config.behalfInfo && (
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-primary mb-4">Information on Behalf of Patient</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            {Object.entries(config.behalfInfo).map(([key, field]) => {
                                const fieldKey = `behalfInfo_${key}`;
                                const isRequired = field.required === "true" || field.required === true;
                                const shouldShow = key === "submittingForSomeoneElse" || submittingForSomeoneElse === "yes";

                                if (!shouldShow && key !== "submittingForSomeoneElse") return null;

                                return (
                                    <div key={fieldKey} className={key === "submittingForSomeoneElse" ? "md:col-span-2" : ""}>
                                        <label className="text-primary text-sm font-medium mb-2 block">
                                            {field.label}
                                            {isRequired && <span className="text-red-500 ml-1">*</span>}
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
                )}

                {/* Contact Form Fields (simple structure) */}
                {config.contactForm?.fields && (
                    <div className="grid md:grid-cols-2 gap-6">
                        {Object.entries(config.contactForm.fields).map(([fieldKey, field]) => {
                            const isTextArea = fieldKey.toLowerCase().includes("comment");
                            const isRequired = field.label?.includes("*");

                            return (
                                <div key={fieldKey} className={isTextArea ? "md:col-span-2" : ""}>
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
                        })}
                    </div>
                )}

                {/* Flat Fields (Compliment Form) */}
                {config.fields && (
                    <div className="grid md:grid-cols-2 gap-6">
                        {Object.entries(config.fields).map(([fieldKey, field]) => {
                            const isTextArea = fieldKey.toLowerCase().includes("comment");
                            const isRequired = field.required === "true" || field.required === true;

                            return (
                                <div key={fieldKey} className={isTextArea ? "md:col-span-2" : ""}>
                                    <label className="text-primary text-sm font-medium mb-2 block">
                                        {field.label}
                                        {isRequired && <span className="text-red-500 ml-1">*</span>}
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

                {/* Importance Section (Complaint Form) */}
                {config.importance && (
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-primary mb-4">{config.importance.heading}</h3>
                        <Controller
                            name="importance"
                            control={control}
                            render={({ field: f }) => {
                                const selectedValues = Array.isArray(f.value) ? f.value : [];
                                return (
                                    <div className="grid md:grid-cols-2 gap-4">
                                        {config.importance?.options.map((option) => (
                                            <label
                                                key={option.value}
                                                className="flex items-center gap-2 cursor-pointer p-3 bg-primary/5 rounded-lg hover:bg-primary/10 transition-colors"
                                            >
                                                <input
                                                    type="checkbox"
                                                    value={option.value}
                                                    checked={selectedValues.includes(option.value)}
                                                    onChange={(e) => {
                                                        const newValues = e.target.checked
                                                            ? [...selectedValues, option.value]
                                                            : selectedValues.filter((v) => v !== option.value);
                                                        f.onChange(newValues);
                                                    }}
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

                {/* Complaint Text */}
                {config.complaintText && (
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-primary mb-4">{config.complaintText.heading}</h3>
                        <div>
                            <label className="text-primary text-sm font-medium mb-2 block">
                                {config.complaintText.heading}
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

                {/* Access Medical File */}
                {config.accessMedicalFile && (
                    <div>
                        <label className="text-primary text-sm font-medium mb-2 block">
                            {config.accessMedicalFile.label}
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
                            {config.contactPreference.label}
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

                {/* Discussed With Staff */}
                {config.discussedWithStaff && (
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-primary mb-4">Discussion with Staff</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="text-primary text-sm font-medium mb-2 block">
                                    {config.discussedWithStaff.question.label}
                                    <span className="text-red-500 ml-1">*</span>
                                </label>
                                {renderField("discussedWithStaff_question", config.discussedWithStaff.question)}
                                {errors.discussedWithStaff_question && (
                                    <p className="text-xs text-red-500 mt-1">
                                        {errors.discussedWithStaff_question?.message as string}
                                    </p>
                                )}
                            </div>

                            {discussedWithStaff === "yes" && config.discussedWithStaff.staffName && (
                                <div>
                                    <label className="text-primary text-sm font-medium mb-2 block">
                                        {config.discussedWithStaff.staffName.label}
                                    </label>
                                    {renderField("discussedWithStaff_staffName", config.discussedWithStaff.staffName)}
                                </div>
                            )}

                            {discussedWithStaff === "yes" && config.discussedWithStaff.outcome && (
                                <div>
                                    <label className="text-primary text-sm font-medium mb-2 block">
                                        {config.discussedWithStaff.outcome.label}
                                    </label>
                                    {renderField("discussedWithStaff_outcome", config.discussedWithStaff.outcome)}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Assessments Section (Service Enhancement) */}
                {config.assessments && (
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-primary mb-4">Assessments</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            {Object.entries(config.assessments).map(([key, field]) => {
                                const fieldKey = `assessments_${key}`;
                                const isRequired = field.required === "true" || field.required === true;

                                return (
                                    <div key={fieldKey}>
                                        <label className="text-primary text-sm font-medium mb-2 block">
                                            {field.label}
                                            {isRequired && <span className="text-red-500 ml-1">*</span>}
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
                )}

                {/* Feedback Section */}
                {config.feedback && (
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-primary mb-4">Feedback</h3>
                        <div className="grid md:grid-cols-1 gap-6">
                            {Object.entries(config.feedback).map(([key, field]) => {
                                const fieldKey = `feedback_${key}`;
                                const isRequired = field.required === "true" || field.required === true;

                                return (
                                    <div key={fieldKey}>
                                        <label className="text-primary text-sm font-medium mb-2 block">
                                            {field.label}
                                            {isRequired && <span className="text-red-500 ml-1">*</span>}
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
                        <h3 className="text-xl font-semibold text-primary mb-4">Damage Details</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            {Object.entries(config.damageDetails).map(([key, field]) => {
                                const fieldKey = `damageDetails_${key}`;
                                const isTextArea = key.toLowerCase().includes("description");
                                const isRequired = field.required === "true" || field.required === true;

                                return (
                                    <div key={fieldKey} className={isTextArea ? "md:col-span-2" : ""}>
                                        <label className="text-primary text-sm font-medium mb-2 block">
                                            {field.label}
                                            {isRequired && <span className="text-red-500 ml-1">*</span>}
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
                )}

                {/* Incident Details Section */}
                {config.incidentDetails && (
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-primary mb-4">Incident Details</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            {Object.entries(config.incidentDetails).map(([key, field]) => {
                                const fieldKey = `incidentDetails_${key}`;
                                const isTextArea = key.toLowerCase().includes("description") || key.toLowerCase().includes("reason");
                                const isRequired = field.required === "true" || field.required === true;
                                const shouldShow = key === "responsibilityReason" ? staffResponsible === "yes" : true;

                                if (!shouldShow) return null;

                                return (
                                    <div key={fieldKey} className={isTextArea ? "md:col-span-2" : ""}>
                                        <label className="text-primary text-sm font-medium mb-2 block">
                                            {field.label}
                                            {isRequired && <span className="text-red-500 ml-1">*</span>}
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
                )}

                {/* Follow Up Section */}
                {config.followUp && (
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-primary mb-4">Follow Up</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            {Object.entries(config.followUp).map(([key, field]) => {
                                const fieldKey = `followUp_${key}`;
                                const isTextArea = key.toLowerCase().includes("outcome");
                                const isRequired = field.required === "true" || field.required === true;

                                return (
                                    <div key={fieldKey} className={isTextArea ? "md:col-span-2" : ""}>
                                        <label className="text-primary text-sm font-medium mb-2 block">
                                            {field.label}
                                            {isRequired && <span className="text-red-500 ml-1">*</span>}
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
                )}

                {/* Submit Button */}
                <div className="text-center mt-8 pt-6 border-t border-gray-200">
                    <Button type="submit" variant="default" disabled={isSubmitting}>
                        {isSubmitting ? (
                            "Submitting..."
                        ) : (
                            <>
                                {config.submitLabel || config.contactForm?.heading || "Submit"} <ArrowRight />
                            </>
                        )}
                    </Button>
                </div>
            </form>

            {/* Contact Form Notes */}
            {config.contactForm?.noteTitle && (
                <div className="mt-8 pt-6 border-t border-gray-200">
                    <div className="font-medium text-secondary mb-2">{config.contactForm.noteTitle}</div>
                    <p className="text-gray-600 text-sm">{config.contactForm.noteDescription}</p>
                </div>
            )}
        </div>
    );
}

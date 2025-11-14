export interface FieldConfig {
  label: string;
  required: string | boolean;
  placeholder?: string | null;
  options?: Array<{ label: string; value: string }>;
  yesLabel?: string;
  noLabel?: string;
  heading?: string;
}

export interface FormConfig {
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

export interface DynamicFormProps {
  config: FormConfig;
  formSlug: string;
  banner?: {
    title?: string;
    backgroundImage?: string;
  };
}


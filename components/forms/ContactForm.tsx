"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import Input from "../ui/input";
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";

const userSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  familyName: z.string().min(1, "Family name is required"),
  emailAddress: z.string().email("Valid email required"),
  contact: z.string().regex(/^[0-9]{10,15}$/, "Contact must be a valid number"),
  comments: z.string().optional(),
});

type UserFormData = z.infer<typeof userSchema>;

const ContactForm = ({ data }: { data?: any }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
  });

  const onSubmit = async (formValues: UserFormData) => {
    try {
      // Construct FormData
      const formData = new FormData();
      formData.append("type", "contact_us");
      formData.append("first_name", formValues.firstName);
      formData.append("last_name", formValues.familyName);
      formData.append("email", formValues.emailAddress);
      formData.append("contact", formValues.contact);
      if (formValues.comments) formData.append("comments", formValues.comments);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_BASE_URL}/form/contact_us/store`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) {
        throw new Error(`API Error: ${res.statusText}`);
      }

      const response = await res.json();
      console.log("Form submitted successfully:", response);
      alert("Your message has been sent successfully!");
      reset();
    } catch (error) {
      console.error("Form submission failed:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  const fields = data?.fields || {};

  return (
    <section className="section-padding">
      <div className="container">
        <div className="form-container bg-primary/3 section-padding spacing-x rounded-md">
          {/* ===== Header ===== */}
          <div className="text-center mb-10">
            <h2 className="text-center commonTitle font-medium!">
              {data?.heading || "Contact Us"}
            </h2>
            <p className="text-gray-600 text-base leading-relaxed">
              {data?.description}
            </p>
          </div>

          {/* ===== Form ===== */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* First Name */}
            <div>
              <label className="mb-2.5 block">
                {fields?.firstName?.label || "First Name"}
              </label>
              <Input
                className="w-full bg-primary/4 px-4 rounded"
                {...register("firstName")}
                placeholder={fields?.firstName?.placeholder || ""}
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            {/* Family Name */}
            <div>
              <label className="mb-2.5 block">
                {fields?.lastName?.label || "Family Name"}
              </label>
              <Input
                className="w-full bg-primary/4 px-4 rounded"
                {...register("familyName")}
                placeholder={fields?.lastName?.placeholder || ""}
              />
              {errors.familyName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.familyName.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="md:col-span-2">
              <label className="mb-2.5 block">
                {fields?.email?.label || "Email Address"}
              </label>
              <Input
                type="email"
                className="w-full bg-primary/4 px-4 rounded"
                {...register("emailAddress")}
                placeholder={fields?.email?.placeholder || ""}
              />
              {errors.emailAddress && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.emailAddress.message}
                </p>
              )}
            </div>

            {/* Contact */}
            <div className="md:col-span-2">
              <label className="mb-2.5 block">
                {fields?.contact?.label || "Contact"}
              </label>
              <Input
                type="text"
                className="w-full bg-primary/4 px-4 rounded"
                {...register("contact")}
                placeholder={fields?.contact?.placeholder || ""}
              />
              {errors.contact && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.contact.message}
                </p>
              )}
            </div>

            {/* Comments */}
            <div className="md:col-span-2">
              <label className="mb-2.5 block">
                {fields?.comments?.label || "Your Comments"}
              </label>
              <textarea
                rows={5}
                placeholder={fields?.comments?.placeholder || ""}
                {...register("comments")}
                className="w-full bg-primary/4 px-4 rounded min-h-30"
              />
            </div>

            {/* Submit */}
            <div className="md:col-span-2 text-center">
              <Button type="submit" variant="default" disabled={isSubmitting}>
                {isSubmitting ? (
                  "Submitting..."
                ) : (
                  <>
                    {data?.label || "Submit"} <ArrowRight />
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>

        {/* ===== Footer Note ===== */}
        <div className="mt-7">
          <div className="font-medium text-secondary mb-2">
            {data?.noteTitle}
          </div>
          <p>{data?.noteDescription}</p>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;

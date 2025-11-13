import React from "react";
import Contact from "@/components/home/Contact";
import InnerBanner from "@/components/common/InnerBanner";
import ContactForm from "@/components/forms/ContactForm";

export default async function ContactFormPage() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_BASE_URL}/pages/contact`,
    {
      next: {
        revalidate: 10,
      },
    }
  );
  if (!res.ok) throw new Error("Failed to fetch homepage data");

  const {
    data: { content },
  } = await res.json();

  const contactUs = content;

  const data = { ...contactUs?.contactForm, ...contactUs?.submitButton };

  return (
    <>
      <InnerBanner data={data?.banner} />
      <ContactForm data={data} />
      {!!contactUs?.contact && <Contact />}
    </>
  );
}

"use client";

import CallIcon from "@/icons/home-icons/call-icon";
import EmailIcon from "@/icons/home-icons/email-icon";
import Location from "@/icons/home-icons/location-icon";
import { cn } from "@/utils/twMerge";
import React, { useEffect, useState } from "react";

interface ContactData {
    tagline?: string;
    title?: string;
    communicationWays?: Array<{
        communicationName: string;
        wayToCommunicate: string;
        href: string;
    }>;
}

const ContactClient = () => {
    const [contactData, setContactData] = useState<ContactData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContactData = async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_APP_BASE_URL}/pages/contact-common`
                );

                if (!res.ok) throw new Error("Failed to fetch contact data");

                const { data } = await res.json();
                if (data?.content) {
                    setContactData(data.content);
                }
            } catch (err) {
                console.error("Error fetching contact data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchContactData();
    }, []); // Only fetch once on mount

    if (loading) {
        return (
            <section className="section-padding bg-white">
                <div className="container">
                    <div className="text-center py-10">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                        <p className="mt-4 text-gray-600">Loading contact information...</p>
                    </div>
                </div>
            </section>
        );
    }

    if (!contactData) return null;

    const icons = [CallIcon, Location, EmailIcon];

    return (
        <section className="section-padding bg-white">
            <div className="container">
                <div className="text-center mb-12">
                    <p className="tagline mb-2 ">{contactData?.tagline}</p>
                    <h2 className="commonTitle font-bold!  ">{contactData?.title}</h2>
                </div>

                <div className="grid grid-cols-12 gap-7">
                    {contactData?.communicationWays?.map((items: any, index: any) => {
                        const IconComponent = icons[index % icons.length];
                        return (
                            <a
                                key={index}
                                href={items.href}
                                className={cn(
                                    "py-13 col-span-12 sm:col-span-6 md:col-span-4 pl-6 pr-14 rounded-sm",
                                    index === 1 ? "bg-primary" : "bg-[#1F9F9E]"
                                )}
                            >
                                <IconComponent className="mb-4  text-white" />
                                <div className="flex flex-col gap-1">
                                    <span className="font-bold text-lg text-white uppercase">
                                        {items.communicationName}
                                    </span>
                                    <span className="text-base text-white font-normal leading-[1.4]">
                                        {items.wayToCommunicate}
                                    </span>
                                </div>
                            </a>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default ContactClient;


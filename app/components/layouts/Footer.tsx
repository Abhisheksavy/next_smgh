'use client'

import { useGetFooterData } from "@/app/queries/useLayout";
import { Facebook, Twitter, Linkedin, Instagram, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const socialIcons: { [key: string]: any } = {
    facebook: Facebook,
    twitter: Twitter,
    linkedin: Linkedin,
    instagram: Instagram,
};

export default function Footer() {
    const { data, isLoading, isError, error } = useGetFooterData();
    const [chatOpen, setChatOpen] = useState(false);

    if (isLoading) {
        return (
            <footer className="bg-[#006980] text-[#FCFEFE] py-16 px-8 md:px-12">
                <div className="max-w-[1400px] mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="space-y-4">
                                <div className="h-6 w-32 bg-[#2A8FA3] animate-pulse rounded" />
                                <div className="space-y-2">
                                    <div className="h-4 w-full bg-[#2A8FA3] animate-pulse rounded" />
                                    <div className="h-4 w-3/4 bg-[#2A8FA3] animate-pulse rounded" />
                                    <div className="h-4 w-5/6 bg-[#2A8FA3] animate-pulse rounded" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </footer>
        );
    }

    if (isError || !data) {
        return (
            <footer className="bg-[#006980] text-[#FCFEFE] py-16 px-8 md:px-12">
                <div className="max-w-[1400px] mx-auto">
                    <p className="text-red-300 text-sm text-center">
                        Failed to load footer: {error?.message || "Unknown error"}
                    </p>
                </div>
            </footer>
        );
    }

    return (
        <>
            <footer className="bg-[#006980] text-[#FCFEFE] py-16 px-8 md:px-12">
                <div className="max-w-[1400px] mx-auto">
                    {/* Main Footer Content */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-16">
                        {/* Logo & Tagline */}
                        <div className="space-y-4">
                            <Image
                                src={(data.logo as any).src ?? (data.logo as any).url ?? (data.logo as any).image?.src ?? ''}
                                alt="Footer Logo"
                                width={120}
                                height={40}
                                className="object-contain"
                            />
                            <p className="text-base leading-relaxed">{data.logo.tagline}</p>
                        </div>

                        {/* Dynamic Columns */}
                        {data.columns.map((column) => (
                            <div key={column.id} className="space-y-5">
                                <h3 className="text-lg font-semibold text-[#FCFEFE] mb-6">
                                    {column.title}
                                </h3>
                                <ul className="space-y-3">
                                    {column.links.map((link) => (
                                        <li key={link.id}>
                                            <Link
                                                href={link.href}
                                                className="text-base text-[#FCFEFE] hover:text-white transition-colors block leading-relaxed"
                                            >
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Divider */}
                    <div className="border-t border-[#2A8FA3] mb-12"></div>

                    {/* Bottom Section */}
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
                        {/* Copyright and Social Icons */}
                        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
                            <p className="text-[#FCFEFE] text-center md:text-left">
                                {data.copyright}
                            </p>

                            {/* Social Media Icons */}
                            <div className="flex items-center gap-3">
                                {data.socialMedia.map((social) => {
                                    const Icon = socialIcons[social.icon];
                                    return (
                                        <Link
                                            key={social.id}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-9 h-9 rounded-full bg-[#2A8FA3] hover:bg-[#3AA5BA] flex items-center justify-center transition-colors"
                                            aria-label={social.name}
                                        >
                                            {Icon && <Icon className="w-4 h-4 text-[#FCFEFE]" />}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Bottom Links and Accessibility */}
                        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
                            {data.bottomLinks.map((link, index) => (
                                <span key={link.id} className="flex items-center gap-4 md:gap-6">
                                    <Link
                                        href={link.href}
                                        className="text-[#FCFEFE] hover:text-white transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                    {index < data.bottomLinks.length - 1 && (
                                        <span className="text-[#4AA5B8]">|</span>
                                    )}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* WCAG Accessibility - Centered */}
                    <div className="text-center mt-8">
                        <Link
                            href={data.accessibility.href}
                            className="text-[#FCFEFE] hover:text-white transition-colors text-base inline-flex items-center gap-2"
                        >
                            <span className="font-semibold">WCAG</span>
                            <span>{data.accessibility.label}</span>
                        </Link>
                    </div>
                </div>
            </footer>

            {/* Floating Chat Button */}
            {data.chatBot.enabled && (
                <button
                    onClick={() => setChatOpen(!chatOpen)}
                    className="fixed bottom-8 right-8 w-16 h-16 md:w-20 md:h-20 bg-[#42B8CC] rounded-full shadow-2xl hover:shadow-3xl transition-all flex items-center justify-center z-50 hover:scale-105"
                    aria-label="Open chat"
                >
                    <MessageCircle className="w-8 h-8 md:w-10 md:h-10 text-white" />
                </button>
            )}
        </>
    );
}
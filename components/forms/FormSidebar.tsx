"use client";

import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/utils/twMerge";

interface SidebarItem {
    title: string;
}

interface FormSidebarProps {
    items: SidebarItem[];
    activeForm?: string;
    onFormChange?: (formTitle: string) => void;
}

export default function FormSidebar({
    items,
    activeForm,
    onFormChange,
}: FormSidebarProps) {
    const router = useRouter();
    const pathname = usePathname();

    // Normalize title to handle variations (e.g., "Contact Us" and "Contact")
    const normalizeTitle = (title: string): string => {
        const normalized = title.toLowerCase().trim();

        // Handle contact variations
        if (normalized.includes("contact")) {
            return "Contact Us";
        }
        // Handle compliment variations
        if (normalized.includes("compliment")) {
            return "Compliment Form";
        }
        // Handle complaint variations
        if (normalized.includes("complaint")) {
            return "Complaint Form";
        }
        // Handle service enhancement variations
        if (normalized.includes("service") && normalized.includes("enhancement")) {
            return "Service Enhancement Questionnaire";
        }
        // Handle material damage variations
        if (normalized.includes("material") && normalized.includes("damage")) {
            return "Material Damage Claim Form";
        }

        return title;
    };

    // Map normalized form titles to slugs
    const formSlugMap: Record<string, string> = {
        "Contact Us": "contact",
        "Compliment Form": "compliment",
        "Complaint Form": "complaint_suggestion",
        "Service Enhancement Questionnaire": "service_enhancement",
        "Material Damage Claim Form": "material_damage_claim",
    };

    const handleItemClick = (item: SidebarItem) => {
        const normalizedTitle = normalizeTitle(item.title);
        const slug = formSlugMap[normalizedTitle] || item.title.toLowerCase().replace(/\s+/g, "-");

        if (onFormChange) {
            onFormChange(normalizedTitle);
        } else {
            // Navigate to the form page with query param
            router.push(`/complaint?form=${slug}`);
        }
    };

    return (
        <div className="bg-white border border-primary/20 rounded sticky top-2 z-1">
            <nav className=" ">
                {items.map((item, index) => {
                    const normalizedItemTitle = normalizeTitle(item.title);
                    const isActive =
                        activeForm === item.title ||
                        activeForm === normalizedItemTitle ||
                        (pathname.includes("complaint") && index === 0 && !activeForm);

                    return (
                        <button
                            key={index}
                            onClick={() => handleItemClick(item)}
                            className={cn(
                                "w-full text-left px-4 py-3 transition-all duration-200 text-sm font-regular cursor-pointer",
                                isActive
                                    ? "bg-primary text-white shadow-md"
                                    : "bg-white text-[#313131] hover:bg-primary/10 hover:text-primary"
                            )}
                        >
                            {item.title}
                        </button>
                    );
                })}
            </nav>
        </div>
    );
}


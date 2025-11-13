"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/utils/twMerge";

interface SidebarItem {
    title: string;
}

interface PatientCareSidebarProps {
    items: SidebarItem[];
    activeTab?: string;
    onTabChange?: (tabTitle: string) => void;
}

export default function PatientCareSidebar({
    items,
    activeTab,
    onTabChange,
}: PatientCareSidebarProps) {
    const pathname = usePathname();

    // Normalize title to handle variations
    const normalizeTitle = (title: string): string => {
        const normalized = title.toLowerCase().trim();

        // Handle services variations
        if (normalized.includes("service") && !normalized.includes("international")) {
            return "Services";
        }
        // Handle international patient services
        if (normalized.includes("international")) {
            return "International Patient Services";
        }
        // Handle medical specialties
        if (normalized.includes("medical") && normalized.includes("specialt")) {
            return "Medical Specialties";
        }
        // Handle family & visitors
        if (normalized.includes("family") || normalized.includes("visitor")) {
            return "Family & Visitors";
        }
        // Handle admission and discharge
        if (normalized.includes("admission") || normalized.includes("discharge")) {
            return "Admission And Discharge";
        }
        // Handle payments and billing
        if (normalized.includes("payment") || normalized.includes("billing")) {
            return "Payments And Billing";
        }
        // Handle rights and responsibilities
        if (normalized.includes("right") || normalized.includes("responsibilit")) {
            return "Patient Rights And Responsibilities";
        }
        // Handle compliments and complaints
        if (normalized.includes("compliment") || normalized.includes("complaint")) {
            return "Compliments And Complaints";
        }
        // Handle patient information
        if (normalized.includes("patient") && normalized.includes("information")) {
            return "Patient Information";
        }

        return title;
    };

    return (
        <div className="bg-white border border-gray-200 rounded-lg p-4">
            <nav className="space-y-2">
                {items.map((item, index) => {
                    const normalizedItemTitle = normalizeTitle(item.title);
                    const isActive =
                        activeTab === item.title ||
                        activeTab === normalizedItemTitle ||
                        (pathname.includes("patient") && index === 0 && !activeTab);

                    return (
                        <button
                            key={index}
                            onClick={() => {
                                if (onTabChange) {
                                    onTabChange(normalizedItemTitle);
                                }
                            }}
                            className={cn(
                                "w-full text-left px-4 py-3 rounded-lg transition-all duration-200 text-sm font-medium",
                                isActive
                                    ? "bg-primary text-white shadow-md"
                                    : "bg-gray-50 text-gray-700 hover:bg-primary/10 hover:text-primary"
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


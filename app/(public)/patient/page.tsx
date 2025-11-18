"use client";

import { useEffect, useState, Suspense } from "react";
import PatientCareSidebar from "@/components/patient-care/PatientCareSidebar";
import DynamicPatientContent from "@/components/patient-care/DynamicPatientContent";
import InnerBanner from "@/components/common/InnerBanner";
import { useSearchParams } from "next/navigation";

interface SidebarItem {
  title: string;
}

interface PatientCareData {
  banner?: {
    title?: string;
    backgroundImage?: string;
  };
  [key: string]: any;
}

function PatientCarePageContent() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab") || "patient-care-services";

  const [sidebarItems, setSidebarItems] = useState<SidebarItem[]>([]);
  const [pageContent, setPageContent] = useState<PatientCareData | null>(null);
  const [activeTab, setActiveTab] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentTabSlug, setCurrentTabSlug] = useState<string>("");

  // Normalize title to handle variations
  const normalizeTitle = (title: string): string => {
    const normalized = title.toLowerCase().trim();

    if (normalized.includes("service") && !normalized.includes("international")) {
      return "Services";
    }
    if (normalized.includes("international")) {
      return "International Patient Services";
    }
    if (normalized.includes("medical") && normalized.includes("specialt")) {
      return "Medical Specialties";
    }
    if (normalized.includes("family") || normalized.includes("visitor")) {
      return "Family & Visitors";
    }
    if (normalized.includes("admission") || normalized.includes("discharge")) {
      return "Admission And Discharge";
    }
    if (normalized.includes("payment") || normalized.includes("billing")) {
      return "Payments And Billing";
    }
    if (normalized.includes("right") || normalized.includes("responsibilit")) {
      return "Patient Rights And Responsibilities";
    }
    if (normalized.includes("compliment") || normalized.includes("complaint")) {
      return "Compliments And Complaints";
    }
    if (normalized.includes("patient") && normalized.includes("information")) {
      return "Patient Information";
    }

    return title;
  };

  // Map tab titles to slugs
  const tabSlugMap: Record<string, string> = {
    "Services": "patient-care-services",
    "International Patient Services": "patient-care-international",
    "Medical Specialties": "patient-care-medical-specialties",
    "Family & Visitors": "patient-care-family-visitors",
    "Admission And Discharge": "patient-care-admission-discharge",
    "Payments And Billing": "patient-care-payment-billing",
    "Patient Rights And Responsibilities": "patient-care-rights-responsibilities",
    "Compliments And Complaints": "patient-care-compliments-complaints",
    "Patient Information": "patient-care-patient-information",
  };

  // Map slugs to titles
  const slugTitleMap: Record<string, string> = {
    "patient-care-services": "Services",
    "patient-care-international": "International Patient Services",
    "patient-care-medical-specialties": "Medical Specialties",
    "patient-care-family-visitors": "Family & Visitors",
    "patient-care-admission-discharge": "Admission And Discharge",
    "patient-care-payment-billing": "Payments And Billing",
    "patient-care-rights-responsibilities": "Patient Rights And Responsibilities",
    "patient-care-compliments-complaints": "Compliments And Complaints",
    "patient-care-patient-information": "Patient Information",
  };

  // Fetch sidebar items
  const fetchSidebarItems = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_BASE_URL}/pages/patient-care-tab`
      );

      if (!res.ok) throw new Error("Failed to fetch sidebar items");

      const { data } = await res.json();
      const items = data?.content?.items || [];
      setSidebarItems(items);

      // Set active tab based on URL param
      if (tabParam) {
        const title = slugTitleMap[tabParam] || normalizeTitle(items[0]?.title || "");
        setActiveTab(title);
      } else if (items.length > 0) {
        setActiveTab(normalizeTitle(items[0].title));
      }
    } catch (err: any) {
      console.error("Error fetching sidebar:", err);
      setError(err.message);
    }
  };

  // Fetch page content
  const fetchPageContent = async (tabSlug: string) => {
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_BASE_URL}/pages/${tabSlug}`
      );

      if (!res.ok) throw new Error(`Failed to fetch page: ${tabSlug}`);

      const { data } = await res.json();
      const content = data?.content;
      const banner = data?.content?.banner;

      if (content) {
        setPageContent({ ...content, banner });
      } else {
        setPageContent(null);
        setError("This page is currently unavailable.");
      }
    } catch (err: any) {
      console.error("Error fetching page content:", err);
      setError(err.message);
      setPageContent(null);
    } finally {
      setLoading(false);
    }
  };

  // Handle tab change
  const handleTabChange = (tabTitle: string) => {
    const normalizedTitle = normalizeTitle(tabTitle);
    setActiveTab(normalizedTitle);

    // Update URL without page reload
    const slug = tabSlugMap[normalizedTitle] || tabTitle.toLowerCase().replace(/\s+/g, "-");
    const url = new URL(window.location.href);
    url.searchParams.set("tab", slug);
    window.history.pushState({}, "", url.toString());
    // Note: fetchPageContent will be called by useEffect when activeTab changes
  };

  useEffect(() => {
    fetchSidebarItems();
  }, []);

  // Set active tab from URL param when sidebar items are loaded
  useEffect(() => {
    if (sidebarItems.length > 0) {
      const title = slugTitleMap[tabParam] || normalizeTitle(sidebarItems[0]?.title || "");
      if (title && title !== activeTab) {
        setActiveTab(title);
        setError(null);
        // Reset currentTabSlug when tab changes to allow fetching
        setCurrentTabSlug("");
      }
    }
  }, [sidebarItems, tabParam]);

  // Fetch page content when active tab changes
  useEffect(() => {
    if (activeTab && sidebarItems.length > 0) {
      const slug = tabSlugMap[activeTab] || tabParam;
      // Only fetch if it's a different tab to prevent duplicate calls
      if (slug && slug !== currentTabSlug) {
        setCurrentTabSlug(slug);
        fetchPageContent(slug);
      }
    }
  }, [activeTab, sidebarItems]);

  if (error && !pageContent) {
    return (
      <div className="section-padding">
        <div className="container">
          <div className="text-center py-10">
            <p className="text-red-500">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <InnerBanner
        data={{
          title: pageContent?.banner?.title || activeTab || "Patient Care",
          backgroundImage: pageContent?.banner?.backgroundImage || "/images/banner.png",
        }}
      />
      <section className="section-padding">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Sidebar */}
            <div className="md:col-span-4 lg:col-span-3">
              <PatientCareSidebar
                items={sidebarItems}
                activeTab={activeTab}
                onTabChange={handleTabChange}
              />
            </div>

            {/* Content */}
            <div className="md:col-span-8 lg:col-span-9">
              {loading ? (
                <div className="bg-white rounded-lg p-10">
                  <div className="text-center py-10">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    <p className="mt-4 text-gray-600">Loading content...</p>
                  </div>
                </div>
              ) : pageContent ? (
                <div className="bg-primary/3- rounded-lg- px-7- py-10-">
                  <DynamicPatientContent
                    content={pageContent}
                    slug={tabSlugMap[activeTab] || tabParam}
                  />
                </div>
              ) : (
                <div className="bg-white rounded-lg p-10">
                  <div className="text-center py-10">
                    <p className="text-gray-500">Content not available.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default function PatientCarePage() {
  return (
    <Suspense
      fallback={
        <div className="section-padding">
          <div className="container">
            <div className="text-center py-10">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <p className="mt-4 text-gray-600">Loading...</p>
            </div>
          </div>
        </div>
      }
    >
      <PatientCarePageContent />
    </Suspense>
  );
}

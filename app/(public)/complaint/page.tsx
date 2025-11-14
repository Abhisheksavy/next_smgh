"use client";

import { useEffect, useState, Suspense, useRef } from "react";
import FormSidebar from "@/components/forms/FormSidebar";
import DynamicForm from "@/components/forms/DynamicForm";
import InnerBanner from "@/components/common/InnerBanner";
import { useSearchParams } from "next/navigation";
import LatestNews from "@/components/home/LatestNews";
import ContactClient from "@/components/home/ContactClient";

interface SidebarItem {
  title: string;
}

interface FormData {
  fields?: Record<string, any>;
  heading?: string;
  submitLabel?: string;
  enabled?: string | boolean;
  banner?: {
    title?: string;
    backgroundImage?: string;
  };
  [key: string]: any; // Allow other properties from API
}

function ComplaintPageContent() {
  const searchParams = useSearchParams();
  const formParam = searchParams.get("form") || "compliment-form";

  const [sidebarItems, setSidebarItems] = useState<SidebarItem[]>([]);
  const [formConfig, setFormConfig] = useState<FormData | null>(null);
  const [activeForm, setActiveForm] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentFormSlug, setCurrentFormSlug] = useState<string>("");
  const previousFormParam = useRef<string>("");

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

  // Map form slugs to normalized titles
  const formTitleMap: Record<string, string> = {
    contact: "Contact Us",
    "contact-us": "Contact Us",
    "compliment-form": "Compliment Form",
    "complaint-form": "Complaint Form",
    "service-enhancement-questionnaire": "Service Enhancement Questionnaire",
    "material-damage-claim-form": "Material Damage Claim Form",
  };

  // Map normalized form titles to slugs
  const formSlugMap: Record<string, string> = {
    "Contact Us": "contact",
    "Compliment Form": "compliment-form",
    "Complaint Form": "complaint-form",
    "Service Enhancement Questionnaire": "service-enhancement-questionnaire",
    "Material Damage Claim Form": "material-damage-claim-form",
  };

  // Fetch sidebar items
  const fetchSidebarItems = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_BASE_URL}/pages/form-tab`
      );

      if (!res.ok) throw new Error("Failed to fetch sidebar items");

      const { data } = await res.json();
      const items = data?.content?.items || [];
      setSidebarItems(items);
      // Don't set activeForm here - let the useEffect handle it
    } catch (err: any) {
      console.error("Error fetching sidebar:", err);
      setError(err.message);
    }
  };

  // Fetch form configuration
  const fetchFormConfig = async (formSlug: string) => {
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_BASE_URL}/pages/${formSlug}`
      );

      if (!res.ok) throw new Error(`Failed to fetch form: ${formSlug}`);

      const { data } = await res.json();
      const config = data?.content;
      const banner = data?.content?.banner;

      if (config && (config.enabled !== "false" || config.contact === "true")) {
        setFormConfig({ ...config, banner });
      } else {
        setFormConfig(null);
        setError("This form is currently unavailable.");
      }
      setLoading(false);
    } catch (err: any) {
      console.error("Error fetching form:", err);
      setError(err.message);
      setFormConfig(null);
    } finally {
      setLoading(false);
    }
  };

  // Handle form change
  const handleFormChange = (formTitle: string) => {
    const normalizedTitle = normalizeTitle(formTitle);
    setActiveForm(normalizedTitle);

    // Update URL without page reload
    const slug =
      formSlugMap[normalizedTitle] ||
      formTitle.toLowerCase().replace(/\s+/g, "-");
    const url = new URL(window.location.href);
    url.searchParams.set("form", slug);
    window.history.pushState({}, "", url.toString());
    // Update previousFormParam to prevent unnecessary re-fetching
    previousFormParam.current = slug;
    // Reset currentFormSlug to allow fetching new form
    setCurrentFormSlug("");
    // Note: fetchFormConfig will be called by useEffect when activeForm changes
  };

  useEffect(() => {
    fetchSidebarItems();
  }, []); // Only fetch sidebar items once on mount

  // Set active form from URL param when sidebar items are loaded
  useEffect(() => {
    if (sidebarItems.length > 0) {
      // Only update if formParam actually changed
      if (formParam !== previousFormParam.current) {
        const title =
          formTitleMap[formParam] || normalizeTitle(sidebarItems[0]?.title || "");
        if (title && title !== activeForm) {
          setActiveForm(title);
          // Reset currentFormSlug when formParam changes to allow fetching
          setCurrentFormSlug("");
          previousFormParam.current = formParam;
        }
      } else if (!activeForm) {
        // Initial setup when activeForm is empty
        const title =
          formTitleMap[formParam] || normalizeTitle(sidebarItems[0]?.title || "");
        if (title) {
          setActiveForm(title);
          setCurrentFormSlug("");
          previousFormParam.current = formParam;
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sidebarItems, formParam]); // activeForm intentionally excluded to prevent loops

  // Fetch form config when active form changes
  useEffect(() => {
    if (activeForm && sidebarItems.length > 0) {
      const slug = formSlugMap[activeForm] || formParam;
      // Only fetch if it's a different form to prevent duplicate calls
      if (slug !== currentFormSlug) {
        setCurrentFormSlug(slug);
        fetchFormConfig(slug);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeForm, sidebarItems]); // formParam and currentFormSlug intentionally excluded

  if (error && !formConfig) {
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
          title: formConfig?.banner?.title || activeForm || "Forms",
          backgroundImage:
            formConfig?.banner?.backgroundImage || "/images/banner.png",
        }}
      />
      <section className="section-padding">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Sidebar */}
            <div className="md:col-span-4 lg:col-span-3">
              <FormSidebar
                items={sidebarItems}
                activeForm={activeForm}
                onFormChange={handleFormChange}
              />
            </div>

            {/* Form Content */}
            <div className="md:col-span-8 lg:col-span-9">
              {loading ? (
                <div className="form-container bg-primary/3 section-padding spacing-x rounded-md">
                  <div className="text-center py-10">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    <p className="mt-4 text-gray-600">Loading form...</p>
                  </div>
                </div>
              ) : formConfig ? (
                <>
                  <DynamicForm
                    config={formConfig as any}
                    formSlug={formSlugMap[activeForm] || formParam}
                    banner={formConfig.banner}
                  />
                  {formConfig?.contact === "true" && <ContactClient />}
                </>
              ) : (
                <div className="form-container bg-primary/3 section-padding spacing-x rounded-md">
                  <div className="text-center py-10">
                    <p className="text-gray-500">Form not available.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* {formConfig?.latestNews && <LatestNews data={data?.latestNews} />} */}

    </>
  );
}

export default function ComplaintPage() {
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
      <ComplaintPageContent />
    </Suspense>
  );
}

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
     const tabParam = searchParams.get("tab") || "compliment-form";

     const [sidebarItems, setSidebarItems] = useState<SidebarItem[]>([]);
     const [formConfig, setFormConfig] = useState<FormData | null>(null);
     const [activeTab, setActiveTab] = useState<string>("");
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState<string | null>(null);
     const [currentTabSlug, setCurrentTabSlug] = useState<string>("");
     const previousTabParam = useRef<string>("");

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

     // Map tab slugs to normalized titles
     const tabTitleMap: Record<string, string> = {
          contact: "Contact Us",
          "contact-us": "Contact Us",
          "compliment-form": "Compliment Form",
          "complaint-form": "Complaint Form",
          "service-enhancement-questionnaire": "Service Enhancement Questionnaire",
          "material-damage-claim-form": "Material Damage Claim Form",
     };

     // Map normalized tab titles to slugs
     const tabSlugMap: Record<string, string> = {
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

     // Fetch tab configuration
     const fetchFormConfig = async (tabSlug: string) => {
          try {
               setLoading(true);
               const res = await fetch(
                    `${process.env.NEXT_PUBLIC_APP_BASE_URL}/pages/${tabSlug}`
               );

               if (!res.ok) throw new Error(`Failed to fetch tab: ${tabSlug}`);

               const { data } = await res.json();
               const config = data?.content;
               const banner = data?.content?.banner;

               if (config && (config.enabled !== "false" || config.contact === "true")) {
                    setFormConfig({ ...config, banner });
               } else {
                    setFormConfig(null);
                    setError("This tab is currently unavailable.");
               }
               setLoading(false);
          } catch (err: any) {
               console.error("Error fetching tab:", err);
               setError(err.message);
               setFormConfig(null);
          } finally {
               setLoading(false);
          }
     };

     // Handle tab change
     const handleFormChange = (tabTitle: string) => {
          const normalizedTitle = normalizeTitle(tabTitle);
          setActiveTab(normalizedTitle);

          // Update URL without page reload
          const slug =
               tabSlugMap[normalizedTitle] ||
               tabTitle.toLowerCase().replace(/\s+/g, "-");
          const url = new URL(window.location.href);
          url.searchParams.set("tab", slug);
          window.history.pushState({}, "", url.toString());
          // Update previousTabParam to prevent unnecessary re-fetching
          previousTabParam.current = slug;
          // Reset currentTabSlug to allow fetching new tab
          setCurrentTabSlug("");
          // Note: fetchFormConfig will be called by useEffect when activeTab changes
     };

     useEffect(() => {
          fetchSidebarItems();
     }, []); // Only fetch sidebar items once on mount

     // Set active tab from URL param when sidebar items are loaded
     useEffect(() => {
          if (sidebarItems.length > 0) {
               // Only update if tabParam actually changed
               if (tabParam !== previousTabParam.current) {
                    const title =
                         tabTitleMap[tabParam] || normalizeTitle(sidebarItems[0]?.title || "");
                    if (title && title !== activeTab) {
                         setActiveTab(title);
                         // Reset currentTabSlug when tabParam changes to allow fetching
                         setCurrentTabSlug("");
                         previousTabParam.current = tabParam;
                    }
               } else if (!activeTab) {
                    // Initial setup when activeTab is empty
                    const title =
                         tabTitleMap[tabParam] || normalizeTitle(sidebarItems[0]?.title || "");
                    if (title) {
                         setActiveTab(title);
                         setCurrentTabSlug("");
                         previousTabParam.current = tabParam;
                    }
               }
          }
          // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [sidebarItems, tabParam]); // activeTab intentionally excluded to prevent loops

     // Fetch tab config when active tab changes
     useEffect(() => {
          if (activeTab && sidebarItems.length > 0) {
               const slug = tabSlugMap[activeTab] || tabParam;
               // Only fetch if it's a different tab to prevent duplicate calls
               if (slug !== currentTabSlug) {
                    setCurrentTabSlug(slug);
                    fetchFormConfig(slug);
               }
          }
          // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [activeTab, sidebarItems]); // tabParam and currentTabSlug intentionally excluded

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
                         title: formConfig?.banner?.title || activeTab || "Tabs",
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
                                        activeForm={activeTab}
                                        onFormChange={handleFormChange}
                                   />
                              </div>

                              {/* Tab Content */}
                              <div className="md:col-span-8 lg:col-span-9">
                                   {loading ? (
                                        <div className="form-container bg-primary/3 section-padding spacing-x rounded-md">
                                             <div className="text-center py-10">
                                                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                                                  <p className="mt-4 text-gray-600">Loading tab...</p>
                                             </div>
                                        </div>
                                   ) : formConfig ? (
                                        <>
                                             <DynamicForm
                                                  config={formConfig as any}
                                                  formSlug={tabSlugMap[activeTab] || tabParam}
                                                  banner={formConfig.banner}
                                             />
                                             {/* {formConfig?.contact === "true" && <ContactClient />} */}
                                        </>
                                   ) : (
                                        <div className="form-container bg-primary/3 section-padding spacing-x rounded-md">
                                             <div className="text-center py-10">
                                                  <p className="text-gray-500">Tab not available.</p>
                                             </div>
                                        </div>
                                   )}
                              </div>
                         </div>
                    </div>
               </section>

               {loading ? null : formConfig ? (
                    <>{formConfig?.contact === "true" && <ContactClient />}</>
               ) : null}

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

"use client";

import { useGetHeaderData, useGetPatientCareTabData } from "@/queries/useLayout";
import { ChevronDown, Globe, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/twMerge";

export default function Header({ header }: { header?: any }) {
     const pathname = usePathname();
     // const { data, isLoading, isError, error } = useGetHeaderData();
     const { data: patientCareData } = useGetPatientCareTabData();
     const [openDropdown, setOpenDropdown] = useState<string | null>(null);
     const [languageOpen, setLanguageOpen] = useState(false);
     const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
     const [navigationWithDropdown, setNavigationWithDropdown] = useState<any[]>([]);
     console.log("header", header);

     // Close mobile menu on resize to desktop
     useEffect(() => {
          const handleResize = () => {
               if (window.innerWidth >= 1024) {
                    setMobileMenuOpen(false);
               }
          };

          window.addEventListener("resize", handleResize);
          return () => window.removeEventListener("resize", handleResize);
     }, []);

     // Prevent body scroll when mobile menu is open
     useEffect(() => {
          if (mobileMenuOpen) {
               document.body.style.overflow = "hidden";
          } else {
               document.body.style.overflow = "unset";
          }
     }, [mobileMenuOpen]);

     // Helper function to process children with patient?tab= format
     const processChildrenWithTabFormat = (children: any[]) => {
          return children.map((child: any, idx: number) => {
               let href = child.href || "";
               let label = child.label || "";

               // If href is like 'patient-care-services' (without /patient?tab=), convert it
               if (href && !href.includes("?tab=") && !href.startsWith("/")) {
                    href = `/patient?tab=${href}`;
               } else if (href && !href.startsWith("/") && !href.includes("?")) {
                    href = `/patient?tab=${href}`;
               }

               // Generate label from href if missing
               if (!label && href) {
                    // Extract tab name from href
                    let tabName = "";
                    if (href.includes("?tab=")) {
                         const tabMatch = href.match(/tab=([^&]+)/);
                         if (tabMatch) {
                              tabName = tabMatch[1];
                         }
                    } else {
                         // Get last part of path
                         const pathParts = href.split("/").filter(Boolean);
                         if (pathParts.length > 0) {
                              tabName = pathParts[pathParts.length - 1];
                         }
                    }

                    // Map slugs to proper titles (matching patient page)
                    const slugToTitleMap: Record<string, string> = {
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

                    // Use mapped title if available
                    if (slugToTitleMap[tabName]) {
                         label = slugToTitleMap[tabName];
                    } else {
                         // Fallback: generate label from tab name
                         const cleanTabName = tabName.replace(/^patient-care-/, "");
                         label = cleanTabName
                              .split("-")
                              .map((word: string, wordIdx: number) => {
                                   const capitalized = word.charAt(0).toUpperCase() + word.slice(1);
                                   // Handle common words
                                   if (wordIdx > 0 && (word === "and" || word === "or" || word === "of")) {
                                        return word.toLowerCase();
                                   }
                                   return capitalized;
                              })
                              .join(" ");
                    }
               }

               return {
                    id: child.id || `patient-care-${idx}`,
                    label: label || `Item ${idx + 1}`,
                    href: href || "#",
               };
          });
     };

     // Update navigation for index 1 (Services) as link and index 2 (Patient Care) with dropdown
     useEffect(() => {
          const patientCareItems = patientCareData?.content?.items || [];

          if (header?.navigation) {
               const updatedNavigation = header.navigation.map((item: any, index: number) => {
                    // Index 1 (Services) - convert to single link with patient?tab= format
                    if (index === 1) {
                         let href = item.href || "";

                         // If href already has ?tab= format, ensure it starts with /
                         if (href.includes("?tab=")) {
                              if (!href.startsWith("/")) {
                                   href = `/${href}`;
                              }
                         } else {
                              // Convert href to patient?tab=patient-care-services format
                              // If href is like 'patient-care-services', use it directly
                              // Otherwise convert it
                              if (href && !href.startsWith("/") && !href.startsWith("http")) {
                                   // If it's already in the right format (starts with patient-care-), use it
                                   if (href.startsWith("patient-care-")) {
                                        href = `/patient?tab=${href}`;
                                   } else {
                                        // Otherwise, convert and add patient-care- prefix
                                        const slug = href.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "and");
                                        href = `/patient?tab=patient-care-${slug}`;
                                   }
                              } else if (href && href.startsWith("/")) {
                                   // If it's already a path like /patient-care-services, extract and convert
                                   const pathParts = href.split("/").filter(Boolean);
                                   if (pathParts.length > 0) {
                                        const lastPart = pathParts[pathParts.length - 1];
                                        if (lastPart.startsWith("patient-care-")) {
                                             href = `/patient?tab=${lastPart}`;
                                        } else {
                                             href = `/patient?tab=patient-care-${lastPart}`;
                                        }
                                   }
                              }
                         }

                         return {
                              ...item,
                              href: href,
                              children: undefined, // Remove children to make it a link, not dropdown
                         };
                    }

                    // Index 2 (Patient Care) - keep dropdown with patient?tab= format
                    if (index === 2) {
                         // Check if item already has children with href format like 'patient-care-services'
                         if (item.children && Array.isArray(item.children) && item.children.length > 0) {
                              // Process existing children
                              return {
                                   ...item,
                                   children: processChildrenWithTabFormat(item.children),
                              };
                         }

                         // If we have patient care items from API, use them
                         if (patientCareItems.length > 0) {
                              return {
                                   ...item,
                                   children: patientCareItems.map((careItem: any, idx: number) => {
                                        // Generate URL-friendly slug from title
                                        const slug = careItem.title
                                             .toLowerCase()
                                             .replace(/\s+/g, "-")
                                             .replace(/&/g, "and")
                                             .replace(/[^a-z0-9-]/g, "");
                                        return {
                                             id: `patient-care-${idx}`,
                                             label: careItem.title,
                                             href: `/patient?tab=patient-care-${slug}`,
                                        };
                                   }),
                              };
                         }
                    }
                    return item;
               });
               setNavigationWithDropdown(updatedNavigation);
          }
     }, [header?.navigation, patientCareData]);

     console.log("data.navigation", header?.navigation);
     if (!header) {
          return (
               <header className="bg-primary py-3 md:py-4 px-4 md:px-6">
                    <nav className="container flex items-center justify-between">
                         <div className="flex gap-4 md:gap-8">
                              {[1, 2, 3].map((i) => (
                                   <div
                                        key={i}
                                        className="h-5 md:h-6 w-16 md:w-20 bg-teal-600 animate-pulse rounded"
                                   />
                              ))}
                         </div>
                         <div className="flex items-center gap-3 md:gap-4">
                              <div className="h-5 md:h-6 w-12 md:w-16 bg-teal-600 animate-pulse rounded" />
                              <div className="h-8 md:h-10 w-32 md:w-48 bg-teal-500 animate-pulse rounded-full" />
                         </div>
                    </nav>
               </header>
          );
     }

     if (!header || !header.navigation) {
          return (
               <header className="bg-primary py-3 md:py-4 px-4 md:px-6">
                    <div className="container">
                         <p className="text-red-300 text-xs md:text-sm text-center">
                              Failed to load header
                              {/* : {error?.message || "Unknown error"} */}
                         </p>
                    </div>
               </header>
          );
     }

     return (
          <header className="bg-primary py-3 md:py-4 px-4 md:px-6 relative">
               <nav className="container flex items-center justify-between">
                    {/* Mobile Menu Button */}
                    <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                         className="lg:hidden text-white p-2 hover:bg-teal-600 rounded-md transition-colors"
                         aria-label="Toggle menu"
                    >
                         {mobileMenuOpen ? (
                              <X className="w-6 h-6" />
                         ) : (
                              <Menu className="w-6 h-6" />
                         )}
                    </button>

                    {/* Desktop Navigation Links */}
                    <ul className="hidden lg:flex items-center gap-6 xl:gap-8">
                         {(navigationWithDropdown.length > 0 ? navigationWithDropdown : header?.navigation || []).map((item: any) => (
                              <li key={item.id} className="relative">
                                   {item.children ? (
                                        <div className="relative">
                                             <button
                                                  onClick={() =>
                                                       setOpenDropdown(openDropdown === item.id ? null : item.id)
                                                  }
                                                  className="flex items-center gap-1 text-white text-sm xl:text-base hover:text-teal-200 transition-colors"
                                             >
                                                  {item.label}
                                                  <ChevronDown className="w-4 h-4" />
                                             </button>

                                             {openDropdown === item.id && item.children && (
                                                  <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg py-2 min-w-48 z-50">
                                                       {item.children.map((child: any) => (
                                                            <Link
                                                                 key={child.id}
                                                                 href={child.href || "#"}
                                                                 className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-primary transition-colors capitalize"
                                                                 onClick={() => setOpenDropdown(null)}
                                                            >
                                                                 {child.label}
                                                            </Link>
                                                       ))}
                                                  </div>
                                             )}
                                        </div>

                                   ) : (
                                        <Link
                                             href={item.id === "home" ? "/" : item.href || "#"}
                                             className={cn("text-white text-sm xl:text-base font-regular hover:text-teal-200 transition-colors cursor-pointer",
                                                  item.href === pathname ? "text-[#1F9F9E]" : ""
                                             )}
                                        >
                                             {item.label}
                                        </Link>
                                   )}
                              </li>
                         ))}
                    </ul>

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-2 md:gap-4">
                         {/* Language Selector */}
                         <div className="relative">
                              <button
                                   onClick={() => setLanguageOpen(!languageOpen)}
                                   className="flex items-center gap-1.5 md:gap-2 text-white hover:text-teal-200 transition-colors text-sm md:text-base"
                              >
                                   <Globe className="w-4 h-4" />
                                   <span className="hidden sm:inline">{header?.language.current}</span>
                                   <ChevronDown className="w-3 h-3 md:w-4 md:h-4" />
                              </button>

                              {languageOpen && (
                                   <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg py-2 min-w-32 z-50">
                                        {header?.language?.options.map((option: any) => (
                                             <button
                                                  key={option.code}
                                                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-primary transition-colors"
                                                  onClick={() => {
                                                       setLanguageOpen(false);
                                                       // Handle language change here
                                                  }}
                                             >
                                                  {option.label}
                                             </button>
                                        ))}
                                   </div>
                              )}
                         </div>

                         {/* CTA Button */}
                         <Link
                              href={header?.cta?.href || "/"}
                              className="bg-teal-500 hover:bg-teal-400 text-white px-3 md:px-6 py-2 md:py-2.5 rounded-full transition-colors font-medium text-xs md:text-sm whitespace-nowrap"
                         >
                              <span className="hidden sm:inline">{header?.cta?.label}</span>
                              <span className="sm:hidden">Appointment</span>
                         </Link>
                    </div>
               </nav>

               {/* Mobile Menu Overlay */}
               {mobileMenuOpen && (
                    <div
                         className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                         onClick={() => setMobileMenuOpen(false)}
                    />
               )}

               {/* Mobile Menu */}
               <div
                    className={`fixed top-0 left-0 h-full w-72 bg-primary z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
                         }`}
               >
                    <div className="flex items-center justify-between p-4 border-b border-teal-600">
                         <h2 className="text-white font-semibold text-lg">Menu</h2>
                         <button
                              onClick={() => setMobileMenuOpen(false)}
                              className="text-white p-2 hover:bg-teal-600 rounded-md transition-colors"
                         >
                              <X className="w-5 h-5" />
                         </button>
                    </div>

                    <ul className="py-4">
                         {(navigationWithDropdown.length > 0 ? navigationWithDropdown : header?.navigation || []).map((item: any) => (
                              <li key={item.id} className="border-b border-teal-600">
                                   {item.children ? (

                                        <div>
                                             <button
                                                  onClick={() =>
                                                       setOpenDropdown(openDropdown === item.id ? null : item.id)
                                                  }
                                                  className="w-full flex items-center justify-between px-6 py-3 text-white hover:bg-teal-600 transition-colors"
                                             >
                                                  {item.label}
                                                  <ChevronDown
                                                       className={`w-4 h-4 transition-transform ${openDropdown === item.id ? "rotate-180" : ""
                                                            }`}
                                                  />
                                             </button>

                                             {openDropdown === item.id && item.children && (
                                                  <div className="bg-primary">
                                                       {item.children.map((child: any) => (
                                                            <Link
                                                                 key={child.id}
                                                                 href={child.href || "#"}
                                                                 className="block px-10 py-2.5 text-white text-sm hover:bg-primary transition-colors capitalize"
                                                                 onClick={() => {
                                                                      setOpenDropdown(null);
                                                                      setMobileMenuOpen(false);
                                                                 }}
                                                            >
                                                                 {child.label}
                                                            </Link>
                                                       ))}
                                                  </div>
                                             )}
                                        </div>

                                   ) : (

                                        <Link
                                             href={item.id === "home" ? "/" : item.href || "#"}
                                             className={`block px-6 py-3 text-white hover:bg-teal-600 transition-colors ${item.id === "home" ? "opacity-60" : ""
                                                  }`}
                                             onClick={() => setMobileMenuOpen(false)}
                                        >
                                             {item.label}
                                        </Link>
                                   )}
                              </li>
                         ))}
                    </ul>
               </div>
          </header>
     );
}

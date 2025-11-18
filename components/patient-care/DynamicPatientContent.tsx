"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/twMerge";

interface DynamicPatientContentProps {
     content: any;
     slug: string;
}

export default function DynamicPatientContent({
     content,
     slug,
}: DynamicPatientContentProps) {
     const [activeTab, setActiveTab] = useState<string>("patientRights");

     // Render Services page (cards grid)
     if (content.cards && Array.isArray(content.cards)) {
          return (
               <div className="space-y-8">
                    {/* Intro Section */}
                    {content.intro && (
                         <div className="space-y-4">
                              <h2 className="commonTitle fw-medium!">{content.intro.title}</h2>
                              {content.intro.description && (
                                   <p className="text-gray-600 text-base leading-relaxed">
                                        {content.intro.description}
                                   </p>
                              )}
                         </div>
                    )}

                    {/* Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                         {content.cards.map((card: any, index: number) => (
                              <div
                                   key={index}
                                   className="bg-primary/3 p-4 rounded-lg   "
                              >
                                   <h3 className="text-xl font-medium text-black mb-2">
                                        {card.title}
                                   </h3>
                                   <p className="text-black text-sm leading-relaxed mb-4">
                                        {card.description}
                                   </p>
                                   <Link
                                        href="#"
                                        className="text-secondary text-sm font-regular inline-flex items-center gap-2 hover:text-primary transition-colors hover:[&>svg]:text-secondary "
                                   >
                                        Read More <ArrowRight className="w-4 h-4 text-primary transition-colors  " />
                                   </Link>
                              </div>
                         ))}
                    </div>
               </div>
          );
     }

     // Render International Patient Services
     if (content.intro?.paragraphs && Array.isArray(content.intro.paragraphs)) {
          return (
               <div className="space-y-8">
                    {/* Intro Section */}
                    <div className="space-y-4">
                         <h2 className="commonTitle">{content.intro.title}</h2>
                         {content.intro.paragraphs.map((paragraph: string, index: number) => (
                              <p key={index} className="text-gray-600 text-base leading-relaxed">
                                   {paragraph}
                              </p>
                         ))}
                    </div>

                    {/* CTA Section */}
                    {content.cta && (
                         <div className="bg-primary/5 p-6 rounded-lg">
                              <p className="text-gray-700 mb-3">{content.cta.text}</p>
                              <a
                                   href={`mailto:${content.cta.email}`}
                                   className="text-primary font-medium inline-flex items-center gap-2 hover:text-secondary transition-colors"
                              >
                                   <Mail className="w-4 h-4" />
                                   {content.cta.email}
                              </a>
                         </div>
                    )}

                    {/* Visiting Hours */}
                    {content.visitingHours && (
                         <div className="space-y-4 bg-primary/5 px-8.5 py-6 rounded-lg">
                              <div className="mb-6">
                                   <h3 className="text-xl font-semibold text-secondary mb-0.5 leading-[1.4]">
                                        {content.visitingHours.title}
                                   </h3>
                                   {content.visitingHours.description && (
                                        <p className="text-gray-600">{content.visitingHours.description}</p>
                                   )}
                              </div>
                              <div className="space-y-3">
                                   {content.visitingHours.guidelines?.map(
                                        (guideline: any, index: number) => (
                                             <div key={index} className=" ">
                                                  <h4 className="font-medium text-foreground text-lg mb-1 leading-[1.4]">
                                                       {guideline.title}
                                                  </h4>
                                                  <p className="text-foreground/90 text-base">{guideline.description}</p>
                                             </div>
                                        )
                                   )}
                              </div>
                         </div>
                    )}
               </div>
          );
     }

     // Render Medical Specialties
     if (content.specialties && Array.isArray(content.specialties)) {
          return (
               <div className="space-y-8">
                    {content.specialties.map((specialty: any, index: number) => (
                         <div key={index} className="space-y-6">
                              <h2 className="commonTitle">{specialty.title}</h2>

                              {/* Clinic Info */}
                              {specialty.clinic && (
                                   <div className="bg-primary/5 p-6 rounded-lg space-y-4">
                                        <h3 className="text-xl font-semibold text-primary">
                                             {specialty.clinic.heading}
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed">
                                             {specialty.clinic.description}
                                        </p>
                                        {specialty.clinic.contactPhone && (
                                             <div className="flex items-center gap-2 text-primary">
                                                  <Phone className="w-4 h-4" />
                                                  <span>{specialty.clinic.contactPhone}</span>
                                             </div>
                                        )}
                                        {specialty.clinic.ctaUrl && (
                                             <Link
                                                  href={specialty.clinic.ctaUrl}
                                                  className="text-secondary font-medium inline-flex items-center gap-2 hover:text-primary transition-colors"
                                             >
                                                  {specialty.clinic.ctaText} <ArrowRight className="w-4 h-4" />
                                             </Link>
                                        )}
                                   </div>
                              )}

                              {/* Specialists */}
                              {specialty.specialists && specialty.specialists.length > 0 && (
                                   <div className="space-y-4">
                                        <h3 className="text-xl font-semibold text-primary">
                                             {specialty.specialistsTitle || "Medical Specialists"}
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                             {specialty.specialists.map((specialist: any, idx: number) => (
                                                  <div
                                                       key={idx}
                                                       className="bg-white p-4 rounded-lg border border-gray-100 text-center"
                                                  >
                                                       <div className="w-24 h-24 bg-primary/10 rounded-full mx-auto mb-3 flex items-center justify-center">
                                                            <span className="text-primary text-2xl font-bold">
                                                                 {specialist.name.charAt(0)}
                                                            </span>
                                                       </div>
                                                       <p className="text-gray-700 font-medium">
                                                            {specialist.name}
                                                       </p>
                                                  </div>
                                             ))}
                                        </div>
                                   </div>
                              )}
                         </div>
                    ))}
               </div>
          );
     }

     // Render Family & Visitors
     if (content.visitingSlots && Array.isArray(content.visitingSlots)) {
          return (
               <div className="space-y-8">
                    {/* Intro */}
                    {content.intro && (
                         <div className="space-y-4">
                              <h2 className="commonTitle">{content.intro.title}</h2>
                              {content.intro.description && (
                                   <p className="text-gray-600 text-base leading-relaxed">
                                        {content.intro.description}
                                   </p>
                              )}
                         </div>
                    )}

                    {/* Guidelines Image */}
                    {content.guidelinesImage && (
                         <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden">
                              <Image
                                   src={content.guidelinesImage}
                                   alt={content.guidelinesImageAlt || "Guidelines"}
                                   fill
                                   className="object-cover"
                                   unoptimized
                              />
                         </div>
                    )}

                    {/* Guidelines */}
                    {content.guidelines && Array.isArray(content.guidelines) && (
                         <div className="space-y-4">
                              <h3 className="text-xl font-semibold text-primary">Guidelines</h3>
                              <ul className="space-y-3">
                                   {content.guidelines.map((guideline: string, index: number) => (
                                        <li key={index} className="flex items-start gap-3">
                                             <span className="text-primary mt-1">•</span>
                                             <p className="text-gray-600 leading-relaxed">{guideline}</p>
                                        </li>
                                   ))}
                              </ul>
                         </div>
                    )}

                    {/* Visiting Slots */}
                    <div className="bg-primary/3 rounded-xl p-11">
                         {/* <h3 className="text-xl font-semibold text-primary">Visiting Hours</h3> */}
                         <div className="flex flex-col gap-8.5">
                              {content.visitingSlots.map((slot: any, index: number) => (
                                   <div
                                        key={index}
                                        className=" "
                                   >
                                        <h4 className="font-medium text-foreground mb-3">
                                             {slot.title}
                                        </h4>
                                        <div className=" flex flex-wrap gap-3.5 text-sm">
                                             {slot.morning && (
                                                  <div className="bg-primary/4 rounded px-6 py-3">{slot.morning}</div>
                                             )}
                                             {slot.afternoon && (
                                                  <div className="bg-primary/4 rounded px-6 py-3">{slot.afternoon}</div>
                                             )}
                                             {slot.evening && (
                                                  <div className="bg-primary/4 rounded px-6 py-3">{slot.evening}</div>
                                             )}
                                        </div>
                                   </div>
                              ))}
                         </div>
                    </div>

                    {/* CTA */}
                    {content.cta && (
                         <div className="bg-primary/5 p-6 rounded-lg">
                              <p className="text-gray-700 mb-3">{content.cta.text}</p>
                              <a
                                   href={`mailto:${content.cta.email || content.cta.text.match(/[\w\.-]+@[\w\.-]+/)?.[0]}`}
                                   className="text-primary font-medium inline-flex items-center gap-2 hover:text-secondary transition-colors"
                              >
                                   <Mail className="w-4 h-4" />
                                   {content.cta.email || "Contact Us"}
                              </a>
                         </div>
                    )}
               </div>
          );
     }

     // Render Admission & Discharge
     if (content.admission || content.dischargeBilling) {
          return (
               <div className="space-y-12">
                    {/* Admission Section */}
                    {content.admission && (
                         <div className="space-y-6">
                              <h2 className="commonTitle font-medium!">{content.admission.title}</h2>

                              {content.admission.introParagraph1 && (
                                   <p className="text-gray-600 leading-relaxed">
                                        {content.admission.introParagraph1}
                                   </p>
                              )}

                              {content.admission.introParagraph2 && (
                                   <p className="text-gray-600 leading-relaxed">
                                        {content.admission.introParagraph2}
                                   </p>
                              )}

                              {/* Admissions Actions */}
                              {content.admission.admissionsActionsTitle && (
                                   <div className="space-y-4">
                                        <h3 className="text-xl font-medium text-foreground">
                                             {content.admission.admissionsActionsTitle}
                                        </h3>
                                        <ul className="space-y-2">
                                             {content.admission.admissionsActions?.map(
                                                  (action: string, index: number) => (
                                                       <li key={index} className="flex items-start gap-3">
                                                            <span className="text-primary mt-1">•</span>
                                                            <p className="text-gray-600">{action}</p>
                                                       </li>
                                                  )
                                             )}
                                        </ul>
                                   </div>
                              )}

                              {/* Documents Needed */}
                              {content.admission.documentsNeededTitle && (
                                   <div className="space-y-4">
                                        <h3 className="text-xl font-medium text-foreground">
                                             {content.admission.documentsNeededTitle}
                                        </h3>
                                        <ul className="space-y-2">
                                             {content.admission.documentsNeeded?.map(
                                                  (doc: string, index: number) => (
                                                       <li key={index} className="flex items-start gap-3">
                                                            <span className="text-primary mt-1">•</span>
                                                            <p className="text-gray-600">{doc}</p>
                                                       </li>
                                                  )
                                             )}
                                        </ul>
                                   </div>
                              )}
                         </div>
                    )}

                    {/* Payment Methods */}
                    {content.paymentMethods && (
                         <div className="space-y-4">
                              <h3 className="text-xl font-medium text-foreground">
                                   {content.paymentMethods.title}
                              </h3>
                              {content.paymentMethods.introParagraph && (
                                   <p className="text-gray-600 leading-relaxed">
                                        {content.paymentMethods.introParagraph}
                                   </p>
                              )}
                              <ul className="space-y-2">
                                   {content.paymentMethods.paymentOptions?.map(
                                        (option: string, index: number) => (
                                             <li key={index} className="flex items-start gap-3">
                                                  <span className="text-primary mt-1">•</span>
                                                  <p className="text-gray-600">{option}</p>
                                             </li>
                                        )
                                   )}
                              </ul>
                         </div>
                    )}

                    {/* Discharge and Billing */}
                    {content.dischargeBilling && (
                         <div className="space-y-6">
                              <h2 className="commonTitle font-medium!">{content.dischargeBilling.title}</h2>

                              {content.dischargeBilling.introParagraph1 && (
                                   <p className="text-gray-600 leading-relaxed">
                                        {content.dischargeBilling.introParagraph1}
                                   </p>
                              )}

                              {content.dischargeBilling.introParagraph2 && (
                                   <p className="text-gray-600 leading-relaxed">
                                        {content.dischargeBilling.introParagraph2}
                                   </p>
                              )}

                              {content.dischargeBilling.introParagraph3 && (
                                   <p className="text-gray-600 leading-relaxed">
                                        {content.dischargeBilling.introParagraph3}
                                   </p>
                              )}

                              {/* Tabs */}
                              {content.dischargeBilling.tabs && (
                                   <div className="space-y-6">
                                        <div className="border-b border-gray-200">
                                             <div className="flex gap-4">
                                                  {content.dischargeBilling.tabs.patientBillingTitle && (
                                                       <button
                                                            onClick={() => setActiveTab("patientBilling")}
                                                            className={cn(
                                                                 "pb-3 px-4 border-b-2 transition-colors",
                                                                 activeTab === "patientBilling"
                                                                      ? "border-primary text-primary font-semibold"
                                                                      : "border-transparent text-gray-600 hover:text-primary"
                                                            )}
                                                       >
                                                            {content.dischargeBilling.tabs.patientBillingTitle}
                                                       </button>
                                                  )}
                                                  {content.dischargeBilling.tabs.refundsOfDepositsTitle && (
                                                       <button
                                                            onClick={() => setActiveTab("refundsOfDeposits")}
                                                            className={cn(
                                                                 "pb-3 px-4 border-b-2 transition-colors",
                                                                 activeTab === "refundsOfDeposits"
                                                                      ? "border-primary text-primary font-semibold"
                                                                      : "border-transparent text-gray-600 hover:text-primary"
                                                            )}
                                                       >
                                                            {content.dischargeBilling.tabs.refundsOfDepositsTitle}
                                                       </button>
                                                  )}
                                                  {content.dischargeBilling.tabs.chargesOnStatementTitle && (
                                                       <button
                                                            onClick={() => setActiveTab("chargesOnStatement")}
                                                            className={cn(
                                                                 "pb-3 px-4 border-b-2 transition-colors",
                                                                 activeTab === "chargesOnStatement"
                                                                      ? "border-primary text-primary font-semibold"
                                                                      : "border-transparent text-gray-600 hover:text-primary"
                                                            )}
                                                       >
                                                            {content.dischargeBilling.tabs.chargesOnStatementTitle}
                                                       </button>
                                                  )}
                                             </div>
                                        </div>

                                        <div className="bg-primary/5 p-6 rounded-lg">
                                             {activeTab === "patientBilling" && (
                                                  <p className="text-gray-600 leading-relaxed">
                                                       {content.dischargeBilling.tabs.patientBilling}
                                                  </p>
                                             )}
                                             {activeTab === "refundsOfDeposits" && (
                                                  <p className="text-gray-600 leading-relaxed">
                                                       {content.dischargeBilling.tabs.refundsOfDeposits}
                                                  </p>
                                             )}
                                             {activeTab === "chargesOnStatement" && (
                                                  <p className="text-gray-600 leading-relaxed">
                                                       {content.dischargeBilling.tabs.chargesOnStatement}
                                                  </p>
                                             )}
                                        </div>
                                   </div>
                              )}
                         </div>
                    )}
               </div>
          );
     }

     // Render Payment & Billing
     if (content.coverageTypes) {
          return (
               <div className="space-y-8">
                    {/* Intro */}
                    {content.intro && (
                         <div className="space-y-4">
                              <h2 className="commonTitle">{content.intro.title}</h2>
                              {content.intro.introParagraph && (
                                   <p className="text-gray-600 text-base leading-relaxed">
                                        {content.intro.introParagraph}
                                   </p>
                              )}
                         </div>
                    )}

                    {/* Coverage Types */}
                    {content.coverageTypes && (
                         <div className="space-y-6">
                              <h3 className="text-base font-regular text-foreground mb-4">
                                   {content.coverageTypes.sectionTitle}
                              </h3>
                              <div className="flex flex-col gap-4">
                                   {content.coverageTypes.types?.map((type: any, index: number) => (
                                        <div key={index} >
                                             <h4 className="
    font-medium text-secondary mb-2
    relative pl-6
    before:content-['']
    before:absolute before:left-2 before:top-1/2
    before:-translate-y-1/2
    before:w-1 before:h-1
    before:rounded-full
    before:bg-secondary
  ">
                                                  {type.title}
                                             </h4>
                                             <p className="text-gray-600 text-sm leading-relaxed">
                                                  {type.description}
                                             </p>
                                        </div>
                                   ))}
                              </div>
                         </div>
                    )}

                    {/* Additional Info */}
                    {content.additionalInfo && (
                         <div className="space-y-4 bg-primary/5 p-6 rounded-lg">
                              {content.additionalInfo.paragraph1 && (
                                   <p className="text-gray-600 leading-relaxed">
                                        {content.additionalInfo.paragraph1}
                                   </p>
                              )}
                              {content.additionalInfo.paragraph2 && (
                                   <p className="text-gray-600 leading-relaxed">
                                        {content.additionalInfo.paragraph2}
                                   </p>
                              )}
                         </div>
                    )}
               </div>
          );
     }

     // Render Rights & Responsibilities
     if (content.tabs) {
          return (
               <div className="space-y-8 py-10 px-7 bg-primary/3 rounded ">
                    {/* Intro */}
                    {content.intro && (
                         <div className="space-y-4">
                              <h2 className="commonTitle">{content.intro.title}</h2>
                              {content.intro.introText && (
                                   <p className="text-gray-600 text-base leading-relaxed">
                                        {content.intro.introText}
                                   </p>
                              )}
                         </div>
                    )}

                    {/* Tabs Navigation */}
                    <div className="border-b border-gray-200">
                         <div className="flex gap-4 flex-wrap">
                              {content.tabs.patientRights && (
                                   <button
                                        onClick={() => setActiveTab("patientRights")}
                                        className={cn(
                                             "pb-3 px-4 border-0 border-b-2 transition-colors",
                                             activeTab === "patientRights"
                                                  ? "border-primary text-secondary font-medium"
                                                  : "border-transparent text-foreground/40 cursor-pointer hover:text-primary"
                                        )}
                                   >
                                        Patient Rights
                                   </button>
                              )}
                              {content.tabs.patientResponsibilities && (
                                   <button
                                        onClick={() => setActiveTab("patientResponsibilities")}
                                        className={cn(
                                             "pb-3 px-4 border-0 border-b-2 transition-colors",
                                             activeTab === "patientResponsibilities"
                                                  ? "border-primary text-secondary font-medium"
                                                  : "border-transparent text-foreground/40 cursor-pointer hover:text-primary"
                                        )}
                                   >
                                        Patient Responsibilities
                                   </button>
                              )}
                              {content.tabs.pediatricRights && (
                                   <button
                                        onClick={() => setActiveTab("pediatricRights")}
                                        className={cn(
                                             "pb-3 px-4 border-0 border-b-2 transition-colors",
                                             activeTab === "pediatricRights"
                                                  ? "border-primary text-secondary font-medium"
                                                  : "border-transparent text-foreground/40 cursor-pointer hover:text-primary"
                                        )}
                                   >
                                        Pediatric Rights
                                   </button>
                              )}
                              {content.tabs.pediatricResponsibilities && (
                                   <button
                                        onClick={() => setActiveTab("pediatricResponsibilities")}
                                        className={cn(
                                             "pb-3 px-4 border-0 border-b-2 transition-colors",
                                             activeTab === "pediatricResponsibilities"
                                                  ? "border-primary text-secondary font-medium"
                                                  : "border-transparent text-foreground/40 cursor-pointer hover:text-primary"
                                        )}
                                   >
                                        Pediatric Responsibilities
                                   </button>
                              )}
                         </div>
                    </div>

                    {/* Tab Content */}
                    <div className="space-y-6">
                         {activeTab === "patientRights" && content.tabs.patientRights && (
                              <div className="space-y-4">
                                   <p className="text-gray-700 font-medium text-lg">
                                        {content.tabs.patientRights.introText}
                                   </p>
                                   <div className="space-y-4">
                                        {content.tabs.patientRights.items?.map(
                                             (item: any, index: number) => (
                                                  <div key={index} className="">
                                                       <h4 className="font-semibold text-primary mb-2">
                                                            {index + 1}. {item.title}
                                                       </h4>
                                                       <p className="text-gray-600 text-sm leading-relaxed">
                                                            {item.description}
                                                       </p>
                                                  </div>
                                             )
                                        )}
                                   </div>
                              </div>
                         )}

                         {activeTab === "patientResponsibilities" &&
                              content.tabs.patientResponsibilities && (
                                   <div className="space-y-4">
                                        <p className="text-gray-700 font-medium">
                                             {content.tabs.patientResponsibilities.introText}
                                        </p>
                                        <div className="space-y-4">
                                             {content.tabs.patientResponsibilities.items?.map(
                                                  (item: any, index: number) => (
                                                       <div
                                                            key={index}
                                                            className="">
                                                            <h4 className="font-semibold text-primary mb-2">
                                                                 {index + 1}. {item.title}
                                                            </h4>
                                                            <p className="text-gray-600 text-sm leading-relaxed">
                                                                 {item.description}
                                                            </p>
                                                       </div>
                                                  )
                                             )}
                                        </div>
                                   </div>
                              )}

                         {activeTab === "pediatricRights" && content.tabs.pediatricRights && (
                              <div className="space-y-4">
                                   <p className="text-gray-700 font-medium">
                                        {content.tabs.pediatricRights.introText}
                                   </p>
                                   <div className="space-y-4">
                                        {content.tabs.pediatricRights.items?.map(
                                             (item: any, index: number) => (
                                                  <div
                                                       key={index}
                                                       className=""
                                                  >
                                                       <h4 className="font-semibold text-primary mb-2">
                                                            {index + 1}. {item.title}
                                                       </h4>
                                                       <p className="text-gray-600 text-sm leading-relaxed">
                                                            {item.description}
                                                       </p>
                                                  </div>
                                             )
                                        )}
                                   </div>
                              </div>
                         )}

                         {activeTab === "pediatricResponsibilities" &&
                              content.tabs.pediatricResponsibilities && (
                                   <div className="space-y-4">
                                        <p className="text-gray-700 font-medium">
                                             {content.tabs.pediatricResponsibilities.introText}
                                        </p>
                                        <div className="space-y-4">
                                             {content.tabs.pediatricResponsibilities.items?.map(
                                                  (item: any, index: number) => (
                                                       <div
                                                            key={index}
                                                            className="">
                                                            <h4 className="font-semibold text-primary mb-2">
                                                                 {index + 1}. {item.title}
                                                            </h4>
                                                            <p className="text-gray-600 text-sm leading-relaxed">
                                                                 {item.description}
                                                            </p>
                                                       </div>
                                                  )
                                             )}
                                        </div>
                                   </div>
                              )}
                    </div>
               </div>
          );
     }

     // Render Compliments & Complaints
     if (content.satisfiedSection || content.notSatisfiedSection) {
          return (
               <div className="space-y-10">
                    {/* Satisfied Section */}
                    {content.satisfiedSection && (
                         <div className="space-y-4">
                              <h2 className="commonTitle">{content.satisfiedSection.title}</h2>
                              {content.satisfiedSection.description && (
                                   <p className="text-gray-600 text-base leading-relaxed">
                                        {content.satisfiedSection.description}
                                   </p>
                              )}
                         </div>
                    )}
                    {/* Not Satisfied Section */}
                    {content.notSatisfiedSection && (
                         <div className="space-y-6">
                              <h2 className=" text-secondary text-lg  mb-2 leading-none">
                                   {content.notSatisfiedSection.title} 
                              </h2>
                              {content.notSatisfiedSection.description && (
                                   <p className="text-gray-600 text-base leading-relaxed">
                                        {content.notSatisfiedSection.description}
                                   </p>
                              )}
                              {/* Complaint Methods */}
                              {content.notSatisfiedSection.complaintMethods && (
                                   <div className="space-y-3">
                                        <ol className="pl-5 list-decimal flex flex-col gap-1">
                                             {content.notSatisfiedSection.complaintMethods.map(
                                                  (method: any, index: number) => (
                                                       <li key={index} className="flex- items-start gap-3 text-gray-600">
                                                            {method.method || method}
                                                       </li>
                                                  )
                                             )}
                                        </ol>
                                   </div>
                              )}
                              {/* Email */}
                              {content.notSatisfiedSection.email && (
                                   <div className="bg-primary/5 p-6 rounded-lg">
                                        <p className="text-gray-700 mb-2">Contact the Complaint Officer:</p>
                                        <a href={`mailto:${content.notSatisfiedSection.email}`}
                                             className="text-primary font-medium inline-flex items-center gap-2 hover:text-secondary transition-colors">
                                             <Mail className="w-4 h-4" />
                                             {content.notSatisfiedSection.email}
                                        </a>
                                   </div>
                              )}
                              {/* Mailing Address */}
                              {content.notSatisfiedSection.mailingAddress && (
                                   <div className="bg-primary/5 p-6 rounded-lg">
                                        <p className="text-gray-700 mb-2">Mailing Address:</p>
                                        <div className="text-gray-600 space-y-1">
                                             {content.notSatisfiedSection.mailingAddress.attention && (
                                                  <p>{content.notSatisfiedSection.mailingAddress.attention}</p>
                                             )}
                                             {content.notSatisfiedSection.mailingAddress.name && (
                                                  <p>{content.notSatisfiedSection.mailingAddress.name}</p>
                                             )}
                                             {content.notSatisfiedSection.mailingAddress.street && (
                                                  <p>{content.notSatisfiedSection.mailingAddress.street}</p>
                                             )}
                                             {content.notSatisfiedSection.mailingAddress.city && (
                                                  <p>{content.notSatisfiedSection.mailingAddress.city}</p>
                                             )}
                                        </div>
                                   </div>
                              )}
                         </div>
                    )}

                    {/* Who Can Submit */}
                    {content.whoCanSubmit && (
                         <div className="space-y-4">
                              <h3 className="text-xl font-semibold text-primary">
                                   {content.whoCanSubmit.title}
                              </h3>
                              <p className="text-gray-600 leading-relaxed">
                                   {content.whoCanSubmit.description}
                              </p>
                         </div>
                    )}

                    {/* What Can Submit */}
                    {content.whatCanSubmit && (
                         <div className="space-y-4">
                              <h3 className="text-xl font-semibold text-primary">
                                   {content.whatCanSubmit.title}
                              </h3>
                              <p className="text-gray-600 leading-relaxed">
                                   {content.whatCanSubmit.description}
                              </p>
                         </div>
                    )}

                    {/* Complaint Officer */}
                    {content.complaintOfficer && (
                         <div className="space-y-4">
                              <h3 className="text-xl font-semibold text-primary">
                                   {content.complaintOfficer.title}
                              </h3>
                              <p className="text-gray-600 leading-relaxed">
                                   {content.complaintOfficer.description}
                              </p>
                         </div>
                    )}

                    {/* Complaint Process */}
                    {content.complaintProcess && (
                         <div className="space-y-4">
                              <h3 className="text-xl font-semibold text-primary">
                                   {content.complaintProcess.title}
                              </h3>
                              <div className="space-y-3">
                                   {content.complaintProcess.steps?.map(
                                        (step: any, index: number) => (
                                             <div
                                                  key={index}
                                                  className="flex items-start gap-3 bg-white p-4 rounded-lg border border-gray-100"
                                             >
                                                  <span className="text-primary font-bold mt-1">
                                                       {index + 1}.
                                                  </span>
                                                  <p className="text-gray-600 flex-1">
                                                       {step.step || step}
                                                  </p>
                                             </div>
                                        )
                                   )}
                              </div>
                         </div>
                    )}

                    {/* Claims */}
                    {content.claims && (
                         <div className="space-y-4">
                              <h3 className="text-xl font-semibold text-primary">
                                   {content.claims.title}
                              </h3>
                              <p className="text-gray-600 leading-relaxed">
                                   {content.claims.description}
                              </p>
                         </div>
                    )}

                    {/* Loss or Damage */}
                    {content.lossOrDamage && (
                         <div className="space-y-4">
                              <h3 className="text-xl font-semibold text-primary">
                                   {content.lossOrDamage.title}
                              </h3>
                              {content.lossOrDamage.paragraph1 && (
                                   <p className="text-gray-600 leading-relaxed">
                                        {content.lossOrDamage.paragraph1}
                                   </p>
                              )}
                              {content.lossOrDamage.paragraph2 && (
                                   <p className="text-gray-600 leading-relaxed">
                                        {content.lossOrDamage.paragraph2}
                                   </p>
                              )}
                              {content.lossOrDamage.paragraph3 && (
                                   <p className="text-gray-600 leading-relaxed">
                                        {content.lossOrDamage.paragraph3}
                                   </p>
                              )}
                         </div>
                    )}

                    {/* Incidents and Calamities */}
                    {content.incidentsAndCalamities && (
                         <div className="space-y-4">
                              <h3 className="text-xl font-semibold text-primary">
                                   {content.incidentsAndCalamities.title}
                              </h3>
                              {content.incidentsAndCalamities.paragraph1 && (
                                   <p className="text-gray-600 leading-relaxed">
                                        {content.incidentsAndCalamities.paragraph1}
                                   </p>
                              )}
                              {content.incidentsAndCalamities.paragraph2 && (
                                   <p className="text-gray-600 leading-relaxed">
                                        {content.incidentsAndCalamities.paragraph2}
                                   </p>
                              )}
                              {content.incidentsAndCalamities.paragraph3 && (
                                   <p className="text-gray-600 leading-relaxed">
                                        {content.incidentsAndCalamities.paragraph3}
                                   </p>
                              )}
                              {content.incidentsAndCalamities.paragraph4 && (
                                   <p className="text-gray-600 leading-relaxed">
                                        {content.incidentsAndCalamities.paragraph4}
                                   </p>
                              )}
                              {content.incidentsAndCalamities.paragraph5 && (
                                   <p className="text-gray-600 leading-relaxed">
                                        {content.incidentsAndCalamities.paragraph5}
                                   </p>
                              )}
                         </div>
                    )}

                    {/* Retrospectus Committee */}
                    {content.retrospectusCommittee && (
                         <div className="space-y-4">
                              <h3 className="text-xl font-semibold text-primary">
                                   {content.retrospectusCommittee.title}
                              </h3>
                              <p className="text-gray-600 leading-relaxed">
                                   {content.retrospectusCommittee.description}
                              </p>
                         </div>
                    )}
               </div>
          );
     }

     // Render Patient Information
     if (content.forYourBaby || content.forYourself) {
          return (
               <div className="space-y-10">
                    {/* Intro */}
                    {content.intro && (
                         <div className="space-y-4">
                              <h2 className="commonTitle">{content.intro.title}</h2>
                              {content.intro.introParagraph && (
                                   <p className="text-gray-600 text-base leading-relaxed">
                                        {content.intro.introParagraph}
                                   </p>
                              )}
                         </div>
                    )}

                    {/* For Your Baby */}
                    {content.forYourBaby && (
                         <div className="space-y-6">
                              <h3 className="text-xl font-semibold text-primary">
                                   {content.forYourBaby.title}
                              </h3>
                              {content.forYourBaby.description && (
                                   <p className="text-gray-600 leading-relaxed">
                                        {content.forYourBaby.description}
                                   </p>
                              )}

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                   {/* Left Column */}
                                   <div className="space-y-2">
                                        {content.forYourBaby.leftColumnItems?.map(
                                             (item: string, index: number) => (
                                                  <div
                                                       key={index}
                                                       className="flex items-start gap-3 text-gray-600"
                                                  >
                                                       <span className="text-primary mt-1">•</span>
                                                       <p>{item}</p>
                                                  </div>
                                             )
                                        )}
                                   </div>

                                   {/* Right Column */}
                                   <div className="space-y-2">
                                        {content.forYourBaby.rightColumnItems?.map(
                                             (item: string, index: number) => (
                                                  <div
                                                       key={index}
                                                       className="flex items-start gap-3 text-gray-600"
                                                  >
                                                       <span className="text-primary mt-1">•</span>
                                                       <p>{item}</p>
                                                  </div>
                                             )
                                        )}
                                   </div>
                              </div>
                         </div>
                    )}

                    {/* For Yourself */}
                    {content.forYourself && (
                         <div className="space-y-6">
                              <h3 className="text-xl font-semibold text-primary">
                                   {content.forYourself.title}
                              </h3>
                              {content.forYourself.description && (
                                   <p className="text-gray-600 leading-relaxed">
                                        {content.forYourself.description}
                                   </p>
                              )}

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                   {/* Left Column */}
                                   <div className="space-y-2">
                                        {content.forYourself.leftColumnItems?.map(
                                             (item: string, index: number) => (
                                                  <div
                                                       key={index}
                                                       className="flex items-start gap-3 text-gray-600"
                                                  >
                                                       <span className="text-primary mt-1">•</span>
                                                       <p>{item}</p>
                                                  </div>
                                             )
                                        )}
                                   </div>

                                   {/* Right Column */}
                                   <div className="space-y-2">
                                        {content.forYourself.rightColumnItems?.map(
                                             (item: string, index: number) => (
                                                  <div
                                                       key={index}
                                                       className="flex items-start gap-3 text-gray-600"
                                                  >
                                                       <span className="text-primary mt-1">•</span>
                                                       <p>{item}</p>
                                                  </div>
                                             )
                                        )}
                                   </div>
                              </div>
                         </div>
                    )}
               </div>
          );
     }

     // Fallback for unknown content types
     return (
          <div className="text-center py-10">
               <p className="text-gray-500">Content not available.</p>
          </div>
     );
}


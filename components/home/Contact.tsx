import CallIcon from "@/icons/home-icons/call-icon";
import EmailIcon from "@/icons/home-icons/email-icon";
import Location from "@/icons/home-icons/location-icon";
import { cn } from "@/utils/twMerge";
import React from "react";

const Contact = async () => {   
   
     const res = await fetch(`${process.env.NEXT_PUBLIC_APP_BASE_URL}/pages/contact-common`, {
          next: {
               revalidate: 10
          }
     });
     // if(!res.ok) throw new Error("Failed to fetch homepage data");
     const { data } = await res.json();

     if (!data) return null;
     const contactData = data?.content;
     console.log("contcat data", contactData)
  
     const icons = [CallIcon, Location, EmailIcon];
     return (
          <section className="section-padding bg-white">
               <div className="container">
                    <div className="text-center mb-6 md:mb-8 lg:mb-10 2xl:mb-12">
                         <p className="tagline mb-2 ">
                              {contactData?.tagline}
                         </p>
                         <h2 className="commonTitle font-bold!  ">
                              {contactData?.title}
                         </h2>
                    </div>

                    <div className="grid grid-cols-12 gap-y-4 md:gap-y-7 sm:gap-x-4 md:gap-x-7">
                         {contactData?.communicationWays.map((items: any, index: any) => {
                              const IconComponent = icons[index % icons.length];
                              return (
                                   <a key={index}
                                        href={items.href}
                                        className={cn(
                                             "pl-4 md:pl-6 pr-4 md:pr-10 lg:pr-14  py-4 sm:py-5 md:py-6 lg:py-8 xl:py-10 2xl:py-13 col-span-12 sm:col-span-6 md:col-span-4 rounded-sm",
                                             index === 1 ? "bg-primary" : "bg-[#1F9F9E]"
                                        )} >
                                        <IconComponent className="mb-1 md:mb-3 lg:mb-4 text-white w-7 xl:w-8 2xl:w-9" />
                                        <div className="flex flex-col gap-1">
                                             <span className="font-bold text-base md:text-lg text-white uppercase">
                                                  {items.communicationName}
                                             </span>
                                             <span className="text-sm md:text-base text-white font-normal leading-[1.4]">
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

export default Contact;

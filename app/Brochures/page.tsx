import BroucherBox from "@/components/Brouchers/broucherBox";
import InnerBanner from "@/components/common/InnerBanner";
import Contact from "@/components/home/Contact";
import AboutSmgh from "@/components/smghAcademy/AboutSmgh";
import BuildingSkills from "@/components/smghAcademy/BuildingSkills";
import Programs from "@/components/smghAcademy/Programs";
import Input from "@/components/ui/input";
import data from "@/public/data/brochures.json";
import { ArrowRight, Calendar, Search } from "lucide-react";
import Image from "next/image";
// import smghAcademy from "@/public/data/smghacademy.json";

export default async function Brochures() {

     return (
          <>
               <InnerBanner data={data?.banner} />
               <section className='section-padding'>
                    <div className="container">
                         <div className="mb-15">
                              <h2 className="text-center text-foreground font-bold text-2xl mb-2">Find Brochure</h2>
                              <div className=" w-full max-w-217 mx-auto">
                                   <div className="relative">
                                        <Search  className="absolute top-1/2 left-3 -translate-y-1/2 text-secondary"/> 
                                        <Input type="text" placeholder="Search..." className="w-full d-block bg-primary/4 rounded-4xl pl-13 pr-18" />
                                        <span className="absolute top-1/2 right-5 text-xl font-medium -translate-y-1/2 capitalize text-tealgreen">Find</span>
                                   </div>
                              </div>
                         </div>
                         <div className="grid grid-cols-12 gap-7">
                              {data.brouchers.data.map((brochure: any, index: number) => {
                                   return ( 
                                        <BroucherBox key={index} brochure={brochure} className="col-span-4 first:col-span-8 first:[&>div]:flex-col-reverse" />
                                   )
                              })}
                         </div>
                    </div>
               </section>
               <Contact />
          </>
     );
}

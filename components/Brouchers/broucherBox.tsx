import { cn } from '@/utils/twMerge'
import { ArrowRight, Calendar } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

export default function BroucherBox({brochure, className}: any) {
     return (
          <div  className={cn(" flex flex-col gap-6 bg-primary/3 p-3.5 pb-10 rounded ", className)}>
               <div className=" flex flex-col gap-4.5">
                    <div className="">
                         <h3 className="text-secondary text-lg font-medium mb-1.5">{brochure?.title}</h3>
                         <div className="flex gap-2 items-center justify-start">
                              <Calendar className='text-secondary w-4 h-4' />
                              <span className="text-xs"> {brochure?.published}</span>
                         </div>
                    </div>
                    <a download href={brochure?.file} className="h-50 w-full rounded overflow-hidden block">
                         <Image alt="" width={400} height={400} src={brochure?.img} className="w-full h-full object-cover object-center" />
                    </a>
               </div>
               <a download href={brochure?.file} className="text-primary text-sm inline-flex items-center gap-1">Click Image to Download Brochure <ArrowRight className="w-4 h-4" /> </a>
          </div>
     )
}

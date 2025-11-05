import React from 'react'
import { ArrowRight, Calendar, User } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
const NewsBox = ({data}: any) => {
     return (
          <div className="flex flex-col items-start gap-5">
               <div className="w-full">
                    <Image src={data?.img} alt="image" height={500} width={400} className="block w-full h-auto rounded" />
               </div>
               <div className="w-full">
                    <div className="flex gap-6 mb-2">
                         <div className="flex gap-2 items-center justify-center">
                              <Calendar className='text-secondary w-4 h-4' />
                              <span> {data?.published}</span>
                         </div>
                         <div className="flex gap-2">
                              <User className='text-secondary w-4 h-4' />
                              <span>{data?.author}</span>
                         </div>
                    </div>
                    <h2 className=" text-primary font-medium text-2xl leading-none">
                         {data?.title}
                    </h2>
                    <p className="text-[#000000] font-normal text-base leading-normal mt-2.5 line-clamp-4">
                         {data?.description}
                    </p>
               </div>
               <Button href={data?.link} variant="default">Read More <ArrowRight /></Button>
          </div>
     )
}

export default NewsBox

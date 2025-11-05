import InnerBanner from '@/components/common/InnerBanner'
import React from 'react'
import data from "@/public/data/news.json";
import NewsBox from '@/components/News/NewsBox';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Contact from '@/components/home/Contact';
import { Search } from 'lucide-react';
import Input from '@/components/ui/input';

const News = () => { 
     function formatCount(num: number) {
          if (isNaN(num) || num < 0) return "0";
          if (num < 1000) return num.toString();
          if (num < 1_000_000) return (num / 1000).toFixed(1).replace(/\.0$/, "") + "k";
          if (num < 1_000_000_000) return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
          return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "B";
     }


     return (
          <>
               <InnerBanner data={data?.banner} />
               <section className='section-padding'>
                    <div className="container">
                         <div className="grid grid-cols-12 gap-5">
                              <div className="col-span-8 flex flex-col gap-15">
                                   {data?.news.data?.map((item: any, index: number) => {
                                        return (
                                             <NewsBox key={index} data={item} />
                                        )
                                   })}
                              </div>
                              <div className="col-span-4 flex flex-col gap-6">
                                   <div className='relative'>
                                        <Input placeholder='News Search' className='w-100 h-12.5 px-5 py-3.5 rounded-md border-0 bg-primary text-white' />
                                        <button className='absolute right-0 top-0 bottom-0 pr-5'><Search className='text-secondary w-4 h-4' /></button>
                                   </div>
                                   <div className='p-5 border rounded-md border-primary/20'>
                                        <h2 className='text-primary font-medium text-2xl leading-none mb-4.5'>News Tags</h2>
                                        <div className="flex flex-wrap gap-2">
                                             {data.tags.map((item: any, index: number) => {
                                                  return (
                                                       <a href={item?.link} key={index} className='px-3 py-2 border rounded-md border-black/14 text-dark/60 font-normal text-base leading-none hover:border-primary hover:text-primary transition-all ease-in-out duration-300'>{item.title}</a>
                                                  )
                                             })}
                                        </div>
                                   </div>


                                   <div className='p-5 border rounded-md border-primary/20'>
                                        <h2 className='text-primary font-medium text-2xl leading-none mb-4.5'>Recent Posts</h2>
                                        <div className="flex flex-wrap gap-2">
                                             {data.recentPosts.map((item: any, index: number) => {
                                                  return (
                                                       <a href={item?.link} key={index} className='flex gap-2.5'>
                                                            <div className='w-15 h-15 flex-[0_0_auto] rounded overflow-hidden'>
                                                                 <Image src={item?.img} alt="image" height={500} width={400} className="block w-full h-full object-cover" />
                                                            </div>
                                                            <div className='flex-1'>
                                                                 <h3 className='text-secondary text-xs'> {item?.title}</h3>
                                                                 <p className='text-sm'> {item?.description}</p>
                                                            </div>
                                                       </a>
                                                  )
                                             })}
                                        </div>
                                   </div>


                                   <div className='p-5 border rounded-md border-primary/20'>
                                        <h2 className='text-primary font-medium text-2xl leading-none mb-4.5'>News Categories</h2>
                                        <div className="flex flex-col gap-2">
                                             {data.categories.map((item: any, index: number) => {
                                                  return (
                                                       <a href={item?.link} key={index} className='cursor-pointer  py-3 text-dark/60 font-normal text-base leading-none hover:text-primary transition-all ease-in-out duration-300 flex justify-between items-center'>
                                                            <span>{item.name}</span>
                                                            <span className='bg-tealgreen rounded-full aspect-square h-auto min-w-7 p-0.5 text-white text-xs  flex items-center justify-center'>{formatCount(Number(item.count))}</span>
                                                       </a>
                                                  )
                                             })}
                                        </div>
                                   </div>

                                   <div className='p-5 border rounded-md border-primary/20'>
                                        <h2 className='text-primary font-medium text-2xl leading-none mb-4.5'>Subscription</h2>

                                   </div>

                              </div>
                         </div>
                    </div>
               </section>
               <Contact
                    data={data.contact}
               // isLoading={isLoading}
               // isError={isError}
               // error={error}
               />
          </>
     )
}
export default News

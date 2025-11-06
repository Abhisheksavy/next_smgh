import InnerBanner from '@/components/common/InnerBanner'
import React from 'react'
import data from "@/public/data/news.json";
import NewsBox from '@/components/News/NewsBox';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Contact from '@/components/home/Contact';
import { Search } from 'lucide-react';
import Input from '@/components/ui/input';
import SubscriptionForm from '@/components/common/subscription';
import CounterLink from '@/components/common/counterLink';

const News = () => {
  

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
                                        <Input type='text' placeholder='News Search' className='w-full h-12.5 px-5 py-3.5 rounded-md border-0 bg-primary text-white' />
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
                                                       <CounterLink key={index} data={item} />
                                                  )
                                             })}
                                        </div>
                                   </div>

                                   <div className='p-5 border rounded-md border-primary/20'>
                                        <h2 className='text-primary font-medium text-2xl leading-none mb-4.5'>Subscription</h2>
                                        <SubscriptionForm />


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

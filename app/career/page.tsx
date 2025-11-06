import InnerBanner from '@/components/common/InnerBanner'
import data from "@/public/data/career.json";
import NewsBox from '@/components/News/NewsBox';

import Image from 'next/image';
import Contact from '@/components/home/Contact';
import { ArrowUpRight, Calendar, Search } from 'lucide-react';
import Input from '@/components/ui/input';
import SubscriptionForm from '@/components/common/subscription';
import CounterLink from '@/components/common/counterLink';
import { Button } from '@/components/ui/button';

const Career = () => {

     return (
          <>
               <InnerBanner data={data?.banner} />
               <section className='section-padding'>
                    <div className="container">
                         <div className="grid grid-cols-12 gap-10">
                              <div className="col-span-8 flex flex-col gap-11 ">
                                   <div className="bg-primary/3 p-10">
                                        <div className="mb-7">
                                             <h2 className='text-primary  font-medium text-[2rem] mb-1'>{data?.vacancyList.title}</h2>
                                             <p className='leading-[1.4]'>{data?.vacancyList.description}</p>
                                        </div>
                                        <div className='flex flex-col gap-4'>
                                             {data?.vacancyList?.list.map((item: any, index: number) => {
                                                  return (
                                                       // <NewsBox key={index} data={item} />
                                                       <div key={index} className='border-primary/20 border rounded-md p-3.5 '>
                                                            <div className='mb-4.5'>
                                                                 <img src={item?.image} className='w-full block rounded-sm' alt="" />
                                                            </div>
                                                            <div className=''>
                                                                 <div className="flex justify-between items-center mb-1.5">
                                                                      <h3 className='text-secondary text-lg uppercase'> {item?.title}</h3>
                                                                      <div className='bg-primary/6 rounded-[1.25rem] py-1 px-2 text-[0.62rem] text-primary'>{item?.tags.join(', ')}</div>
                                                                 </div>
                                                                 <p className='leading-[1.4]'> {item?.description}</p>
                                                            </div>
                                                            <div className="flex justify-between items-center mt-3">
                                                                 <p className='mb-0 text-xs gap-1.5 flex items-center'><Calendar className='text-secondary w-4' /> {item?.posted}</p>
                                                                 <Button className='' size='icon' ><ArrowUpRight /></Button>
                                                            </div>
                                                       </div>
                                                  )
                                             })}
                                        </div>
                                   </div>
                                   <div className=" text-center">
                                        <Button className='' variant='default' > Explore SMGH Academy</Button>
                                   </div>
                              </div>
                              <div className="col-span-4 flex flex-col gap-6">

                                   <div className='p-5 border rounded-md border-primary/20'>
                                        <h2 className='text-primary font-medium text-2xl leading-none mb-4.5'>Recent Vacancies</h2>
                                        <div className="flex flex-col gap-2">
                                             {data.recentVacancies.map((item: any, index: number) => {
                                                  return (
                                                       <a href={item?.link} key={index} className='flex items-center gap-2.5'>
                                                            <div className='w-15 h-15 flex-[0_0_auto] rounded overflow-hidden'>
                                                                 <Image src={item?.img} alt="image" height={500} width={400} className="block w-full h-full object-cover" />
                                                            </div>
                                                            <div className='flex-1'>
                                                                 <h3 className=' text-sm'> {item?.title}</h3>
                                                                 <p className='text-sm text-secondary'> {item?.total || 0} Vacancies</p>
                                                            </div>
                                                       </a>
                                                  )
                                             })}
                                        </div>
                                   </div>


                                   <div className='p-5 border rounded-md border-primary/20'>
                                        <h2 className='text-primary font-medium text-2xl leading-none mb-4.5'>Categories</h2>
                                        <div className="flex flex-col gap-2">
                                             {data.categories.map((item: any, index: number) => {
                                                  return (
                                                       <CounterLink key={index} data={item} />
                                                  )
                                             })}
                                        </div>
                                   </div>

                                   <div className='p-5 border rounded-md border-primary/20'>
                                        <h2 className='text-primary font-medium text-2xl leading-none mb-4.5'>Careers Subscription</h2>
                                        <SubscriptionForm />
                                   </div>
                              </div>
                         </div>
                    </div>
               </section>
               <Contact
                 
               // isLoading={isLoading}
               // isError={isError}
               // error={error}
               />
          </>
     )
}
export default Career

import InnerBanner from '@/components/common/InnerBanner'
import React from 'react'
import data from "@/public/data/vendor.json";
import NewsBox from '@/components/News/NewsBox';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Contact from '@/components/home/Contact';
import { Search } from 'lucide-react';
import Input from '@/components/ui/input';
import SubscriptionForm from '@/components/common/subscription';
import CounterLink from '@/components/common/counterLink';

const VendorRegistration = () => {
     return (
          <>
               <InnerBanner data={data?.banner} />
               <section className='section-padding'>
                    <div className="container">
                         <h2 className='commonTitle font-medium! mb-2'>{data?.data.title}</h2>
                         <p className='mb-7'>{data?.data.description}</p>
                         <ul className='list-disc flex flex-col gap-7 pl-5'>
                              <li><strong>ALL VENDORS</strong> must be registered and credentialed with Green Security and in receipt of their Green Security ID Badge for access to any HSS facility (please consult the Vendor Onsite Visit tab for site-specific access information). Register here. Already have a Green Security account? Log in and add HSS to your list of participating accounts. </li>
                              <li><strong>ALL VENDORS</strong> accessing the HSS Main Campus and contiguous buildings (Belaire and Pavilion) must enter through the dedicated Vendor Entrance, located on 70th Street (please consult the Vendor Onsite Visit tab for additional information).</li>
                         </ul>
                         <div className="grid grid-cols-12 gap-7.5 mt-12.5">
                              {data?.data?.list?.map((item: any, index: any) => {
                                   return (
                                        <div key={index} className='col-span-4 bg-primary/3 rounded-md  px-4 lg:px-5 xl:px-7 2xl:px-8.5 py-7 text-center'> 
                                             <p className='font-semibold'>{item}</p> 
                                        </div>
                                   )
                              })}
                              <div className=""></div>
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
export default VendorRegistration

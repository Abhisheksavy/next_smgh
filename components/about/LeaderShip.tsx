import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'

export default async function LeaderShip({ leadership }: { leadership: any }) {
     try {

          const res2 = await fetch(`${process.env.NEXT_PUBLIC_APP_BASE_URL}/users/all?page=1&per_page=3`, {
               next: {
                    revalidate: 10
               },
               headers: {
                    "Content-Type": "application/json",
               }
          });

          if (!res2.ok) throw new Error("Failed to fetch leaders data");
          const result = await res2.json()

          console.log(result, "ran");

     } catch (error) {
          console.log("error", error);
     }





     // const Leaders = await res2.json();
     // if (!Leaders) return null; 
     // console.log("LeadersData", Leaders)


     return (
          <section className="section-padding ">
               <div className="container">
                    <div className="text-center mb-7">
                         <p className="tagline mb-1.5">{leadership?.tagline}</p>
                         <h2 className="commonTitle ">{leadership?.title}</h2>
                         <p className="text-gray-600 text-base  leading-relaxed">
                              {leadership?.description}
                         </p>
                    </div>

                    <div className="grid grid-cols-12 gap-5">
                         {leadership?.leaders?.map((leader: any, index: number) => {
                              return (
                                   <div className="col-span-4 bg-primary" key={index}>
                                        <div className="">
                                             <Image
                                                  src={leader?.image}
                                                  className="object-cover w-full h-auto"
                                                  height={500}
                                                  width={400}
                                                  alt="image"
                                             />
                                        </div>
                                        <div className='text-center py-7 px-4 flex flex-col gap-2'>
                                             <h3 className='text-[#FCFEFE] font-regular text-lg leading-[1.4]'>{leader?.name}</h3>
                                             <h4 className='text-[#FCFEFE] font-bold  text-lg leading-none  uppercase tracking-[0.16em]'>{leader?.designation}</h4>
                                        </div>
                                   </div>
                              )
                         })}
                    </div>
                    {leadership?.cta && (<div className=" flex justify-center mt-7">
                         <Button href={leadership?.cta.href} variant="default" className='capitalize'>{leadership?.cta.label}</Button>
                    </div>)
                    }
               </div>
          </section>
     )
}



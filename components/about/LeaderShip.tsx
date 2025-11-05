import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'

const LeaderShip = ({ leadership }: { leadership: any }) => { 
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

export default LeaderShip

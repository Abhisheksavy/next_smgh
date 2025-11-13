import { CircleCheck } from "lucide-react";
import Image from "next/image";
import React from "react";
const MissionVision = ({ mission }:{mission:any}) => {
     console.log("mission page", mission.vision)
    

     return (
          <section className="section-padding "> 
               <div className="container relative z-2">
                    <div className="grid grid-cols-12 gap-3">
                        
                         
                         {mission?.vision?.slice(0, 2).map((data: any, index: number) => {
                              console.log("mission page data", data)
                              return (
                                   <div key={index} className="col-span-12 md:col-span-6 bg-primary/4 px-8 pt-8">
                                        {(() => {
                                             const words = data?.description?.split(" ") || []
                                             const title = words.slice(0, 2).join(" ")
                                             const rest = words.slice(2).join(" ")

                                             return (
                                                  <div>
                                                       <h2 className="text-2xl font-normal! commonTitle">{title}
                                                            <span className="text-black!"> {rest}</span>
                                                       </h2>
                                                  </div>
                                             )
                                        })()}
                                        <div className="flex justify-end">
                                             {index === 0 ?
                                             <Image width="400" height="400" src="/images/ourMission.svg" alt="" className="max-w-65 w-full h-auto opacity-4" />: 
                                             <Image width="400" height="400" src="/images/ourVision.svg" alt="" className="max-w-65 w-full h-auto opacity-4" />}
                                        </div>
                                   </div>
                              )
                         })}

                         {mission?.vision?.[2] && (
                              <div className="col-span-12  bg-primary/4 px-8 pt-8">
                                   <div className="grid grid-cols-12 gap-3">
                                        <div className="col-span-12 md:col-span-6 flex flex-col justify-between">
                                             <h2 className="text-2xl font-normal! commonTitle">  {mission?.vision?.[2]?.description} </h2>
                                             <div className=" -ml-8">
                                                  <Image width="400" height="400" src="/images/ourValues.svg" alt="" className="max-w-65 w-full h-auto opacity-4" />
                                                  {/* <Image width="400" height="400" src={mission.vision?.[2]?.backgroundImage} alt="" className="max-w-75 w-full h-auto opacity-4" /> */}
                                             </div>
                                        </div>
                                        <div className="col-span-12 md:col-span-6 flex flex-col gap-y-6 pb-8">
                                             {mission.vision?.[2] && (
                                                  mission.vision?.[2].items?.map((list: any, index: number) => {
                                                       return (

                                                            <div key={index} className="flex gap-x-3 ">
                                                                 <CircleCheck className=" flex-[0_0_auto]  w-4 text-secondary mt-0.5" />                                                                 <div className="flex-1">
                                                                      <h3 className="text-lg font-medium text-secondary"> <span> {list?.title}</span>
                                                                      </h3>
                                                                      <p className="text-base leading-[1.31]">{list?.description}</p>
                                                                 </div>
                                                            </div>

                                                       )
                                                  })


                                             )}
                                        </div>
                                   </div>

                              </div>



                         )}

                    </div>
               </div>
          </section>

     )
};

export default MissionVision;

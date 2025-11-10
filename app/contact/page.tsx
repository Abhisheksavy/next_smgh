"use client"
import React from 'react'
import { ArrowRight, User } from 'lucide-react';
import { zodResolver } from "@hookform/resolvers/zod"
import Input from '@/components/ui/input';
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from '@/components/ui/button';
import data from '@/public/data/contact.json';
import InnerBanner from '@/components/common/InnerBanner';
import Contact from '@/components/home/Contact';

const userSchema = z.object({
     firstName: z.string().min(1, "First name is required"),
     familyName: z.string().min(1, "Family name is required"),
     emailAddress: z.string().email("Invalid email format"),
     contact: z.string().regex(/^[0-9]{10,15}$/, "Contact must be a valid number"),
     comments: z.string().optional(),
});
type UserFormData = z.infer<typeof userSchema>

const page = () => {
     const {
          register,
          handleSubmit,
          formState: { errors, isSubmitting },
          reset,
     } = useForm<UserFormData>({
          resolver: zodResolver(userSchema),

     })


     const onSubmit = (data: UserFormData) => {
          console.log("Form Submitted:", data)
          reset()
     }


     return (
          <>
               <InnerBanner data={data?.banner} />
               <section className='section-padding '>
                    <div className="container">
                         <div className="form-container bg-primary/3 section-padding spacing-x rounded-md">
                              <div className="text-center mb-10">
                                   <h2 className="text-center commonTitle font-medium!">Contact Us</h2>
                                   <p className="text-gray-600 text-base  leading-relaxed">
                                        We are ready to hear you! We will do our best to respond as promptly as possible.
                                   </p>
                              </div>

                              <div>

                                   <form
                                        onSubmit={handleSubmit(onSubmit)}
                                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                                   >
                                        <div>
                                             <label className='mb-2.5 block'>First Name <sup>*</sup></label>
                                             <Input
                                                  className="w-full bg-primary/4 px-4 rounded"
                                                  {...register("firstName")}
                                                  placeholder=""
                                             />

                                             {errors.firstName && (
                                                  <p className="text-red-500 text-sm mt-1">
                                                       {errors.firstName.message}
                                                  </p>
                                             )}
                                        </div>

                                        <div>
                                             <label className='mb-2.5 block'>Family Name <sup>*</sup></label>
                                             <Input
                                                  className="w-full bg-primary/4 px-4 rounded"
                                                  {...register("familyName")}
                                                  placeholder=""
                                             />
                                             {errors.familyName && (
                                                  <p className="text-red-500 text-sm mt-1">
                                                       {errors.familyName.message}
                                                  </p>
                                             )}
                                        </div>

                                        <div className="md:col-span-2">
                                             <label className='mb-2.5 block'>Email Address <sup>*</sup></label>
                                             <Input
                                                  type="email"
                                                  className="w-full bg-primary/4 px-4 rounded"
                                                  {...register("emailAddress")}
                                                  placeholder=""
                                             />
                                             {errors.emailAddress && (
                                                  <p className="text-red-500 text-sm mt-1">
                                                       {errors.emailAddress.message}
                                                  </p>
                                             )}
                                        </div>

                                        <div className="md:col-span-2">
                                             <label className='mb-2.5 block'>Contact  <sup>*</sup></label>
                                             <Input
                                                  type="text"
                                                  className="w-full bg-primary/4 px-4 rounded"
                                                  {...register("contact")}
                                                  placeholder=""
                                             />

                                             {errors.contact && (
                                                  <p className="text-red-500 text-sm mt-1">
                                                       {errors.contact.message}
                                                  </p>
                                             )}
                                        </div>

                                        <div className="md:col-span-2">
                                             <label className='mb-2.5 block'>Your Comments (optional)</label>
                                             <textarea
                                                  rows={5}
                                                  placeholder=""
                                                  {...register("comments")}
                                                  className="w-full bg-primary/4 px-4 rounded min-h-30"
                                             />
                                        </div>

                                        <div className="md:col-span-2 text-center">
                                             {/* <button
                                                  type="submit"
                                                  disabled={isSubmitting}
                                                  className="bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/80 transition"
                                             >
                                                 
                                             </button> */}

                                             <Button type='submit' variant='default' disabled={isSubmitting} >
                                                  {isSubmitting ? "Submitting..." : <>Submit  <ArrowRight /></>}
                                             </Button>


                                        </div>
                                   </form>
                              </div>
                         </div>
                         <div className="mt-7">
                              <div className=" font-medium text-secondary mb-2">Please Note:</div>
                              <p>This form is intended for use for non-emergency requests. If you are experiencing an injury or symptom that is serious or can be life-threatening, please call 910 or visit our Emergency department.</p>
                         </div>
                    </div>
               </section>
               {/* {data?.contact === "true" && <Contact />} */}

          </>
     )
}

export default page 

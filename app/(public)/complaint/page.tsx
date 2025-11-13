"use client"
import React from 'react'
import { ArrowRight, User } from 'lucide-react';
import { zodResolver } from "@hookform/resolvers/zod"
import Input from '@/components/ui/input';
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from '@/components/ui/button';

const userSchema = z.object({
     firstName: z.string().min(1, "First name is required"),
     lastName: z.string().min(1, "Family name is required"),
     dob: z.string().min(1, "D.O.B is required"),
     gender: z.string().min(1, "Gender is required"),
     emailAddress: z.string().email("Invalid email format"),
     contact: z.string().regex(/^[0-9]{10,15}$/, "Contact must be a valid number"),
     comments: z.string().optional(),

});

type UserFormData = z.infer<typeof userSchema>

export default function SubmitComplaint() {
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
          <section className='section-padding'>
               <div className="container">
                    <div className="grid grid-cols-12 gap-4">
                         <div className="md:col-span-5 lg:col-span-4 2xl:col-span-3">
                              <div className="">
                                   <div>Contact Us</div>
                                   <div>Complaint Form</div>
                                   <div>Complaint Form</div>
                              </div>
                         </div>
                         <div className="md:col-span-7 lg:col-span-8 2xl:col-span-9">
                              <div className="form-container bg-primary/3 section-padding spacing-x rounded-md px-10 py-15">
                                   <div className="text-center mb-10">
                                        <h2 className="text-center commonTitle font-medium!">Submit a Complaint</h2>
                                   </div>

                                   <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-12 gap-6">
                                        <div className='col-span-4'>
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

                                        <div className='col-span-4'>
                                             <label className='mb-2.5 block'>last Name <sup>*</sup></label>
                                             <Input
                                                  className="w-full bg-primary/4 px-4 rounded"
                                                  {...register("lastName")}
                                                  placeholder=""
                                             />
                                             {errors.lastName && (
                                                  <p className="text-red-500 text-sm mt-1">
                                                       {errors.lastName.message}
                                                  </p>
                                             )}
                                        </div>
                                        <div className='col-span-4'>
                                             <label className='mb-2.5 block'>D.O.B <sup>*</sup></label>
                                             <Input
                                                  className="w-full bg-primary/4 px-4 rounded"
                                                  {...register("dob")}
                                                  placeholder=""
                                             />
                                             {errors.dob && (
                                                  <p className="text-red-500 text-sm mt-1">
                                                       {errors.dob.message}
                                                  </p>
                                             )}
                                        </div>

                                        <div className=" col-span-12">
                                             <label className="mb-2.5 block">Gender <sup>*</sup></label>
                                             <div className="flex items-center gap-6">
                                                  <label className="flex items-center gap-2">
                                                       <input
                                                            type="radio"
                                                            value="Male"
                                                            {...register("gender", { required: "Gender is required" })}
                                                       />
                                                       Male
                                                  </label>
                                                  <label className="flex items-center gap-2">
                                                       <input
                                                            type="radio"
                                                            value="Female"
                                                            {...register("gender", { required: "Gender is required" })}
                                                       />
                                                       Female
                                                  </label>
                                                  <label className="flex items-center gap-2">
                                                       <input
                                                            type="radio"
                                                            value="Not Relevant"
                                                            {...register("gender", { required: "Gender is required" })}
                                                       />
                                                       Not Relevant
                                                  </label>
                                             </div>
                                             {errors.gender && (
                                                  <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>
                                             )}
                                        </div>


                                        <div className="col-span-12">
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

                                        <div className="col-span-12">
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

                                        <div className="col-span-12">
                                             <label className='mb-2.5 block'>Your Comments (optional)</label>
                                             <textarea
                                                  rows={5}
                                                  placeholder=""
                                                  {...register("comments")}
                                                  className="w-full bg-primary/4 px-4 rounded min-h-30"
                                             />
                                        </div>

                                        <div className="col-span-12 text-center">
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
                    </div>
               </div>
          </section>
     )
}

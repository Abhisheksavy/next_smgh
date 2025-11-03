"use client"
import React from 'react'
import { User } from 'lucide-react';
import { zodResolver } from "@hookform/resolvers/zod"
import Input from '@/components/ui/input';
import { useForm } from "react-hook-form"
import { z } from "zod"

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
                                   <Input
                                        className="w-full bg-white/28 pl-4.5"
                                        {...register("firstName")}
                                        placeholder="sds"
                                   />
                                   <form
                                        onSubmit={handleSubmit(onSubmit)}
                                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                                   >
                                        <div>
                                             <input
                                                  type="text"
                                                  placeholder="First Name"
                                                  {...register("firstName")}
                                                  className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                                             />
                                             
                                             {errors.firstName && (
                                                  <p className="text-red-500 text-sm mt-1">
                                                       {errors.firstName.message}
                                                  </p>
                                             )}
                                        </div>

                                        <div>
                                             <input
                                                  type="text"
                                                  placeholder="Family Name"
                                                  {...register("familyName")}
                                                  className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                                             />
                                             {errors.familyName && (
                                                  <p className="text-red-500 text-sm mt-1">
                                                       {errors.familyName.message}
                                                  </p>
                                             )}
                                        </div>

                                        <div className="md:col-span-2">
                                             <input
                                                  type="email"
                                                  placeholder="Email Address"
                                                  {...register("emailAddress")}
                                                  className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                                             />
                                             {errors.emailAddress && (
                                                  <p className="text-red-500 text-sm mt-1">
                                                       {errors.emailAddress.message}
                                                  </p>
                                             )}
                                        </div>

                                        <div className="md:col-span-2">
                                             <input
                                                  type="text"
                                                  placeholder="Contact Number"
                                                  {...register("contact")}
                                                  className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                                             />
                                             {errors.contact && (
                                                  <p className="text-red-500 text-sm mt-1">
                                                       {errors.contact.message}
                                                  </p>
                                             )}
                                        </div>

                                        <div className="md:col-span-2">
                                             <textarea
                                                  rows={5}
                                                  placeholder="Your Comments (optional)"
                                                  {...register("comments")}
                                                  className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                                             />
                                        </div>

                                        <div className="md:col-span-2 text-center">
                                             <button
                                                  type="submit"
                                                  disabled={isSubmitting}
                                                  className="bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/80 transition"
                                             >
                                                  {isSubmitting ? "Submitting..." : "Submit"}
                                             </button>


                                        </div>
                                   </form>
                              </div>
                         </div>
                    </div>
               </section>

          </>
     )
}

export default page 

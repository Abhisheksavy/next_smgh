"use client"
import React from 'react'
import { ArrowRight, User } from 'lucide-react';
import { zodResolver } from "@hookform/resolvers/zod"
import Input from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import DatePickerInput from '@/components/ui/DatePickerInput';
import { useForm, Controller } from "react-hook-form"
import { optional, z } from "zod"
import RadioGroup from '@/components/ui/RadioGroup';
import { Select } from '@/components/ui/select';
const userSchema = z.object({
     firstName: z.string().min(1, "First name is required"),
     lastName: z.string().min(1, "Family name is required"),

     // Accepts Date or ISO string from datepicker, then validates as date
     dob: z.preprocess((val) => {
          if (val instanceof Date) return val;
          if (typeof val === "string" && val.length) return new Date(val);
          return val;
     }, z.date({ required_error: "D.O.B is required" })),

     gender: z.enum(["male", "female", "not-relevant"] as const, {
          required_error: "Please select a gender",
     }),

     homeAddress: z.string().min(1, "Home address is required"),
     phone: z.string().regex(/^[0-9]{10,15}$/, "Must be a valid number"),
     emailAddress: z.string().email("Invalid email format"),

     behalf: z.enum(["yes", "no"] as const, {
          required_error: "Please check this field",
     }),

     patientFirstName: z.string().optional(),
     patientLastName: z.string().optional(),
     patientPhone: z.string().optional(),
     patientRelation: z.string().optional(),

     permissionToPatient: z.enum(["yes", "no"] as const, {
          required_error: "Please select an option",
     }),

     yourComplaint: z.string().optional(),

     discussedWithStaff: z.enum(["yes", "no"] as const, {
          required_error: "Please select an option",
     }),

     withWhoom: z.string().optional(),
     result: z.string().optional(),

     whatIsImportantToYou: z.enum(
          [
               "reported",
               "preventing-recurrence",
               "acknowledgment",
               "restoring-relationship",
               "answers",
               "advice",
          ] as const,
          { required_error: "Please check this field" }
     ),

     accessToMedicalFile: z.enum(["yes", "no"] as const, {
          required_error: "Please check this field",
     }),

     contactMethod: z.enum(["email", "phone", "mail"], {
          required_error: "Please select how you want to be contacted",
     }),
});

type UserFormData = z.infer<typeof userSchema>

export default function SubmitComplaint() {
     const {
          control,
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
                                             <Controller
                                                  name="dob"
                                                  control={control}
                                                  render={({ field }) => (
                                                       <DatePickerInput
                                                            value={field.value}
                                                            onChange={field.onChange}
                                                            placeholder="Select Date of Birth"
                                                            className="w-full "
                                                       />
                                                  )}
                                             />
                                             {errors.dob && (
                                                  <p className="text-red-500 text-sm">{errors.dob.message}</p>
                                             )}
                                        </div>
                                        <div className=" col-span-12">
                                             <label className="mb-2.5 block">Gender <sup>*</sup></label>
                                             <div className="flex items-center gap-6">
                                                  {/* <label className="flex items-center gap-2">
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
                                                  </label> */}
                                                  <Controller
                                                       name="gender"
                                                       control={control}
                                                       render={({ field }) => (
                                                            <RadioGroup
                                                                 name="gender"
                                                                 register={register}
                                                                 error={errors.gender}
                                                                 options={[
                                                                      { value: "male", label: "Male" },
                                                                      { value: "female", label: "Female" },
                                                                      { value: "not-relevant", label: "Not Relevant" }
                                                                 ]}
                                                            />
                                                       )}
                                                  />


                                             </div>
                                             {errors.gender && (
                                                  <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>
                                             )}
                                        </div>

                                        <div className="col-span-12">
                                             <label className='mb-2.5 block'>Home Address <sup>*</sup></label>
                                             <Input
                                                  type="text"
                                                  className="w-full bg-primary/4 px-4 rounded"
                                                  {...register("homeAddress")}
                                                  placeholder=""
                                             />
                                             {errors.homeAddress && (
                                                  <p className="text-red-500 text-sm mt-1">
                                                       {errors.homeAddress.message}
                                                  </p>
                                             )}
                                        </div>
                                        <div className="col-span-6">
                                             <label className='mb-2.5 block'>Phone Number  <sup>*</sup></label>
                                             <Input
                                                  type="text"
                                                  className="w-full bg-primary/4 px-4 rounded"
                                                  {...register("phone")}
                                                  placeholder=""
                                             />

                                             {errors.phone && (
                                                  <p className="text-red-500 text-sm mt-1">
                                                       {errors.phone.message}
                                                  </p>
                                             )}
                                        </div>
                                        <div className="col-span-6">
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

                                        <div className=" col-span-12">
                                             <label className="mb-2.5 block">Are you filing this complaint on behalf of someone else? <sup>*</sup></label>
                                             <div className="flex items-center gap-6">

                                                  <Controller
                                                       name="behalf"
                                                       control={control}
                                                       render={({ field }) => (
                                                            <RadioGroup
                                                                 name="behalf"
                                                                 register={register}
                                                                 error={errors.gender}
                                                                 options={[
                                                                      { value: "yes", label: "Yes" },
                                                                      { value: "no", label: "No" }
                                                                 ]}
                                                            />
                                                       )}
                                                  />


                                             </div>
                                             {errors.behalf && (
                                                  <p className="text-red-500 text-sm mt-1">{errors.behalf.message}</p>
                                             )}
                                        </div>

                                        <div className='col-span-6'>
                                             <label className='mb-2.5 block'>Patient's First Name(s) </label>
                                             <Input
                                                  className="w-full bg-primary/4 px-4 rounded"
                                                  {...register("patientFirstName")}
                                                  placeholder=""
                                             />
                                             {errors.patientFirstName && (
                                                  <p className="text-red-500 text-sm mt-1">
                                                       {errors.patientFirstName.message}
                                                  </p>
                                             )}
                                        </div>
                                        {/* Patient's Last Name */}
                                        <div className='col-span-6'>
                                             <label className='mb-2.5 block'>Patient's Last Name(s)</label>
                                             <Input
                                                  className="w-full bg-primary/4 px-4 rounded"
                                                  {...register("patientLastName")}
                                                  placeholder=""
                                             />
                                             {errors.patientLastName && (
                                                  <p className="text-red-500 text-sm mt-1">{errors.patientLastName.message}</p>
                                             )}
                                        </div>

                                        {/* Patient Phone */}
                                        <div className='col-span-6'>
                                             <label className='mb-2.5 block'>Patient Phone Number</label>
                                             <Input
                                                  type="text"
                                                  className="w-full bg-primary/4 px-4 rounded"
                                                  {...register("patientPhone")}
                                                  placeholder=""
                                             />
                                             {errors.patientPhone && (
                                                  <p className="text-red-500 text-sm mt-1">{errors.patientPhone.message}</p>
                                             )}
                                        </div>
                                        {/* Relationship to Patient */}
                                        <div className='col-span-6'>
                                             <label className='mb-2.5 block'>Relationship to Patient</label>
                                             <Input
                                                  className="w-full bg-primary/4 px-4 rounded"
                                                  {...register("patientRelation")}
                                                  placeholder=""
                                             />
                                             {errors.patientRelation && (
                                                  <p className="text-red-500 text-sm mt-1">{errors.patientRelation.message}</p>
                                             )}
                                        </div>
                                        <div className=" col-span-12">
                                             <label className="mb-2.5 block">Do you have permission from the patient to submit this complaint? <sup>*</sup></label>
                                             <div className="flex items-center gap-6">

                                                  <Controller
                                                       name="permissionToPatient"
                                                       control={control}
                                                       render={({ field }) => (
                                                            <RadioGroup
                                                                 name="permissionToPatient"
                                                                 register={register}
                                                                 error={errors.permissionToPatient}
                                                                 options={[
                                                                      { value: "yes", label: "Yes" },
                                                                      { value: "no", label: "No" }
                                                                 ]}
                                                            />
                                                       )}
                                                  />


                                             </div>
                                             {errors.permissionToPatient && (
                                                  <p className="text-red-500 text-sm mt-1">{errors.permissionToPatient.message}</p>
                                             )}
                                        </div>




                                        {/* Your Complaint */}
                                        <div className="col-span-12">
                                             <label className='mb-2.5 block'>Describe the Complaint in your Own Words</label>
                                             <textarea
                                                  rows={5}
                                                  {...register("yourComplaint")}
                                                  className="w-full bg-primary/4 px-4 rounded min-h-30"
                                             />
                                             {errors.yourComplaint && (
                                                  <p className="text-red-500 text-sm mt-1">{errors.yourComplaint.message}</p>
                                             )}
                                        </div>

                                        {/* Discussed with Staff */}
                                        <div className="col-span-12">
                                             <label className="mb-2.5 block">
                                                  Have you discussed your complaint with a staff member of SMGH? <sup>*</sup>
                                             </label>
                                             <Controller
                                                  name="discussedWithStaff"
                                                  control={control}
                                                  render={({ field }) => (
                                                       <RadioGroup
                                                            name="discussedWithStaff"
                                                            register={register}
                                                            error={errors.discussedWithStaff}
                                                            options={[
                                                                 { value: "yes", label: "Yes" },
                                                                 { value: "no", label: "No" }
                                                            ]}
                                                       />
                                                  )}
                                             />
                                             {errors.discussedWithStaff && (
                                                  <p className="text-red-500 text-sm mt-1">{errors.discussedWithStaff.message}</p>
                                             )}
                                        </div>

                                        {/* With Whom */}
                                        <div className="col-span-6">
                                             <label className='mb-2.5 block'>If Yes, with Whom?</label>
                                             <Input
                                                  className="w-full bg-primary/4 px-4 rounded"
                                                  {...register("withWhoom")}
                                                  placeholder=""
                                             />
                                             {errors.withWhoom && (
                                                  <p className="text-red-500 text-sm mt-1">{errors.withWhoom.message}</p>
                                             )}
                                        </div>

                                        {/* Result */}
                                        <div className="col-span-6">
                                             <label className='mb-2.5 block'>What was the Result?</label>
                                             <Input
                                                  className="w-full bg-primary/4 px-4 rounded"
                                                  {...register("result")}
                                                  placeholder=""
                                             />
                                             {errors.result && (
                                                  <p className="text-red-500 text-sm mt-1">{errors.result.message}</p>
                                             )}
                                        </div>

                                        {/* What is Important to You */}
                                        <div className="col-span-12">
                                             <label className="mb-2.5 block">
                                                  What makes it important for you to submit this complaint? <sup>*</sup>
                                             </label>
                                             <Controller
                                                  name="whatIsImportantToYou"
                                                  control={control}
                                                  render={({ field }) => (
                                                       <RadioGroup
                                                            name="whatIsImportantToYou"
                                                            register={register}
                                                            error={errors.whatIsImportantToYou}
                                                            options={[
                                                                 { value: "reported", label: "I just want it to be reported/registered" },
                                                                 { value: "preventing-recurrence", label: "Preventing recurrence (that other patients do not experience this)" },
                                                                 { value: "acknowledgment", label: "Acknowledgment/apologies from the healthcare professional(s) involved" },
                                                                 { value: "restoring-relationship", label: "Restoring the relationship with my healthcare provider(s)" },
                                                                 { value: "answers", label: "Answers to my questions" },
                                                                 { value: "advice", label: "Advice from the Complaint Officer" },
                                                            ]}
                                                       />
                                                  )}
                                             />
                                             {errors.whatIsImportantToYou && (
                                                  <p className="text-red-500 text-sm mt-1">{errors.whatIsImportantToYou.message}</p>
                                             )}
                                        </div>

                                        {/* Access to Medical File */}
                                        <div className="col-span-12">
                                             <label className="mb-2.5 block">
                                                  Do you give the Complaint Officer & management access to your medical file? <sup>*</sup>
                                             </label>
                                             <Controller
                                                  name="accessToMedicalFile"
                                                  control={control}
                                                  render={({ field }) => (
                                                       <RadioGroup
                                                            name="accessToMedicalFile"
                                                            register={register}
                                                            error={errors.accessToMedicalFile}
                                                            options={[
                                                                 { value: "yes", label: "Yes" },
                                                                 { value: "no", label: "No" }
                                                            ]}
                                                       />
                                                  )}
                                             />
                                             {errors.accessToMedicalFile && (
                                                  <p className="text-red-500 text-sm mt-1">{errors.accessToMedicalFile.message}</p>
                                             )}
                                        </div>


                                        <div className="col-span-12">
                                             <label className='mb-2.5 block'>How do you want to be contacted about your complaint?</label>
                                            

                                             <Select
                                                  {...register("contactMethod")}
                                                  options={[ 
                                                       { value: "yes", label: "Yes" },
                                                       { value: "no", label: "No" },
                                                  ]}
                                                  placeholder="Please select..."
                                                  // value={f.value as string}
                                                  onChange={(e)=>console.log("e", e)}
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

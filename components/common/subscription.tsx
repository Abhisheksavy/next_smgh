import React from 'react'
import Input from '../ui/input'
import { Button } from '../ui/button'

const SubscriptionForm = () => {
     return (
          <div className='flex flex-col gap-4'>
               <div>
                    <Input type='text' placeholder='Name' className='w-full h-12.5 px-5 py-3.5 rounded-md border-0 bg-primary/4 text-black' />

               </div>
               <div>
                    <Input type='email' placeholder='Email' className='w-full h-12.5 px-5 py-3.5 rounded-md border-0 bg-primary/4 text-black' />
               </div>
               <div>
                    <Button type='submit' variant='default' > Subscribe</Button>
               </div>
          </div>
     )
}

export default SubscriptionForm

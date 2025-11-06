import React from 'react'

const CounterLink = ({ data }: any) => {
     function formatCount(num: number) {
          if (isNaN(num) || num < 0) return "0";
          if (num < 1000) return num.toString();
          if (num < 1_000_000) return (num / 1000).toFixed(1).replace(/\.0$/, "") + "k";
          if (num < 1_000_000_000) return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
          return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "B";
     }

     return (
          <a href={data?.link} className='cursor-pointer  py-3 text-dark/60 font-normal text-base leading-none hover:text-primary transition-all ease-in-out duration-300 flex justify-between items-center'>
               <span>{data.name}</span>
               <span className='bg-tealgreen rounded-full aspect-square h-auto min-w-7 p-0.5 text-white text-xs  flex items-center justify-center'>{formatCount(Number(data.count))}</span>
          </a>
     )
}

export default CounterLink

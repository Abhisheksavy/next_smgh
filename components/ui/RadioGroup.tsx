import React from "react"
import { UseFormRegister, FieldError } from "react-hook-form"

interface Option {
  label: string
  value: string
}

interface RadioGroupProps {
  options: Option[]
  name: string
  register: UseFormRegister<any>
  error?: FieldError
  className?: string
}


export default function RadioGroup({ 
  options, 
  name, 
  register, 
  error,
  className = "" 
}: RadioGroupProps) {
  return (
    <div className={className}>
      <div className="flex flex-wrap gap-4 md:gap-6 xl:gap-8  2xl:gap-9">
        {options.map((option) => (
          <label 
            key={option.value}
            className="relative flex items-center cursor-pointer group"
          >
            <input
              type="radio"
              value={option.value}
              {...register(name)}
              className="sr-only peer"
            />
            <div className="flex items-center gap-2.5 rounded-lg  transition-all peer-checked:text-primary  peer-checked:[&_.inputBorder]:border-primary
             peer-checked:[&_.inputBorderDot]:opacity-100 peer-checked:[&_.inputText]:text-primary">
              <div className="relative w-4 h-4 flex items-center justify-center">
                <div className="inputBorder w-4 h-4 rounded-full border-2 border-foreground/40 peer-checked:border-primary transition-all " />
                <div className="inputBorderDot absolute w-2 h-2 rounded-full bg-primary opacity-0 peer-checked:opacity-100 transition-opacity" />
              </div>
              <span className="inputText text-sm font-medium text-foreground/40 peer-checked:text-primary transition-colors">
                {option.label}
              </span>
            </div>
          </label>
        ))}
      </div>
      {error && (
        <p className="text-red-500 text-sm mt-2">{error.message}</p>
      )}
    </div>
  )
}
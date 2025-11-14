import { useState, useEffect } from "react"
interface DatePickerInputProps {
  value?: Date | null
  onChange?: (date: Date) => void
  placeholder?: string
  className?: string
}

export default function DatePickerInput({ 
  value, 
  onChange, 
  placeholder = "Select date",
  className = ""
}: DatePickerInputProps) {
  const [internalDate, setInternalDate] = useState(value || new Date())
  const [showCalendar, setShowCalendar] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(value || new Date())

  useEffect(() => {
    if (value) {
      setInternalDate(value)
      setCurrentMonth(value)
    }
  }, [value])

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]

  const daysInMonth = (date: any) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const firstDayOfMonth = (date: any) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const formatDate = (date: any) => {
    if (!date) return ""
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
  }

  const handleDateClick = (day: any) => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    setInternalDate(newDate)
    setShowCalendar(false)
    if (onChange) {
      onChange(newDate)
    }
  }

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }

  const renderCalendar = () => {
    const days = []
    const totalDays = daysInMonth(currentMonth)
    const firstDay = firstDayOfMonth(currentMonth)

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-9 w-9" />)
    }

    for (let day = 1; day <= totalDays; day++) {
      const isSelected = internalDate && 
                        internalDate.getDate() === day && 
                        internalDate.getMonth() === currentMonth.getMonth() &&
                        internalDate.getFullYear() === currentMonth.getFullYear()
      
      const isToday = new Date().getDate() === day && 
                     new Date().getMonth() === currentMonth.getMonth() &&
                     new Date().getFullYear() === currentMonth.getFullYear()

      days.push(
        <button
          key={day}
          onClick={() => handleDateClick(day)}
          type="button"
          className={`h-9 w-9 rounded-lg text-sm transition-all
            ${isSelected 
              ? 'bg-black text-white font-medium' 
              : isToday
              ? 'border border-gray-300 text-gray-900 hover:bg-gray-100'
              : 'text-gray-700 hover:bg-gray-100'
            }`}
        >
          {day}
        </button>
      )
    }

    return days
  }

  return (
    <div className={`relative ${className}`}>
      <input
        type="text"
        value={formatDate(internalDate)}
        onClick={() => setShowCalendar(!showCalendar)}
        readOnly
        className="py-4 outline-none text-sm w-full bg-primary/4 px-4 rounded cursor-pointer"
        placeholder={placeholder}
      />
      
      {showCalendar && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setShowCalendar(false)}
          />
          <div className="absolute top-full mt-2 w-72 bg-white border border-gray-200 rounded-xl shadow-lg p-4 z-50">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={handlePrevMonth}
                type="button"
                className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <div className="text-sm font-medium text-gray-900">
                {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </div>
              
              <button
                onClick={handleNextMonth}
                type="button"
                className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                <div key={day} className="h-9 w-9 flex items-center justify-center text-xs font-medium text-gray-500">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {renderCalendar()}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
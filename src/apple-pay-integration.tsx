'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Button } from "./components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar"
import { Input } from "./components/ui/input"

export default function Home() {
  const [price, setPrice] = useState('0')
  const [isEditing, setIsEditing] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPrice = event.target.value.replace(/^0+|[^\d]/g, '')
    setPrice(newPrice || '0')
  }

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.setSelectionRange(inputRef.current.value.length, inputRef.current.value.length)
    }
  }, [isEditing])

  const handlePayment = () => {
    alert(`Payment of $${price} would be processed here.`)
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 font-sans text-lg">
      <div className="bg-gray-100 p-6 flex flex-col items-center justify-center">
        <Avatar className="h-24 w-24 mb-4">
          <AvatarImage src="/placeholder.svg" alt="@username" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <span className="text-2xl font-bold">@username</span>
      </div>

      <div className="flex-grow flex flex-col items-center justify-center p-6">
        <div className="text-center w-full max-w-sm mb-12">
          <span className="text-gray-500 mb-4 block text-2xl">Amount Due</span>
          <div className="flex justify-center items-center">
            <div className="inline-flex items-center">
              <span className="text-7xl font-bold text-black mr-1">$</span>
              <Input
                ref={inputRef}
                type="text"
                inputMode="numeric"
                value={price}
                onChange={handlePriceChange}
                onFocus={() => setIsEditing(true)}
                onBlur={() => setIsEditing(false)}
                className="text-7xl font-bold text-black bg-transparent border-none focus:outline-none focus:ring-0 w-[200px]"
                style={{ caretColor: 'blue' }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 bg-gray-100">
        <Button 
          className="w-full h-20 text-2xl bg-black hover:bg-gray-800 text-white rounded-2xl" 
          onClick={handlePayment}
        >
          Pay
        </Button>
      </div>
    </div>
  )
}
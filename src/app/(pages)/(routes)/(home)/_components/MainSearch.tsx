"use client"
import React, { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation';

const MainSearch = () => {

  const router = useRouter();
  const [formValues, setFormValues] = useState({
    destination: "paris", // Default destination
    activity: "hiking",   // Default activity
    duration: "0-8",      // Default duration
    price: "250-900",     // Default price
  });

  const handleChange = (key: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleSearch=()=>{
    const query = new URLSearchParams(formValues).toString();
    
    router.push(`/search?${query}`)
  }

  return (
    <div className='absolute z-50 left-1/2 transform -translate-x-1/2 top-[670px] md:top-[850px]
    lg:top-[400px] xl:top-[470px]  2xl:top-[570px] container px-8
    '>
      <div className='bg-white <div className="bg-white shadow-lg py-10 px-2 
      lg:px-24 rounded-md lg:rounded-full flex flex-col mt-12 lg:mt-24 lg:flex-row
       items-center justify-between p-4 gap-3'>
        <Select
          defaultValue={formValues.destination}
          onValueChange={(value)=>handleChange("destination",value)}
        >
          <SelectTrigger className="w-full py-6">
            <SelectValue placeholder="Destination" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="paris">Paris</SelectItem>
            <SelectItem value="new-york">New York</SelectItem>
            <SelectItem value="tokyo">Tokyo</SelectItem>
          </SelectContent>
        </Select>

        <Select
          defaultValue={formValues.activity}
          onValueChange={(value) => handleChange("activity", value)}
        
        >
          <SelectTrigger className="w-full py-6">
            <SelectValue placeholder="Activity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="hiking">Hiking</SelectItem>
            <SelectItem value="swimming">Swimming</SelectItem>
            <SelectItem value="sightseeing">Sightseeing</SelectItem>
          </SelectContent>
        </Select>

        <Select
           defaultValue={formValues.duration}
           onValueChange={(value) => handleChange("duration", value)}
        >
          <SelectTrigger className="w-full py-6">
            <SelectValue placeholder="0 Days - 8 Days" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0-8">0 Days - 8 Days</SelectItem>
            <SelectItem value="8-15">8 Days - 15 Days</SelectItem>
            <SelectItem value="15+">15+ Days</SelectItem>
          </SelectContent>
        </Select>
        <Select
          defaultValue={formValues.price}
          onValueChange={(value) => handleChange("price", value)}
        
        >
          <SelectTrigger className="w-full py-6">
            <SelectValue placeholder="$250 - $900" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="250-900">$250 - $900</SelectItem>
            <SelectItem value="900-1500">$900 - $1500</SelectItem>
            <SelectItem value="1500+">$1500+</SelectItem>
          </SelectContent>
        </Select>

        <Button 
        onClick={handleSearch}
        
        className="bg-orange-500 text-white hover:bg-orange-600 py-6 w-full">
          Find Now
        </Button>
      </div>


    </div>
  )
}

export default MainSearch
import React from 'react'
import { MapPin } from "lucide-react";
import { recomendScholarship } from '@/data/mockData';

const RecomendContent = () => {
  
  return (
    <>
        <div className="flex flex-col gap-6 mx-4 mb-16">
        <h3 className="font-medium text-2xl">Recommended</h3>

        {recomendScholarship.map((scholarship, index) => (

        <div key={index} className="bg-white p-4 cursor-pointer  border-primary border-[3px] rounded-xl mx-3 max-w-9/12">
          <h3 className="font-medium text-3xl mb-3">
            {scholarship.name}
          </h3>

          <div className="flex flex-row gap-2">
            <MapPin
              size={35}
              stroke="#ffffff" 
              strokeWidth={2} 
              fill="#757575"
            />
            <h4 className="font-medium text-2xl mb-2">{scholarship.company}</h4>
          </div>

          <p className="font-light">
            {scholarship.description}
           
          </p>
        </div>
        ))}

      </div>
    </>
  )
}

export default RecomendContent
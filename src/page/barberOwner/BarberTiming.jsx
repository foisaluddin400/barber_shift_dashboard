import React from "react";
import img1 from "../../assets/header/img11.jpg";
import img2 from "../../assets/header/img12.jpg";

const barbers = [
  { id: 1, name: "Bahram Ferzand", image: img1, rating: 5.0 },
  { id: 2, name: "Bahram Ferzand", image: img2, rating: 5.0 },
  { id: 3, name: "Bahram Ferzand", image: img1, rating: 5.0 },
  { id: 4, name: "Bahram Ferzand", image: img2, rating: 5.0 },
];

export const BarberTiming = ({ singleBarber }) => {
  console.log(singleBarber?.data?.schedule);

  return (
    <div className=" max-w-5xl">
      {/* Shop Barber Section */}
      <h2 className="text-[#D17C51] font-semibold text-lg mb-4">Shop Barber</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {barbers.map((barber) => (
          <div key={barber.id} className="flex items-center border rounded-lg ">
            <img
              src={barber.image}
              alt={barber.name}
              className="w-[170px] h-[120px] rounded-tl rounded-bl object-cover"
            />
            <div className="ml-4 p-4">
              <h3 className="font-semibold text-lg">{barber.name}</h3>
              <span className="mt-1 px-3 py-1 bg-[#D17C51] text-white text-sm font-semibold rounded-md inline-block">
                {barber.rating} ★
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Shop Timings Section */}

      {singleBarber?.data?.schedule?.map((day) => (
        <div>
          <h2 className="font-semibold text-xl mt-8 mb-4">Shop Timings</h2>
          <div className="border-t border-gray-300">
            <div className="flex justify-between py-2 border-b">
              <span>{day?.dayName}</span>
              <span className="font-semibold">{day?.openingTime} - {day?.closingTime}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span>{day?.isActive ? 'Open' : 'Close'}</span>

            
            </div>
          
          </div>
        </div>
        
       ))}
    </div>
  );
};

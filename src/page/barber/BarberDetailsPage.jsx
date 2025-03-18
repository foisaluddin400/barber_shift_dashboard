import React from "react";
import { FaStar } from "react-icons/fa";
import image from "../../assets/header/image.png";
import image1 from "../../assets/header/imge1.png";
import { Navigate } from "../../Navigate";

const BarberDetailsPage = () => {
  return (
    <div className="p-1 ">
      {/* Back Button & Title */}
      <Navigate title={'Details'}></Navigate>

      {/* Profile Section */}
      <div className="flex items-center gap-4 mt-5">
        <img src={image} alt="Barber" className="w-16 h-16 rounded-full" />
        <div>
          <p className="text-lg font-semibold">Jane Cooper</p>
          <p className="text-sm text-gray-500">JaneCooper@gmail.com</p>
        </div>
      </div>

      {/* Input Fields */}
      <div className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium">Personal Name</label>
          <input
            type="text"
            className="w-full border p-2 rounded-md"
            value="Abiha Sunshine"
            disabled
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            className="w-full border p-2 rounded-md"
            value="abihasunshine@gmail.com"
            disabled
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Contact</label>
          <input
            type="tel"
            className="w-full border p-2 rounded-md"
            value="+7838737999"
           disabled
          />
        </div>
      </div>

      {/* Rating Section */}
      <div className="mt-4 flex items-center gap-2 text-lg">
        <FaStar className="text-yellow-500" />
        <span className="font-medium">Rating: 4.9/5 (250+ Reviews)</span>
      </div>

      {/* Barber Photos */}
      <div className="mt-5">
        <h3 className="text-lg font-semibold mb-2">Barber Photos</h3>
        <div className="flex gap-3 overflow-x-auto">
          <img src={image} alt="Haircut 1" className="w-full h-[380px] object-cover rounded-lg" />
          <img src={image1} alt="Haircut 2" className="w-full h-[380px] object-cover rounded-lg" />
          <img src={image} alt="Haircut 3" className="w-full h-[380px] object-cover rounded-lg" />
          <img src={image1} alt="Haircut 4" className="w-full h-[380px] object-cover rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default BarberDetailsPage;

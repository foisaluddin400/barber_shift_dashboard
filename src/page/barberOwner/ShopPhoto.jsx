import React from 'react'
import image from "../../assets/header/image.png";
import image1 from "../../assets/header/imge1.png";
export const ShopPhoto = () => {
  return (
    <div>
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
  )
}

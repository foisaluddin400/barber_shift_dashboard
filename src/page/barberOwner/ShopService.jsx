import React from "react";

export const ShopService = () => {
  return (
    <div>
      <div className="mt-6 space-y-4">
        <div className="grid grid-cols-3">
          <div>
            <label className="block text-sm font-medium">Service Name</label>
            <input
              type="text"
              className="w-full border p-2 rounded-tl rounded-bl"
              value="Abiha Sunshine"
              disabled
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Price</label>
            <input
              type="email"
              className="w-full  p-2  border-t border-b"
              value="abihasunshine@gmail.com"
              disabled
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Time</label>
            <input
              type="tel"
              className="w-full border p-2 rounded-tr rounded-br"
              value="+7838737999"
              disabled
            />
          </div>
        </div>
        <div className="grid grid-cols-3">
          <div>
            <label className="block text-sm font-medium">Service Name</label>
            <input
              type="text"
              className="w-full border p-2 rounded-tl rounded-bl"
              value="Abiha Sunshine"
              disabled
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Price</label>
            <input
              type="email"
              className="w-full  p-2  border-t border-b"
              value="abihasunshine@gmail.com"
              disabled
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Time</label>
            <input
              type="tel"
              className="w-full border p-2 rounded-tr rounded-br"
              value="+7838737999"
              disabled
            />
          </div>
        </div>
      </div>
    </div>
  );
};

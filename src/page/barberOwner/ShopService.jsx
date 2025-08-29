import React from "react";

export const ShopService = ({ singleBarber }) => {
  // if (!services || services.length === 0) {
  //   return <p className="mt-4 text-gray-500">No services available.</p>;
  // }

  return (
    <div className="mt-6 space-y-4">
      {singleBarber?.data?.services?.map((service) => (
        <div key={service?.id} className="grid grid-cols-3 gap-2">
          <div>
            <label className="block text-sm font-medium">Service Name</label>
            <input
              type="text"
              className="w-full border p-2 rounded-tl rounded-bl"
              value={service?.serviceName}
              disabled
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Price</label>
            <input
              type="text"
              className="w-full border-t border-b p-2"
              value={`$${service?.price}`}
              disabled
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Time</label>
            <input
              type="text"
              className="w-full border p-2 rounded-tr rounded-br"
              value={`${service?.duration} min`}
              disabled
            />
          </div>
        </div>
      ))}
    </div>
  );
};

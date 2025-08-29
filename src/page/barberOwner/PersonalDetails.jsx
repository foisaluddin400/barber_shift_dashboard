import React from 'react'

export const PersonalDetails = ({singleBarber}) => {
  console.log(singleBarber)
  return (
    <div>
        <div className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium">Personal Name</label>
          <input
            type="text"
            className="w-full border p-2 rounded-md"
            value={singleBarber?.data?.fullName}
            disabled
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Shop Name</label>
          <input
            type="text"
            className="w-full border p-2 rounded-md"
            value={singleBarber?.data?.shopName}
            disabled
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Status</label>
          <input
            type="text"
            className="w-full border p-2 rounded-md"
            value={singleBarber?.data?.status}
            disabled
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            className="w-full border p-2 rounded-md"
            value={singleBarber?.data?.email}
            disabled
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Contact</label>
          <input
            type="tel"
            className="w-full border p-2 rounded-md"
            value={singleBarber?.data?.phoneNumber}
           disabled
          />
        </div>
        <div>
          <label className="block text-sm font-medium">City</label>
          <input
            type="text"
            className="w-full border p-2 rounded-md"
            value={singleBarber?.data?.shopAddress}
            disabled
          />
        </div>
      </div>
    </div>
  )
}

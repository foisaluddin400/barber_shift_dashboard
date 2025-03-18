import React from 'react'

export const PersonalDetails = () => {
  return (
    <div>
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
          <label className="block text-sm font-medium">Shop Name</label>
          <input
            type="text"
            className="w-full border p-2 rounded-md"
            value="Abiha Sunshine"
            disabled
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Shop Type</label>
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
        <div>
          <label className="block text-sm font-medium">City</label>
          <input
            type="text"
            className="w-full border p-2 rounded-md"
            value="Abiha Sunshine"
            disabled
          />
        </div>
      </div>
    </div>
  )
}

import React from "react";
import { FaStar } from "react-icons/fa";
import { Navigate } from "../../Navigate";
import { useParams } from "react-router-dom";
import { useGetSingleAllBarberQuery } from "../redux/api/manageApi";

const BarberDetailsPage = () => {
  const { id } = useParams();
  const { data: singleData } = useGetSingleAllBarberQuery(
    { id },
    { refetchOnMountOrArgChange: true }
  );

  const barber = singleData?.data;

  if (!barber) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="p-2">
      {/* Back Button & Title */}
      <Navigate title={"Barber Details"} />

      {/* Profile Section */}
      <div className="flex items-center gap-4 mt-5">
        <img
          src={barber?.shopLogo || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
          alt="Barber"
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <p className="text-lg font-semibold">{barber.fullName}</p>
          <p className="text-sm text-gray-500">{barber.email}</p>
        </div>
      </div>

      {/* Input Fields */}
      <div className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium">Personal Name</label>
          <input
            type="text"
            className="w-full border p-2 rounded-md"
            value={barber.fullName}
            disabled
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            className="w-full border p-2 rounded-md"
            value={barber.email}
            disabled
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Contact</label>
          <input
            type="tel"
            className="w-full border p-2 rounded-md"
            value={barber.phoneNumber || "N/A"}
            disabled
          />
        </div>
      </div>

      {/* Rating Section */}
      <div className="mt-4 flex items-center gap-2 text-lg">
        <FaStar className="text-yellow-500" />
        <span className="font-medium">
          Rating: {barber.avgRating || 0}/5 ({barber.ratingCount || 0} Reviews)
        </span>
      </div>

      {/* Skills & Experience */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Skills & Experience</h3>
        <p>
          <strong>Experience:</strong> {barber.experienceYears} years
        </p>
        <p>
          <strong>Skills:</strong> {barber.skills?.join(", ")}
        </p>
        <p>
          <strong>Bio:</strong> {barber.bio}
        </p>
      </div>

      {/* Barber Photos / Portfolio */}
      <div className="mt-5">
        <h3 className="text-lg font-semibold mb-2">Barber Portfolio</h3>
        <div className="flex gap-3 overflow-x-auto">
          {barber.portfolio?.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Portfolio ${index + 1}`}
              className="w-[300px] h-[380px] object-cover rounded-lg"
            />
          ))}
          {!barber.portfolio?.length && <p>No portfolio images available.</p>}
        </div>
      </div>

      {/* Shop Info */}
      {/* <div className="mt-5">
        <h3 className="text-lg font-semibold mb-2">Shop Details</h3>
        <p>
          <strong>Shop Name:</strong> {barber.shopName}
        </p>
        <p>
          <strong>Shop Address:</strong> {barber.shopAddress}
        </p>
        {barber.shopLogo && (
          <img
            src={barber.shopLogo}
            alt="Shop Logo"
            className="w-32 h-32 object-cover rounded mt-2"
          />
        )}
      </div> */}
    </div>
  );
};

export default BarberDetailsPage;

import React from 'react';
import { useParams } from 'react-router-dom';
import travelAgenciesData from '../data/travelAgenciesData';
import GetAquote from '../forms/GetAQuoteForm'; // ✅ Make sure this path is correct

const GetAQuote = () => {
  const { destinationId, agencyId } = useParams();

  // Find the agency from the data
  const agency = travelAgenciesData[destinationId]?.find(
    (a) => a.id === agencyId
  );

  // If not found, show message
  if (!agency) {
    return (
      <div className="p-6 max-w-6xl mx-auto text-center text-red-500">
        Agency not found.
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto flex flex-col md:flex-row gap-6">
      {/* Left Side: Agency Info (30%) */}
      <div className="w-full md:w-1/3 bg-gray-100 p-4 rounded shadow">
        <img
          src={agency.image}
          alt={agency.name}
          className="w-full h-48 object-cover rounded mb-4"
        />
        <h2 className="text-2xl font-bold mb-2 text-blue-900">{agency.name}</h2>
        <p className="text-gray-700">{agency.title}</p>
      </div>

      {/* Right Side: Your Existing Form (70%) */}
      <div className="w-full md:w-2/3 bg-white rounded shadow border">
        <GetAquote agency={agency} />
      </div>
    </div>
  );
};

export default GetAQuote;

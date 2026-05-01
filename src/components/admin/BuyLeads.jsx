import React from 'react';

export default function BuyLeads() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Buy Leads (Demo)</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1,2,3,4,5,6].map((id) => (
          <div key={id} className="border rounded p-4 bg-white">
            <h3 className="font-medium">Lead #{id}</h3>
            <p className="text-sm text-gray-600">Destination inquiry demo lead.</p>
            <button className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded">Purchase</button>
          </div>
        ))}
      </div>
    </div>
  );
}



import React from 'react';

export default function MyReports() {
  const stats = [
    { label: 'Total Leads', value: 128 },
    { label: 'Converted', value: 37 },
    { label: 'Revenue', value: '₹4,20,000' },
  ];
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">My Reports (Demo)</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {stats.map((s) => (
          <div key={s.label} className="border rounded p-4 bg-white">
            <div className="text-sm text-gray-500">{s.label}</div>
            <div className="text-xl font-bold">{s.value}</div>
          </div>
        ))}
      </div>
      <div className="bg-white border rounded p-4">
        <h3 className="font-medium mb-2">Recent Conversions</h3>
        <ul className="list-disc list-inside text-gray-700">
          <li>Dubai Luxury Tour - 5 pax</li>
          <li>Bali Family Trip - 3 pax</li>
          <li>Jaipur Weekend - 2 pax</li>
        </ul>
      </div>
    </div>
  );
}



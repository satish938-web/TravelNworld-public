import React from 'react';

export default function MyTeam() {
  const members = [
    { id: 1, name: 'Nawlesh', role: 'Team Lead', email: 'lead@example.com' },
    { id: 2, name: 'Priya', role: 'Sales Exec', email: 'priya@example.com' },
    { id: 3, name: 'Name', role: 'Operations', email: 'name@example.com' },
  ];
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">My Team (Demo)</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {members.map((m) => (
          <div key={m.id} className="bg-white border rounded p-4">
            <div className="text-lg font-medium">{m.name}</div>
            <div className="text-sm text-gray-600">{m.role}</div>
            <div className="text-sm text-gray-500 mt-1">{m.email}</div>
            <button className="mt-3 px-3 py-1 bg-indigo-600 text-white rounded">View Profile</button>
          </div>
        ))}
      </div>
    </div>
  );
}



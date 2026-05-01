import React from 'react';

export default function MyReviews() {
  const reviews = [
    { id: 1, user: 'Amit', rating: 5, text: 'Fantastic Dubai experience!' },
    { id: 2, user: 'Sara', rating: 4, text: 'Bali trip was well organized.' },
  ];
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">My Reviews (Demo)</h2>
      <div className="space-y-3">
        {reviews.map((r) => (
          <div key={r.id} className="bg-white border rounded p-4">
            <div className="flex items-center justify-between">
              <strong>{r.user}</strong>
              <span className="text-yellow-600">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</span>
            </div>
            <p className="text-gray-700 mt-1">{r.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}



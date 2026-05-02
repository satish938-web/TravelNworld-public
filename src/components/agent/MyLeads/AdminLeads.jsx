export default function AdminLeads({ data }) {
  return (
    <div className="flex flex-col md:flex-row items-stretch bg-white shadow-md border border-indigo-200 rounded-xl p-4 w-full hover:shadow-lg transition-shadow duration-200 cursor-pointer">
      {/* Left Section */}
      <div className="flex-1 flex flex-col justify-between">
        <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 mb-2">
          <span>{data.timeAgo}</span>
          <span className="text-blue-700 font-medium underline cursor-pointer">
            {data.destination}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm mt-2">
          <span className="flex items-center gap-1">
            <svg width="14" height="14" fill="none">
              <circle cx="7" cy="7" r="7" fill="#bbb" />
            </svg>
            <span className="font-semibold text-gray-700">From:</span>
            <span className="font-semibold text-gray-700">{data.from}</span>
          </span>
          <span className="flex items-center gap-1">
            <svg width="14" height="14" fill="none">
              <rect width="14" height="14" fill="#bbb" />
            </svg>
            NA
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm mt-2">
          <span className="flex items-center gap-1">
            <svg width="14" height="14" fill="none">
              <circle cx="7" cy="7" r="7" fill="#bbb" />
            </svg>
            NA
          </span>
          <span className="flex items-center gap-1">
            <svg width="14" height="14" fill="none">
              <circle cx="7" cy="7" r="7" fill="#bbb" />
            </svg>
            NA
          </span>
        </div>

        <div className="flex items-center gap-3 text-sm mt-2">
          <span className="flex items-center gap-1">
            Pax: 👤({data.pax.adults}) + 👶(0) 🍼(0)
          </span>
          <span className="flex items-center gap-1">
            <svg width="14" height="14" fill="none">
              <circle cx="7" cy="7" r="7" fill="#bbb" />
            </svg>
            NA
          </span>
        </div>

        <div className="flex items-center gap-2 mt-3 text-sm">
          <span>Quality:</span>
          <span className="h-2 w-24 bg-gray-300 rounded-md relative">
            <span
              className="absolute h-2 bg-green-600 rounded-md"
              style={{ width: "30%" }}
            ></span>
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-gray-500">
          <span>
            Source:{" "}
            <span className="font-semibold text-black">{data.source}</span>
          </span>
          <span>
            Sold:{" "}
            <span className="font-semibold text-black">
              {data.times_sold} Time
            </span>
          </span>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex flex-col justify-between items-end md:pl-6 mt-4 md:mt-0 min-w-[200px]">
        <div>
          <div className="flex items-center gap-2 text-xs text-gray-700 mb-2">
            <svg width="14" height="14" fill="none">
              <rect width="14" height="14" fill="#bbb" />
            </svg>
            <span>
              {data.dates.start} - {data.dates.end} | {data.dates.nights_days}
            </span>
          </div>
          <div className="text-lg font-bold text-gray-800 mb-1">
            ₹ {data.price.toLocaleString()}
          </div>
        </div>

        <div>
          <a
            href="#"
            className="text-blue-700 text-sm font-semibold block"
          >
            {data.seller.name}
          </a>
          <span className="text-xs text-gray-500 block mb-2">
            Since: {data.seller.since}
          </span>
          <div className="flex items-center gap-3 mb-3">
            <span className="cursor-pointer text-xl">📞</span>
            <span className="cursor-pointer text-xl">🟢</span>
          </div>
          <button className="bg-violet-600 hover:bg-violet-700 text-white px-5 py-2 rounded-md font-medium text-sm transition-colors duration-200">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

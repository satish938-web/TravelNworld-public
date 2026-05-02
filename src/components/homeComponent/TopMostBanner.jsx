import { useEffect, useState } from "react";
import axios from "axios";
import { getImageUrl, API_BASE } from "../../utils/api";

const TopMostBanner = () => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE}/api/banners?position=top`)
      .then((res) => {
        if (res?.data && Array.isArray(res.data)) setBanners(res.data);
      })
      .catch(console.error);
  }, []);

  if (banners.length === 0) return null;

  // Repeat enough times to always fill the screen with no gaps
  const loopBanners = [...banners, ...banners, ...banners, ...banners];

  return (
    <div className="relative w-full overflow-hidden bg-white border-b border-gray-200 shadow-sm">
      <div className="flex"
        style={{
          width: "max-content",
          gap: "0px",
          animation: "marqueeTop 40s linear infinite",
        }}
      >
        {loopBanners.map((banner, index) => (
          <div
            key={index}
            className="relative flex-shrink-0 cursor-pointer overflow-hidden"
            style={{
              width: "300px",
              height: "100px",
            }}
            onClick={() => banner.link && window.open(banner.link, "_blank")}
          >
            <img
              src={getImageUrl(banner.imageUrl)}
              alt="Banner"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marqueeTop {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default TopMostBanner;

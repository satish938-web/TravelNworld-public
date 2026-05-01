import React, { useRef } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
 
// Images (replace with your actual assets)
import Img1 from "../../assets/images/verifiedCustomers/img1.jpeg";
import Img2 from "../../assets/images/verifiedCustomers/img2.jpeg";
import Img3 from "../../assets/images/verifiedCustomers/img3.jpeg";
 
const imageItems = [
  { type: "image", src: Img1 },
  { type: "image", src: Img2 },
  { type: "image", src: Img3 },
  { type: "image", src: Img1 }, // repeat for demo
];
 
const HappyCustomerImages = () => {
  const scrollRef = useRef(null);
 
  const handleScrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };
 
  const handleScrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };
 
  return (
    <div className="relative w-full">
      <h2 className="text-xl font-semibold mb-4"> Images</h2>
 
      {/* Image Cards Wrapper */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
      >
        {imageItems.map((item, index) => (
          <div
            key={index}
            className="min-w-[300px] max-w-[320px] bg-white border rounded-lg shadow-sm overflow-hidden flex-shrink-0"
          >
            <img
              src={item.src}
              alt={`customer-${index}`}
              className="w-full h-60 object-cover"
            />
          </div>
        ))}
      </div>
 
      {/* Left Scroll Button */}
      <button
        onClick={handleScrollLeft}
        className="absolute top-1/2 -translate-y-1/2 left-0 bg-white border rounded-full shadow-md p-2 hover:bg-gray-100"
      >
        <ChevronLeft size={20} />
      </button>
 
      {/* Right Scroll Button */}
      <button
        onClick={handleScrollRight}
        className="absolute top-1/2 -translate-y-1/2 right-0 bg-white border rounded-full shadow-md p-2 hover:bg-gray-100"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};
 
export default HappyCustomerImages;
import React from "react";
import { motion } from "framer-motion";

const Ticker = () => {
  const destinations = [
    "SANTORINI", "MALDIVES", "KYOTO", "PATAGONIA", "CAPPADOCIA",
    "AMALFI COAST", "SWISS ALPS", "SAFARI KENYA", "FJORDS",
    "PARIS", "BALI", "ICELAND", "DUBAI", "MACHU PICCHU"
  ];

  return (
    <div className="bg-red-600 py-3 overflow-hidden border-y border-red-700/50">
      <div className="flex whitespace-nowrap">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="flex items-center gap-12 px-6"
        >
          {[...destinations, ...destinations].map((dest, i) => (
            <div key={i} className="flex items-center gap-4">
              <span className="text-white text-[12px] font-black tracking-[0.3em] font-['Montserrat']">
                ✦ {dest}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Ticker;

import React from "react";
import {
  FaMapMarkedAlt,
  FaLaptopCode,
  FaUsers,
  FaPlaneDeparture,
  FaSuitcaseRolling,
  FaRegClock,
  FaBlog,
  FaShieldAlt,
} from "react-icons/fa";
import { motion } from "framer-motion";

// Services array
const services = [
  {
    icon: FaPlaneDeparture,
    title: "B2B Travel Packages",
    description:
      "We collaborate with ticketing agents and transport providers to offer seamless travel solutions — including flights, stays, and logistics for corporate or group travel.",
  },
  {
    icon: FaUsers,
    title: "Digital Travel Services",
    description:
      "From zero-interest EMI options to digital booking tools, we simplify bulk travel management and empower our B2B clients with flexible financial and digital solutions.",
  },
  {
    icon: FaRegClock,
    title: "24/7 Partner Support",
    description:
      "Get round-the-clock assistance with bookings, updates, or technical queries — ensuring you never face downtime during critical B2B operations.",
  },
  {
    icon: FaLaptopCode,
    title: "Website Development",
    description:
      "We build responsive, high-converting websites tailored for travel businesses. From design to deployment, we manage it all — fast and SEO-optimized.",
  },
  {
    icon: FaShieldAlt,
    title: "Secure & Reliable Systems",
    description:
      "Safety is non-negotiable. Our systems ensure insured travel, secure transactions, and real-time support — so your customers can trust your brand.",
  },
  {
    icon: FaBlog,
    title: "Industry Insights & Blogs",
    description:
      "Explore our curated blogs focused on travel trends, digital transformation, and business growth strategies for B2B travel partners.",
  },
  {
    icon: FaLaptopCode,
    title: "Social Media Management",
    description:
      "We handle your brand’s presence across all major platforms — content creation, scheduling, analytics — to boost your online visibility and engagement.",
  },
  {
    icon: FaUsers,
    title: "Logo Design",
    description:
      "Establish a strong visual identity with our custom logo and branding packages — built specifically for travel startups and agencies.",
  },
  {
    icon: FaUsers,
    title: "Branding & Social Media Management",
    description:
      "We craft your travel brand’s identity with custom logo design, consistent visual language, and professional social media management. From strategy to execution, we handle your complete digital presence to boost trust and visibility.",
  },
];

// Animation Variants
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const iconVariants = {
  animate: {
    rotateY: [0, 360],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

const AboutOurServices = () => {
  return (
    <section className="bg-blue-100 py-12 px-4 sm:px-6 md:px-10 lg:px-20">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center text-2xl sm:text-3xl md:text-4xl font-bold text-orange-600 mb-10"
      >
        ✈️ TravelnWorlds At Your Service
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {services.map((service, index) => {
          const IconComponent = service.icon;

          return (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariants}
              className="bg-blue-200 p-5 sm:p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="flex items-center mb-4">
                {/* Flip Icon */}
                <motion.div
                  variants={iconVariants}
                  animate="animate"
                  className="w-12 h-12 flex items-center justify-center bg-orange-100 rounded-full mr-4"
                >
                  <IconComponent className="text-2xl sm:text-3xl text-blue-500" />
                </motion.div>

                <h3 className="font-semibold text-base sm:text-lg text-gray-800">
                  {service.title}
                </h3>
              </div>
              <p className="text-sm sm:text-base text-gray-600 flex-grow">
                {service.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default AboutOurServices;

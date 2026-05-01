// transporterBlogData.js

import ayodhya from "../assets/images/verified/ayodhya.jpg";
import shivam from "../assets/images/verified/Shivam_travels.jpeg";
import ram from "../assets/images/verified/ram.JPG";
import arora from "../assets/images/verified/arora.jpeg";

// Placeholder image for Shiv Tour & Travel (id: 5)
const placeholderImg = "https://via.placeholder.com/300x150";

const transporterBlogData = [
  // Transporter 1: Ayodhya Darshan Yatra
  {
    id: 1,
    transporterId: 1,
    title: "Spiritual Journey through Ayodhya",
    desc: "Visit Ram Mandir and ancient ghats with local guidance.",
    img: ayodhya,
    imgStyle: "w-full h-[200px] object-cover rounded-lg",
    content: [
      "Our spiritual tours help you connect with the roots of Ramayana...",
      {
        type: "list",
        items: ["Ram Janmabhoomi", "Hanuman Garhi", "Evening Saryu Aarti"]
      },
      "Book now for a divine experience with Ayodhya Darshan Yatra."
    ]
  },
  {
    id: 2,
    transporterId: 1,
    title: "Why Pilgrims Love Our Yatra Packages",
    desc: "Affordable and deeply spiritual experiences in Ayodhya.",
    img: ayodhya,
    imgStyle: "w-full h-[200px] object-cover rounded-lg",
    content: [
      "We provide trusted tour services with local insights...",
      {
        type: "list",
        items: ["Comfortable transport", "Temple priority access", "Guided heritage walks"]
      }
    ]
  },

  // Transporter 2: Shivam Travels
  {
    id: 3,
    transporterId: 2,
    title: "Explore Himachal & More with Shivam Travels",
    desc: "From Ayodhya to hills — we cover it all.",
    img: shivam,
    imgStyle: "w-full h-[200px] object-cover rounded-lg",
    content: [
      "Trusted for both spiritual and adventure tours...",
      {
        type: "list",
        items: ["Ayodhya trips", "Shimla-Manali packages", "Char Dham Yatra"]
      }
    ]
  },
  {
    id: 4,
    transporterId: 2,
    title: "Why Tourists Keep Coming Back",
    desc: "High customer satisfaction and personalized service.",
    img: shivam,
    imgStyle: "w-full h-[200px] object-cover rounded-lg",
    content: [
      "We build journeys that feel like family outings...",
      {
        type: "list",
        items: ["Multi-destination plans", "Family-friendly tours", "24x7 support"]
      }
    ]
  },

  // Transporter 3: RAM RATH TOUR AND TRAVELS
  {
    id: 5,
    transporterId: 3,
    title: "Experience Ayodhya with Ram Rath",
    desc: "Spiritual depth and historical richness combined.",
    img: ram,
    imgStyle: "w-full h-[200px] object-cover rounded-lg",
    content: [
      "Our luxury packages offer comfort with devotion...",
      {
        type: "list",
        items: ["Exclusive darshan", "Local cuisine", "Evening aarti included"]
      }
    ]
  },
  {
    id: 6,
    transporterId: 3,
    title: "Trusted by 150+ Pilgrims Monthly",
    desc: "Quality tours with verified transport and guides.",
    img: ram,
    imgStyle: "w-full h-[200px] object-cover rounded-lg",
    content: [
      "Pilgrims appreciate our personalized touch...",
      {
        type: "list",
        items: ["Group bookings", "Senior citizen assistance", "Spiritual storytelling"]
      }
    ]
  },

  // Transporter 4: Arora Tour and Travel
  {
    id: 7,
    transporterId: 4,
    title: "Lucknow to Ayodhya: Quick & Comfortable",
    desc: "Ideal for weekend spiritual getaways.",
    img: arora,
    imgStyle: "w-full h-[200px] object-cover rounded-lg",
    content: [
      "Start your journey from Lucknow in style...",
      {
        type: "list",
        items: ["1-day and 2-day options", "Verified guides", "Modern fleet"]
      }
    ]
  },
  {
    id: 8,
    transporterId: 4,
    title: "Customized Family Packages Available",
    desc: "We tailor trips to suit your family's needs.",
    img: arora,
    imgStyle: "w-full h-[200px] object-cover rounded-lg",
    content: [
      "From children to elders, we make trips enjoyable for everyone...",
      {
        type: "list",
        items: ["Ayodhya plus nearby temples", "Meal options", "Flexible timings"]
      }
    ]
  },

  // Transporter 5: Shiv Tour & Travel
  {
    id: 9,
    transporterId: 5,
    title: "Best Budget-Friendly Pilgrimage Tours",
    desc: "Spiritual travel made affordable and easy.",
    img: placeholderImg,
    imgStyle: "w-full h-[200px] object-cover rounded-lg",
    content: [
      "We specialize in low-cost, high-value trips...",
      {
        type: "list",
        items: ["Ayodhya, Varanasi, Prayagraj", "Hotel + Darshan combos", "WhatsApp support"]
      }
    ]
  },
  {
    id: 10,
    transporterId: 5,
    title: "Shiv Tour's Rajasthan Heritage Ride",
    desc: "A perfect mix of religion and culture.",
    img: placeholderImg,
    imgStyle: "w-full h-[200px] object-cover rounded-lg",
    content: [
      "Rajasthan is more than forts — it's also temples and stories...",
      {
        type: "list",
        items: ["Jaipur, Ajmer, Pushkar", "Budget hotels", "Group tours"]
      }
    ]
  }
];

export default transporterBlogData;

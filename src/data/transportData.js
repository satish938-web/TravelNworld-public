import ayodhya from '../assets/images/verified/ayodhya.jpg';
import shivam from '../assets/images/verified/Shivam_travels.jpeg';
import arora from '../assets/images/verified/arora.jpeg'
import jasswant from '../assets/images/verified/jasswant.jpeg';
import danish from '../assets/images/verified/danish.jpeg';
import monika from '../assets/images/verified/monika.jpeg'
function generateSlug(text) {
  return text
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}
const transportData = [
  {
    id: 1,
    image: ayodhya,
    title: "Ayodhya Darshan Yatra",
    slug: generateSlug("Ayodhya Darshan Yatra"),
    location: "Jharkhandi, Rikabganj, Ayodhya",
    fullAddress:"54H/54 Jharkhandi, Rikabganj, Ayodhya,India", 
    rating: 4.8,
    reviews: 120,
    verified: true,
    website: "https://ayodhyadarshanyatra.com/",
    distance: "500 mts",
    phone: "08147943975",
    whatsapp: "918147943975",
    tags: ["Hotels", "Hotels Rs 501 To Rs 1000"],
    tourPackages: [
      {
        destination: "Ayodhya",
        slug: generateSlug("Ayodhya Darshan"),
        description: "Darshan & Sightseeing tour",
        price: "₹2999",
      },
      {
        destination: "Nearby Pilgrimage",
        slug: generateSlug("Nearby Pilgrimage"),
        description: "Half day trip to nearby temples",
        price: "₹1499",
      },
      {
        destination: "Ayodhya",
        slug: generateSlug("Ayodhya Sightseeing"),
        description: "Darshan & Sightseeing tour",
        price: "₹2999",
      },
    ],
  },
  {
    id: 2,
    image: shivam,
    title: "Shivam travels",
    slug: generateSlug("Shivam travels"),
    location: "Paonta Sahib",
    fullAddress: "Near, Paonta Sahib, Himachal Pradesh 173025, India",
    rating: 4.7,
    reviews: 98,
    verified: true,
    website: "https://example.com/skyline",
    phone: "08147943975",
    whatsapp: "918147943975",
    tags: ["Hotels", "Hotels Rs 501 To Rs 1000"],
    tourPackages: [
      {
        destination: "Ayodhya",
        slug: generateSlug("Ayodhya Darshan Shivam"),
        description: "Darshan & Sightseeing tour",
        price: "₹2999",
      },
      {
        destination: "Nearby Pilgrimage",
        slug: generateSlug("Nearby Pilgrimage Shivam"),
        description: "Half day trip to nearby temples",
        price: "₹1499",
      },
      {
        destination: "Ayodhya",
        slug: generateSlug("Ayodhya Sightseeing Shivam"),
        description: "Darshan & Sightseeing tour",
        price: "₹2999",
      },
      {
        destination: "Ayodhya",
        slug: generateSlug("Ayodhya Full Tour"),
        description: "Darshan & Sightseeing tour",
        price: "₹2999",
      },
      {
        destination: "Nearby Pilgrimage",
        slug: generateSlug("Nearby Pilgrimage Full"),
        description: "Half day trip to nearby temples",
        price: "₹1499",
      },
      {
        destination: "Rajashthan",
        slug: generateSlug("Rajashthan Tour"),
        description: "Darshan & Sightseeing tour",
        price: "₹2999",
      },
    ],
  },
  {
    id: 3,
    image: jasswant,
    name: "Jasswant singh",
    title: "Trip And Ticket",
    slug: generateSlug("Trip And Ticket"),
    location: "Kurukshetra, Haryana",
    fullAddress: "Sector -13, 1st Floor widhata Complex Opposite New Bus Stand,Kurukshetra",
    rating: 4.9,
    reviews: 150,
    verified: true,
    Website: "www.tripandticket.in",
    phone: "9896018936",
    whatsapp: "9671399093", //Social media links =https://www.instagram.com/tripandticket?igsh=em9icHRldjhhenF0
    email: "info@tripandticket.in",
    tags: ["Hotels", "Hotels Rs 501 To Rs 1000"],
    tourPackages: [
      {
        destination: "Ayodhya",
        slug: generateSlug("Ayodhya Darshan Trip"),
        description: "Darshan & Sightseeing tour",
        price: "₹2999",
      },
      {
        destination: "Nearby Pilgrimage",
        slug: generateSlug("Nearby Pilgrimage Trip"),
        description: "Half day trip to nearby temples",
        price: "₹1499",
      },
      {
        destination: "Ayodhya",
        slug: generateSlug("Ayodhya Sightseeing Trip"),
        description: "Darshan & Sightseeing tour",
        price: "₹2999",
      },
      {
        destination: "Ayodhya",
        slug: generateSlug("Ayodhya Full Trip"),
        description: "Darshan & Sightseeing tour",
        price: "₹2999",
      },
      {
        destination: "Nearby Pilgrimage",
        slug: generateSlug("Nearby Pilgrimage Full Trip"),
        description: "Half day trip to nearby temples",
        price: "₹1499",
      },
      {
        destination: "Rajashthan",
        slug: generateSlug("Rajashthan Trip Tour"),
        description: "Darshan & Sightseeing tour",
        price: "₹2999",
      },
    ], //  Add this
  },
  {
    id: 4,
    image: arora,
    title: "Arora Tour and Travel",
    slug: generateSlug("Arora Tour and Travel"),
    location: "Harayana, India",
    fullAddress: "Charkhi Dadri,Harayana",
    rating: 4.6,
    reviews: 75,
    verified: true,
    website: "https://example.com/extra",
    phone: "08147943975",
    whatsapp: "918147943975",
    tags: ["Hotels", "Hotels Rs 501 To Rs 1000"],
    tourPackages: [
      {
        destination: "Ayodhya",
        slug: generateSlug("Ayodhya Arora"),
        description: "Darshan & Sightseeing tour",
        price: "₹2999",
      },
      {
        destination: "Nearby Pilgrimage",
        slug: generateSlug("Nearby Pilgrimage Arora"),
        description: "Half day trip to nearby temples",
        price: "₹1499",
      },
      {
        destination: "Ayodhya",
        slug: generateSlug("Ayodhya Sightseeing Arora"),
        description: "Darshan & Sightseeing tour",
        price: "₹2999",
      },
      {
        destination: "Ayodhya",
        slug: generateSlug("Ayodhya Full Arora"),
        description: "Darshan & Sightseeing tour",
        price: "₹2999",
      },
      {
        destination: "Nearby Pilgrimage",
        slug: generateSlug("Nearby Pilgrimage Full Arora"),
        description: "Half day trip to nearby temples",
        price: "₹1499",
      },
      {
        destination: "Rajashthan",
        slug: generateSlug("Rajashthan Arora"),
        description: "Darshan & Sightseeing tour",
        price: "₹2999",
      },
    ],
  },
  {
    id: 5,
    name: "Danish Aabid",
    image: danish,
    title: "Holiday Pump",
    slug: generateSlug("Holiday Pump"),
    location: "Utrakhand, India",
    fullAddress: "Nehru coloney Road Dheradun,248001,Utrakhand, India",
    email: "holidaypumpddn@gmail.com",
    rating: 4.5,
    reviews: 80,
    verified: true,
    website: "https://example.com/shiv",
    phone: "7535838485",
    whatsapp: "7302131527",
    tags: ["Hotels", "Hotels Rs 501 To Rs 1000"],
    tourPackages: [
      {
        destination: "Ayodhya",
        slug: generateSlug("Ayodhya Holiday"),
        description: "Darshan & Sightseeing tour",
        price: "₹2999",
      },
      {
        destination: "Nearby Pilgrimage",
        slug: generateSlug("Nearby Pilgrimage Holiday"),
        description: "Half day trip to nearby temples",
        price: "₹1499",
      },
      {
        destination: "Rajashthan",
        slug: generateSlug("Rajashthan Holiday"),
        description: "Darshan & Sightseeing tour",
        price: "₹2999",
      },
      {
        destination: "Ayodhya",
        slug: generateSlug("Ayodhya Full Holiday"),
        description: "Darshan & Sightseeing tour",
        price: "₹2999",
      },
      {
        destination: "Ayodhya",
        slug: generateSlug("Ayodhya Quick Holiday"),
        description: "Darshan & Sightseeing tour",
        price: "₹2999",
      },
    ],
  },
  {
    id: 6,
    name: "Monika moters",
    image: monika,
    title: "Monika moters Tour & Travel",
    slug: generateSlug("Monika moters"),
    location: "Haryana, India",
    fullAddress: "Opoosite Krishna Resort Near Byepass Chowk ,Yamuna Nagar,Harayana,135001,Haryana,India",
    email: "bhavnishsharma093@gmail.com",
    rating: 4.5,
    reviews: 80,
    verified: true,
    website: "https://example.com/shiv",
    phone: "9813285145",
    whatsapp: "9813172656",
    tags: ["Hotels", "Hotels Rs 501 To Rs 1000"],
    tourPackages: [
      {
        destination: "Ayodhya",
        slug: generateSlug("Ayodhya Monika"),
        description: "Darshan & Sightseeing tour",
        price: "₹2999",
      },
      {
        destination: "Nearby Pilgrimage",
        slug: generateSlug("Nearby Pilgrimage Monika"),
        description: "Half day trip to nearby temples",
        price: "₹1499",
      },
      {
        destination: "Rajashthan",
        slug: generateSlug("Rajashthan Monika"),
        description: "Darshan & Sightseeing tour",
        price: "₹2999",
      },
      {
        destination: "Ayodhya",
        slug: generateSlug("Ayodhya Full Monika"),
        description: "Darshan & Sightseeing tour",
        price: "₹2999",
      },
      {
        destination: "Ayodhya",
        slug: generateSlug("Ayodhya Quick Monika"),
        description: "Darshan & Sightseeing tour",
        price: "₹2999",
      },
    ],
  },
];



export default transportData;

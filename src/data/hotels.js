// src/data/hotels.js
import img1 from '../assets/images/verifiedHotels/hotel1.jpg';
import img2 from '../assets/images/verifiedHotels/hotel2.jpg';
import img3 from '../assets/images/verifiedHotels/hotel3.jpg';
import per1 from '../assets/images/icons/icon1.jpeg';
import per2 from '../assets/images/icons/icon2.jpeg';
import per3 from '../assets/images/icons/icon3.jpeg';
import per4 from '../assets/images/icons/icon4.jpeg';
const hotels = [
  {
    id: 'h1',
    name: 'The Grand Resort',
    title: 'Luxury Stay in Goa',
    image: img1,
    phone: '0832-1234567',
    address: 'Beach Road, Goa 403001',
    gstin: '29ABCDE1234F2Z5',
    city: 'Goa',
    timings: 'Open 24 Hrs',
    tags: ['Luxury Hotels', 'Beach View', 'Spa Resort'],
    averageRating: 4.8,
    totalRatings: 312,
    highlights: ['Sea view', 'Clean rooms', 'Spa service', 'Friendly staff'],
    lastReview: {
      name: 'Ananya Mehta',
      date: '15 Sep 2025',
      rating: 5,
      tags: ['Sea view', 'Quick check-in', 'Excellent food'],
      text: 'Absolutely loved the sea view and quick check-in. Great stay overall!',
    },
    tourPackages: [ 
      {
        destination: 'North Goa',
        description: '2 nights, breakfast included, city tour',
        price: '₹6,999',
      },
      {
        destination: 'South Goa',
        description: '3 nights, sea-facing room, airport pickup',
        price: '₹8,499',
      },
      {
        destination: 'Full Goa Tour',
        description: '5 days, all-inclusive, beach activities',
        price: '₹12,999',
      }
    ],
    happyCustomers: [
    {
      image: img1,
      name: 'Rajat Sharma',
      profile: per1,
      text: 'Had a wonderful experience with my family. Beautiful location and excellent food.',
      time: '10:15 AM',
      date: '20 Sep, 2025',
    },
    {
      image: img1,
      name: 'Priya Singh',
      profile: per2,
      text: 'The staff was super friendly and the beach view room was a dream!',
      time: '08:45 PM',
      date: '18 Sep, 2025',
    },
    {
      image: img1,
      name: 'Aman Verma',
      profile: per3,
      text: 'Spa service was top notch. Definitely coming back next year.',
      time: '01:30 PM',
      date: '10 Sep, 2025',
    },
    {
      image: img1,
      name: 'Neha Kapoor',
      profile: per4,
      text: 'Loved the quick check-in process and the cleanliness of the rooms.',
      time: '04:50 PM',
      date: '05 Sep, 2025',
    },
  ],
   videos: [
    {
      type: "youtube",
      src: "https://img.youtube.com/vi/h3zk-cwS8hU/hqdefault.jpg",
      link: "https://www.youtube.com/watch?v=h3zk-cwS8hU",
    },
    {
      type: "video",
      src: "/src/assets/videos/verifiedCustomers/video1.mp4",
      link: "https://www.youtube.com/watch?v=abc1",
    },
    {
      type: "video",
      src: "/src/assets/videos/verifiedCustomers/video2.mp4",
      link: "https://www.youtube.com/watch?v=abc2",
    },
  ]
  },
  {
    id: 'h2',
    name: 'Ocean View Inn',
    title: 'Comfort with sea breeze',
    image: img2,
    phone: '0832-7654321',
    address: 'Marine Drive, Goa 403002',
    gstin: '29XYZDE1234F2Z5',
    city: 'Goa',
    timings: 'Check-in: 12PM, Check-out: 11AM',
    tags: ['Budget Hotels', 'Sea View', 'Family Friendly'],
    averageRating: 4.8,
    totalRatings: 312,
    highlights: ['Sea view', 'Clean rooms', 'Spa service', 'Friendly staff'],
    lastReview: {
      name: 'Ananya Mehta',
      date: '15 Sep 2025',
      rating: 5,
      tags: ['Sea view', 'Quick check-in', 'Excellent food'],
      text: 'Absolutely loved the sea view and quick check-in. Great stay overall!',
    },
    tourPackages: [
      {
        destination: 'North Goa',
        description: '2 nights, breakfast included, city tour',
        price: '₹6,999',
      },
      {
        destination: 'South Goa',
        description: '3 nights, sea-facing room, airport pickup',
        price: '₹8,499',
      },
      {
        destination: 'Full Goa Tour',
        description: '5 days, all-inclusive, beach activities',
        price: '₹12,999',
      }
    ],
    happyCustomers: [
    {
      image: img1,
      name: 'Rajat Sharma',
      profile: per1,
      text: 'Had a wonderful experience with my family. Beautiful location and excellent food.',
      time: '10:15 AM',
      date: '20 Sep, 2025',
    },
    {
      image: img1,
      name: 'Priya Singh',
      profile: per2,
      text: 'The staff was super friendly and the beach view room was a dream!',
      time: '08:45 PM',
      date: '18 Sep, 2025',
    },
    {
      image: img1,
      name: 'Aman Verma',
      profile: per3,
      text: 'Spa service was top notch. Definitely coming back next year.',
      time: '01:30 PM',
      date: '10 Sep, 2025',
    },
    {
      image: img1,
      name: 'Neha Kapoor',
      profile: per4,
      text: 'Loved the quick check-in process and the cleanliness of the rooms.',
      time: '04:50 PM',
      date: '05 Sep, 2025',
    },
  ],
   videos: [
    {
      type: "youtube",
      src: "https://img.youtube.com/vi/h3zk-cwS8hU/hqdefault.jpg",
      link: "https://www.youtube.com/watch?v=h3zk-cwS8hU",
    },
    {
      type: "video",
      src: "/src/assets/videos/verifiedCustomers/video1.mp4",
      link: "https://www.youtube.com/watch?v=abc1",
    },
    {
      type: "video",
      src: "/src/assets/videos/verifiedCustomers/video2.mp4",
      link: "https://www.youtube.com/watch?v=abc2",
    },
  ],
  },
  {
    id: 'h3',
    name: 'Mountain Escape',
    title: 'Peaceful Hillside Retreat',
    image: img3,
    phone: '01892-123123',
    address: 'Hillside Road, Manali 175131',
    gstin: '02ABCDE1234F2Z5',
    city: 'Manali',
    timings: 'Open 24 Hrs',
    tags: ['Mountain View', 'Resorts', 'Nature Stay'],
    averageRating: 4.8,
    totalRatings: 312,
    highlights: ['Sea view', 'Clean rooms', 'Spa service', 'Friendly staff'],
    lastReview: {
      name: 'Ananya Mehta',
      date: '15 Sep 2025',
      rating: 5,
      tags: ['Sea view', 'Quick check-in', 'Excellent food'],
      text: 'Absolutely loved the sea view and quick check-in. Great stay overall!',
    },
    tourPackages: [ 
      {
        destination: 'North Goa',
        description: '2 nights, breakfast included, city tour',
        price: '₹6,999',
      },
      {
        destination: 'South Goa',
        description: '3 nights, sea-facing room, airport pickup',
        price: '₹8,499',
      },
      {
        destination: 'Full Goa Tour',
        description: '5 days, all-inclusive, beach activities',
        price: '₹12,999',
      }
    ],
    happyCustomers: [
    {
      image: img1,
      name: 'Rajat Sharma',
      profile: per1,
      text: 'Had a wonderful experience with my family. Beautiful location and excellent food.',
      time: '10:15 AM',
      date: '20 Sep, 2025',
    },
    {
      image:img1,
      name: 'Priya Singh',
      profile: per1,
      text: 'The staff was super friendly and the beach view room was a dream!',
      time: '08:45 PM',
      date: '18 Sep, 2025',
    },
    {
      image: '/images/reviews/h3.jpg',
      name: 'Aman Verma',
      profile: per1,
      text: 'Spa service was top notch. Definitely coming back next year.',
      time: '01:30 PM',
      date: '10 Sep, 2025',
    },
    {
      image: '/images/reviews/h4.jpg',
      name: 'Neha Kapoor',
      profile: per1,
      text: 'Loved the quick check-in process and the cleanliness of the rooms.',
      time: '04:50 PM',
      date: '05 Sep, 2025',
    },
  ]
  },
  {
    id: 'h4',
    name: 'City Central Hotel',
    title: 'Stay in the heart of the city',
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&auto=format&fit=crop",
    phone: '011-22334455',
    address: 'Connaught Place, Delhi 110001',
    gstin: '07ABCDE1234F2Z5',
    city: 'Delhi',
    timings: 'Open 24 Hrs',
    tags: ['Business Hotel', 'City Center', 'Fast WiFi'],
    averageRating: 4.8,
    totalRatings: 312,
    highlights: ['Sea view', 'Clean rooms', 'Spa service', 'Friendly staff'],
    lastReview: {
      name: 'Ananya Mehta',
      date: '15 Sep 2025',
      rating: 5,
      tags: ['Sea view', 'Quick check-in', 'Excellent food'],
      text: 'Absolutely loved the sea view and quick check-in. Great stay overall!',
    },
    tourPackages: [
      {
        destination: 'North Goa',
        description: '2 nights, breakfast included, city tour',
        price: '₹6,999',
      },
      {
        destination: 'South Goa',
        description: '3 nights, sea-facing room, airport pickup',
        price: '₹8,499',
      },
      {
        destination: 'Full Goa Tour',
        description: '5 days, all-inclusive, beach activities',
        price: '₹12,999',
      }
    ],
    happyCustomers: [
    {
      image: '/images/reviews/h1.jpg',
      name: 'Rajat Sharma',
      profile: '/images/profiles/user1.jpg',
      text: 'Had a wonderful experience with my family. Beautiful location and excellent food.',
      time: '10:15 AM',
      date: '20 Sep, 2025',
    },
    {
      image: '/images/reviews/h2.jpg',
      name: 'Priya Singh',
      profile: '/images/profiles/user2.jpg',
      text: 'The staff was super friendly and the beach view room was a dream!',
      time: '08:45 PM',
      date: '18 Sep, 2025',
    },
    {
      image: '/images/reviews/h3.jpg',
      name: 'Aman Verma',
      profile: '/images/profiles/user3.jpg',
      text: 'Spa service was top notch. Definitely coming back next year.',
      time: '01:30 PM',
      date: '10 Sep, 2025',
    },
    {
      image: '/images/reviews/h4.jpg',
      name: 'Neha Kapoor',
      profile: '/images/profiles/user4.jpg',
      text: 'Loved the quick check-in process and the cleanliness of the rooms.',
      time: '04:50 PM',
      date: '05 Sep, 2025',
    },
  ]
  },
  {
  id: 'h5',
  name: 'Lakeside Paradise',
  title: 'Tranquility by the Water',
  image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&auto=format&fit=crop',
  
},
{
  id: 'h6',
  name: 'Desert Dunes Resort',
  title: 'Luxury Amidst the Sands',
  image: 'https://images.unsplash.com/photo-1600488995319-37fc5c9b194a?w=400&auto=format&fit=crop',
},
{
  id: 'h7',
  name: 'Forest Hideaway',
  title: 'Reconnect with Nature',
  image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&auto=format&fit=crop',
},
{
  id: 'h8',
  name: 'Island Breeze Hotel',
  title: 'Tropical Bliss Awaits',
  image: 'https://images.unsplash.com/photo-1576671081837-c10f5f1b5b96?w=400&auto=format&fit=crop',
}
];

export default hotels;

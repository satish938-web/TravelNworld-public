import ashish  from '../assets/images/freeAgents/ashish.jpeg';
import beacon from '../assets/images/freeAgents/beacon.jpeg' ;
const generateSlug = (text) => {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')        
    .replace(/[^\w-]+/g, '') 
    .replace(/--+/g, '-')       
    .replace(/^-+/, '')         
    .replace(/-+$/, '');         
};

const freeAgentsData = [
  {
    id: 1,
    image: ashish, 
    name: "Ashish Raikwar",
    title: "Aashu Tour & travel's khandwa",
    slug: generateSlug("Aashu Tour & travel's khandwa"),
    location: "Ujjain, MP",
    fullAddress: "Ujjain, MP",
    rating: 4.9,
    reviews: 150,
    verified: true,
    website: "https://maps.app.goo.gl/fmPmsLKGizgnAnEd8",
    phone: "XXXXXXX27",
    whatsapp: "XXXXXXXX27",
    email: "aashishraikwar81@gmail.com",
    socialMediaLinks: {
      instagram: "https://www.instagram.com/tripandticket?igsh=em9icHRldjhhenF0",
      facebook: "https://facebook.com/tripandticket",
      twitter: "https://twitter.com/tripandticket"
    },
    tags: ["Hotels", "Hotels Rs 501 To Rs 1000"],
    tourPackages: [
      {
        destination: "Ayodhya",
        description: "Darshan & Sightseeing tour",
        price: "₹2999",
      },
      {
        destination: "Nearby Pilgrimage",
        description: "Half-day trip to nearby temples",
        price: "₹1499",
      },
      {
        destination: "Ayodhya",
        description: "Darshan & Sightseeing tour",
        price: "₹2999",
      },
      {
        destination: "Rajashthan",
        description: "Darshan & Sightseeing tour",
        price: "₹2999",
      }
    ]
  },
  {
    id: 2,
    image: beacon,  
    name: "Neeraj Kumar",
    title: "Beacon Abroad Immigration",
    slug: generateSlug("Beacon Abroad Immigration"),
    location: "Haryana, India",
    fullAddress: "Oppo Bus Stand,VPO Kaul,kaital,136021",
    rating: 4.8,
    reviews: 230,
    verified: false,
    website: "https://www.exploreindia.in",
    phone: "XXXXXXXXX22",//9813194022,8930089306
    whatsapp: "XXXXXXX06",
    email: "beacon.pundri@gmail.com",
    socialMediaLinks: {
      instagram: "https://www.instagram.com/exploreindia",
      facebook: "https://facebook.com/exploreindia",
      twitter: "https://twitter.com/exploreindia"
    },
    tags: ["Travel Agency", "Luxury Rs 2500 To Rs 5000"],
    tourPackages: [
      {
        destination: "Varanasi",
        description: "Ganga Aarti & Kashi Vishwanath Darshan",
        price: "₹2499",
      },
      {
        destination: "Mathura",
        description: "Visit Banke Bihari Temple",
        price: "₹1799",
      },
      {
        destination: "Goa",
        description: "Beach & Party Tour",
        price: "₹3999",
      },
      {
        destination: "Rajasthan",
        description: "Cultural & Heritage Tour",
        price: "₹4999",
      }
    ]
  }, 
];

export default freeAgentsData;

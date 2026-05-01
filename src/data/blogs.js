import img1 from "../assets/images/blogs/blogIce.jpg";
import img2 from "../assets/images/blogs/blogSahara.jpg";
import img3 from "../assets/images/blogs/blogcolorOfIndia.jpg";

const blogs = [
  {
    id: 1,
    title: "Discover the Beauty of Iceland",
    desc: "From breathtaking landscapes to unique travel experiences, discover why Iceland is a top destination for tour operators.",
    img: img1,
    imgStyle: "w-full h-[200px] object-cover rounded-lg", // smaller height
    content: [
      "Iceland offers unmatched natural beauty and adventure opportunities that attract travelers worldwide. For B2B travel partners, this destination presents strong potential for exclusive tour packages.",
      {
        type: "list",
        items: [
          "Diverse landscapes featuring volcanoes, glaciers, geysers, and hot springs.",
          "Popular attractions like the Golden Circle route, including Thingvellir National Park and Gullfoss Waterfall.",
          "Wide range of adventure activities such as glacier hiking, whale watching, and geothermal spa visits."
        ]
      },
      "Our company enables tour operators and travel agents to craft tailored itineraries, leveraging local expertise and unique experiences to boost client satisfaction.",
      {
        type: "list",
        items: [
          "Customizable group tours and private excursions.",
          "Access to trusted local guides and service providers.",
          "Flexible booking and seamless logistics management."
        ]
      },
      "Partner with TravelNWorld to unlock exclusive B2B travel opportunities in Iceland and offer your customers unforgettable journeys."
    ],
  },
  {
    id: 2,
    title: "A Journey Through the Sahara",
    desc: "Explore how the Sahara Desert's mystique can enrich your travel portfolio and attract adventure-seeking clients.",
    img: img2,
    imgStyle: "w-full h-[250px] object-cover rounded-lg", // fixed 250px
    content: [
      "The Sahara Desert, with its vast sand dunes and rich cultural heritage, remains a captivating destination for travelers seeking unique adventures and cultural immersion.",
      {
        type: "list",
        items: [
          "Camel trekking and desert camping provide authentic experiences.",
          "Interaction with Berber and Tuareg communities offers cultural insights.",
          "Spectacular desert sunsets and star-gazing opportunities."
        ]
      },
      "TravelNWorld partners with B2B clients to design comprehensive desert itineraries that emphasize safety, comfort, and unforgettable experiences.",
      {
        type: "list",
        items: [
          "Coordinated transport and accommodation in desert camps.",
          "Expert guides specialized in desert navigation and culture.",
          "Customizable tours fitting different group sizes and interests."
        ]
      },
      "Leverage our expertise to expand your offerings and attract clients eager for the Sahara's timeless charm."
    ],
  },
  {
    id: 3,
    title: "Colors of India",
    desc: "Discover the vibrant culture and diverse experiences of India, a top choice for travel businesses looking to expand their portfolio.",
    img: img3,
    imgStyle: "w-full h-[250px] object-cover rounded-lg", // same as img2
    content: [
      "India’s rich cultural tapestry, culinary delights, and historical landmarks provide endless possibilities for curated travel experiences tailored for every type of traveler.",
      {
        type: "list",
        items: [
          "Iconic destinations such as the Taj Mahal, Jaipur’s palaces, and Varanasi’s spiritual ghats.",
          "Diverse festivals like Holi and Diwali that showcase India’s lively traditions.",
          "A wide variety of cuisine that ranges from street food to royal feasts."
        ]
      },
      "Our B2B services facilitate partnerships with local operators to create immersive itineraries that highlight India’s colors and flavors.",
      {
        type: "list",
        items: [
          "Custom group tours and private travel arrangements.",
          "Authentic cultural experiences and guided city tours.",
          "Reliable logistics and support for seamless travel management."
        ]
      },
      "Collaborate with TravelNWorld to enhance your product offerings and provide clients with vibrant, memorable Indian travel experiences."
    ],
  },
];

export default blogs;
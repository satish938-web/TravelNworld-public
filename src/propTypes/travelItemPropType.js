import PropTypes from 'prop-types';

const tourPackagePropType = PropTypes.shape({
  destination: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired, // like "₹2999"
});

const travelItemPropType = PropTypes.shape({
  id: PropTypes.string.isRequired, // MongoDB ObjectId from API (string)
  image: PropTypes.any.isRequired,
  name: PropTypes.string,
  title: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  fullAddress: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  reviews: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  reviewsCount: PropTypes.number,
  verified: PropTypes.bool.isRequired,
  website: PropTypes.string,
  phone: PropTypes.string.isRequired,
  whatsapp: PropTypes.string.isRequired,
  email: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  tourPackages: PropTypes.arrayOf(tourPackagePropType),
  images: PropTypes.arrayOf(PropTypes.string),
  videos: PropTypes.arrayOf(PropTypes.string),
  agentPhotos: PropTypes.arrayOf(PropTypes.string),
  agentVideos: PropTypes.arrayOf(PropTypes.string),
  overview: PropTypes.string,
  quickInfo: PropTypes.string,
  services: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  blog: PropTypes.string,
  happyCustomers: PropTypes.string,
  testimonials: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      rating: PropTypes.number,
      image: PropTypes.string,
    })
  ),
  distance: PropTypes.string, 
});

export default travelItemPropType;

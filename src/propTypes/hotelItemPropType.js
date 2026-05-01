import PropTypes from 'prop-types';

const hotelItemPropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string,
  image: PropTypes.any, // because it can be an import (img1)
  phone: PropTypes.string,
  address: PropTypes.string,
  fullAddress: PropTypes.string,
  gstin: PropTypes.string,
  city: PropTypes.string,
  timings: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  averageRating: PropTypes.number,
  totalRatings: PropTypes.number,

  highlights: PropTypes.arrayOf(PropTypes.string),

  lastReview: PropTypes.shape({
    name: PropTypes.string,
    date: PropTypes.string,
    rating: PropTypes.number,
    tags: PropTypes.arrayOf(PropTypes.string),
    text: PropTypes.string,
  }),

  tourPackages: PropTypes.arrayOf(
    PropTypes.shape({
      destination: PropTypes.string,
      description: PropTypes.string,
      price: PropTypes.string, // since it's in ₹
    })
  ),

  happyCustomers: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.any, // imported img
      name: PropTypes.string,
      profile: PropTypes.any, // imported profile pic
      text: PropTypes.string,
      time: PropTypes.string,
      date: PropTypes.string,
    })
  ),

  videos: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
      src: PropTypes.string,
      link: PropTypes.string,
    })
  ),
});

export default hotelItemPropType;

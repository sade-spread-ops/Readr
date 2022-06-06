import React from 'react';
import Review from './Review.jsx';

const ReviewList = (props) => {
  const { reviews } = props;
  
  return (
    <div>
      {reviews.map((review) => <Review review={review} />)}
    </div>
  );
};

export default ReviewList;
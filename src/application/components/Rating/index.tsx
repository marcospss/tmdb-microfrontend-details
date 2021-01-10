import React from 'react';

import Star from './styles';

type RatingProps = {
  voteAverage: number;
};

const Rating = ({ voteAverage }: RatingProps): JSX.Element => {
  const totalPercentage = voteAverage * 10;
  return <Star totalPercentage={totalPercentage} title={`Rated ${totalPercentage} out of 100`} />;
};

export default Rating;

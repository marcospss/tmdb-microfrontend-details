import { useQuery } from 'react-query';

import { Movies } from '~/infrastructure/services';
import { MoviesDetails } from '~/infrastructure/models';

const movies = new Movies();

const useFetchDetails = (mediaId: string) => {
  const getFetchDetails = async () => {
    const result = await movies.details({ mediaId });
    return result?.data;
  };

  const { isLoading, isError, error, data, isFetching } = useQuery<MoviesDetails>(['details', { mediaId }], getFetchDetails, {
    keepPreviousData: true,
  });

  return { isLoading, isError, error, data, isFetching };

}

export default useFetchDetails;

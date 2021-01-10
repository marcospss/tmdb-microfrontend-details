/* eslint-disable camelcase */
import React, { lazy, Suspense } from 'react';
import { useParams, Link } from 'react-router-dom';

import imageApi from '~/infrastructure/settings/imageApi';

import {
  Main,
  Wrapper,
  Article,
  Backdrop,
  WrapperButtonFavorite,
  Header,
  GoBackHome,
  Poster,
  Title,
  Info,
  Category,
  Runtime,
  Overview,
} from './styles';

import Rating from '~/application/components/Rating';
import LoaderAnimation from '~/application/components/LoaderAnimation';
import ImagePlaceholder from '~/application/components/ImagePlaceholder';
import useFetchDetails from '~/infrastructure/queries';

import utils from '~/infrastructure/utils';

type ParamTypes = {
  mediaId: string;
};

const Recommendations = lazy(() => import('collections/Recommendations'));
const ButtonFavorite = lazy(() => import('favorites/ButtonFavorite'));

const Details = (): JSX.Element => {
  const { mediaId } = useParams<ParamTypes>();
  const { isLoading, isError, error, data, isFetching } = useFetchDetails(mediaId);
  const { secure_base_url, backdrop_sizes, poster_sizes } = imageApi;

  return (
    <Main>
      {isError && <div>Error:{error?.message}</div>}
      {isLoading || isFetching ? (
        <LoaderAnimation />
      ) : (
        <Suspense fallback={<LoaderAnimation />}>
          <Wrapper>
            <Article>
              <GoBackHome>
                <Link to='/' title='Back go Home'>
                  Back Home
                </Link>
              </GoBackHome>
              <Backdrop>
                <>
                  {data?.backdrop_path ? (
                    <img src={`${secure_base_url}${backdrop_sizes.w780}${data?.backdrop_path}`} alt={data?.title} />
                  ) : (
                    <ImagePlaceholder />
                  )}
                </>
              </Backdrop>
              <Header>
                <Poster>
                  <img src={`${secure_base_url}${poster_sizes.w154}${data?.poster_path}`} alt={data?.title} />
                </Poster>
                <Info>
                  <Title>{data?.title}</Title>
                  <Category>{utils.genres(data?.genres || [])}</Category>
                  <Rating voteAverage={data?.vote_average || 0} />
                  <WrapperButtonFavorite>
                    <ButtonFavorite media={data} />
                  </WrapperButtonFavorite>
                  <Runtime>{utils.convertMinutesToTime(data?.runtime || 0)}</Runtime>
                </Info>
              </Header>
              <Overview>{data?.overview}</Overview>

              <Recommendations mediaId={data?.id} mediaType='details' />
            </Article>
          </Wrapper>
        </Suspense>
      )}
    </Main>
  );
};

export default Details;

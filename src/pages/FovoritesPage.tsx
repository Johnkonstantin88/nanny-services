import { FC, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useUserState } from '../state/user';
import {
  favoritesIdOptions,
  favoritesOptions,
} from '../queryClient/queryOptions';
import FavoritesList from '../components/FavoritesList';
import { QUERY_KEY } from '../constants';
import { IDocument } from '../types/data.types';
import Loader from '../components/Loader';
// import NanniesFilters from '../components/NanniesFilters';

export interface FavoritesPageProps {}

const FavoritesPage: FC<FavoritesPageProps> = () => {
  const queryClient = useQueryClient();
  const { data: userData } = useUserState();
  const userId = userData?.user.uid;
  const { data: favoritesId, isFetching } = useQuery(
    favoritesIdOptions(userId)
  );
  const { data: favoritesData } = useQuery(favoritesOptions(favoritesId));

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEY.favorites],
    });
  }, [queryClient, favoritesId]);

  return (
    <>
      <title>Favorites</title>
      <section className="section-container ">
        {/* <NanniesFilters /> */}
        {isFetching && <Loader />}
        {favoritesData && favoritesData?.length > 0 ? (
          <FavoritesList favoritesData={favoritesData as IDocument[]} />
        ) : (
          <h2 className="text-center text-2xl text-grey-text-main font-medium leading-3 font-roboto">
            There is no favorites yet.
          </h2>
        )}
      </section>
    </>
  );
};

export default FavoritesPage;

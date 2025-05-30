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
import CustomSelect from '../components/CustomSelect';

export interface FavoritesPageProps {}

const FavoritesPage: FC<FavoritesPageProps> = () => {
  const queryClient = useQueryClient();
  const { data: userData } = useUserState();
  const userId = userData?.user.uid;
  const { data: favoritesId } = useQuery(favoritesIdOptions(userId));
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
        <CustomSelect />
        <FavoritesList favoritesData={favoritesData as IDocument[]} />
      </section>
    </>
  );
};

export default FavoritesPage;

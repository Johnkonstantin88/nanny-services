import { FC, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Button from '../components/Button';
import { getFavoritesDocs } from '../firebase/services/docs';
import { QUERY_KEY } from '../constants';
import { IDocument } from '../types/data.types';
import FavoritesList from '../components/FavoritesList';
import { useUserState } from '../state/user';
import { favoritesIdOptions } from '../queryClient/queryOptions';

export interface FavoritesPageProps {}

const FavoritesPage: FC<FavoritesPageProps> = () => {
  const queryClient = useQueryClient();
  const { data: userData } = useUserState();
  const userId = userData?.user.uid;
  const { data: favoritesId } = useQuery(favoritesIdOptions(userId));
  const { data: favoritesData } = useQuery({
    queryKey: [QUERY_KEY.favorites],
    queryFn: async () => {
      if (favoritesId) {
        const result = (await getFavoritesDocs(favoritesId)) as IDocument[];
        return result;
      }
    },
  });

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEY.favorites],
    });
  }, [queryClient, favoritesId]);

  return (
    <>
      <title>Favorites</title>
      <section className="section-container ">
        <FavoritesList favoritesData={favoritesData} />
        {/* {totalDocs && totalDocs > nanniesData.length && ( */}
        <Button
          type="button"
          className="block max-w-[159px] px-10 py-3.5 text-[16px] text-white-main font-normal -tracking-1 leading-6
bg-green-main rounded-[30px] mx-auto mt-16"
          // onClick={() => getNext()}
        >
          Load more
        </Button>
        {/* )} */}
      </section>
    </>
  );
};

export default FavoritesPage;

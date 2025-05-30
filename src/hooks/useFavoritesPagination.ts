import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useUserState } from '../state/user';
import { favoritesIdOptions } from '../queryClient/queryOptions';

export const useFavoritesPagination = () => {
  const queryClient = useQueryClient();
  const { data: userData } = useUserState();
  const userId = userData?.user.uid;
  const { data: favoritesId } = useQuery(favoritesIdOptions(userId));

  const initialState = {
    start: 0,
    end: 3,
  };

  const getFavoritePage = () => {
    queryClient.setQueryData(['last'], initialState);

    const data: { start: number; end: number } | undefined =
      queryClient.getQueryData(['last']);

    return data;
  };

  const updater = (limit: number) => {
    queryClient.setQueryData(
      ['last'],
      (prev: { start: number; end: number }) => ({
        ...prev,
        start: prev.start + limit,
        end: prev.end + limit,
      })
    );
  };

  const { data: page } = useQuery({
    queryKey: ['last'],
    queryFn: () => getFavoritePage(),
  });

  const lastPage = favoritesId?.slice(page?.start, page?.end);

  return [lastPage, updater, page] as const;
};

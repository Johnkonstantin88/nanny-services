import { queryOptions } from '@tanstack/react-query';
import { FIREBASE_COLLECTION, QUERY_KEY } from '../constants';
import { getDocument, getFavoritesDocs } from '../firebase/services/docs';
import { IUser } from '../types/auth.types';
import { IDocument } from '../types/data.types';

export const favoritesIdOptions = (userId: string | undefined) =>
  queryOptions({
    queryKey: [QUERY_KEY.favoritesId],
    queryFn: async () => {
      const user: IUser | undefined = await getDocument(
        FIREBASE_COLLECTION.users,
        userId as string
      );

      if (user) return user.favorites;
    },
    staleTime: 60 * 60 * 1000,
  });

export const favoritesOptions = (favoritesId: string[] | undefined) =>
  queryOptions({
    queryKey: [QUERY_KEY.favorites],
    queryFn: async () => {
      if (favoritesId) {
        const result = (await getFavoritesDocs(favoritesId)) as IDocument[];
        return result;
      }
    },
    enabled: !!favoritesId,
  });

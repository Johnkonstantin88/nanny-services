import { queryOptions } from '@tanstack/react-query';
import { FIREBASE_COLLECTION, QUERY_KEY } from '../constants';
import { getDocument } from '../firebase/services/docs';
import { IUser } from '../types/auth.types';

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
  });

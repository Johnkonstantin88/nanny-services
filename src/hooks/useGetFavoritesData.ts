// import { useQuery, useQueryClient } from '@tanstack/react-query';
// import { getDocument, getFavoritesDocs } from '../firebase/services/docs';
// import { useFavoritesState } from '../state/favorites';
// import { useFavoritesIdState } from '../state/favoritesId';
// import { useUserState } from '../state/user';
// import { FIREBASE_COLLECTION, QUERY_KEY } from '../constants';
// import { IUser } from '../types/auth.types';
// import { IDocument } from '../types/data.types';

// export const useGetFavoritesData = () => {
//   const { data, setData } = useFavoritesState();
//   const { data: userData } = useUserState();
//   const queryClient = useQueryClient();
//   const userId = userData?.user.uid;

//   const { data: favoritesId } = useQuery({
//     queryKey: [QUERY_KEY.favoritesId],
//     queryFn: async () => {
//       const user: IUser | undefined = await getDocument(
//         FIREBASE_COLLECTION.users,
//         userId as string
//       );

//       return user?.favorites;
//     },
//   });

//   const fetchPromises = async () => {
//     favoritesId?.forEach(async docId => {
//       const doc: IDocument | undefined = await getDocument(
//         FIREBASE_COLLECTION.nannies,
//         docId
//       );
//       //   queryClient.setQueryData(
//       //     [QUERY_KEY.favorites],
//       //     [...(data as IDocument[]), doc]
//       //   );
//     });
//   };

//   return fetchPromises;
// };

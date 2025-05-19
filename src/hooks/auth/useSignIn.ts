import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useUserState } from '../../state/user';
import { signIn } from '../../firebase/services/auth';
import { UserCredential } from 'firebase/auth';
import { ISignInDto, IUser } from '../../types/auth.types';
import toast from 'react-hot-toast';
import { auth } from '../../firebase/firestoreConfig';
import { FIREBASE_COLLECTION, QUERY_KEY } from '../../constants';
import { getDocument } from '../../firebase/services/docs';

export const useSignIn = () => {
  const { setData } = useUserState();
  const queryClient = useQueryClient();
  const { mutate: signInMutation } = useMutation<
    UserCredential,
    unknown,
    ISignInDto,
    unknown
  >({
    mutationFn: data => signIn(data),

    onSuccess: async () => {
      const userId = auth.currentUser?.uid;
      const userData: IUser | undefined = await getDocument(
        FIREBASE_COLLECTION.users,
        userId as string
      );

      if (userData) {
        setData({ user: { ...userData }, isLoggedIn: true });
        queryClient.fetchQuery({
          queryKey: [QUERY_KEY.favorites],
          queryFn: async () => {
            const user = await getDocument(
              FIREBASE_COLLECTION.users,
              userId as string
            );

            return user?.favorites;
          },
        });
        toast(`Welcome, ${userData?.displayName}!`);
      }
    },

    onError: error => {
      console.log(error);
    },
  });

  return signInMutation;
};

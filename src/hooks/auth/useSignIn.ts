import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { signIn } from '../../firebase/services/auth';
import { UserCredential } from 'firebase/auth';
import { auth } from '../../firebase/firestoreConfig';
import { getDocument } from '../../firebase/services/docs';
import { useUserState } from '../../state/user';
import { resetBodyPadding } from '../../utils/resetBodyPadding';
import { ISignInDto, IUser } from '../../types/auth.types';
import {
  FIREBASE_COLLECTION,
  initialModalState,
  QUERY_KEY,
} from '../../constants';

export const useSignIn = () => {
  const { setData } = useUserState();
  const queryClient = useQueryClient();
  const { mutate: signInMutation, isPending } = useMutation<
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
        queryClient.setQueryData([QUERY_KEY.favoritesId], userData.favorites);
        queryClient.setQueryData([QUERY_KEY.modalState], initialModalState);
        resetBodyPadding();
        toast(`Welcome, ${userData?.displayName}!`);
      }
    },

    onError: error => {
      if (error instanceof Error) toast.error(error.message);
    },
  });

  return [signInMutation, isPending] as const;
};

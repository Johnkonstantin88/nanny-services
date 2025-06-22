import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useUserState } from '../../state/user';
import { signUp } from '../../firebase/services/auth';
import { UserCredential } from 'firebase/auth';
import { ISignUpDto, IUser } from '../../types/auth.types';
import toast from 'react-hot-toast';
import { getDocument, setFirebaseUserDoc } from '../../firebase/services/docs';
import { auth } from '../../firebase/firestoreConfig';
import {
  FIREBASE_COLLECTION,
  initialModalState,
  QUERY_KEY,
} from '../../constants';

export const useSignUp = () => {
  const { setData } = useUserState();
  const queryClient = useQueryClient();

  const { mutate: signUpMutation, isPending } = useMutation<
    UserCredential,
    unknown,
    ISignUpDto,
    unknown
  >({
    mutationFn: data => signUp(data),

    onSuccess: async creds => {
      const { user: currentUser } = creds;
      const user = {
        displayName: currentUser.displayName,
        email: currentUser.email,
        uid: currentUser.uid,
      };

      await setFirebaseUserDoc(user);

      const userId = auth.currentUser?.uid;
      const userData: IUser | undefined = await getDocument(
        FIREBASE_COLLECTION.users,
        userId as string
      );
      if (userData) {
        setData({ user: { ...userData }, isLoggedIn: true });
        queryClient.setQueryData([QUERY_KEY.modalState], initialModalState);
        toast('User registration was successful!');
      }
    },

    onError: error => {
      if (error instanceof Error) toast.error(error.message);
    },
  });

  return [signUpMutation, isPending] as const;
};

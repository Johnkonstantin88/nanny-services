import { useMutation } from '@tanstack/react-query';
import { useUserState } from '../state/user';
import { signIn } from '../firebase/authService';
import { UserCredential } from 'firebase/auth';
import { ISignInDto } from '../types/auth.types';
import toast from 'react-hot-toast';

export const useSignIn = () => {
  const { setData } = useUserState();

  const { mutate: signInMutation } = useMutation<
    UserCredential,
    unknown,
    ISignInDto,
    unknown
  >({
    mutationFn: data => signIn(data),

    onSuccess: creds => {
      const { user } = creds;
      setData({ ...creds, isLoggedIn: true });
      toast(`Welcome, ${user.displayName}!`);
    },

    onError: error => {
      console.log(error);
    },
  });

  return signInMutation;
};

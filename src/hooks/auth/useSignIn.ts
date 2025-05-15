import { useMutation } from '@tanstack/react-query';
import { useUserState } from '../../state/user';
import { signIn } from '../../firebase/services/auth';
import { UserCredential } from 'firebase/auth';
import { ISignInDto } from '../../types/auth.types';
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
      const { user: currentUser } = creds;
      const user = {
        displayName: currentUser.displayName,
        email: currentUser.email,
        uid: currentUser.uid,
      };
      setData({ user: { ...user }, isLoggedIn: true });
      toast(`Welcome, ${user.displayName}!`);
    },

    onError: error => {
      console.log(error);
    },
  });

  return signInMutation;
};

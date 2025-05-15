import { useMutation } from '@tanstack/react-query';
import { useUserState } from '../../state/user';
import { signUp } from '../../firebase/services/auth';
import { UserCredential } from 'firebase/auth';
import { ISignUpDto } from '../../types/auth.types';
import toast from 'react-hot-toast';
import { setFirebaseUserDoc } from '../../firebase/services/docs';

export const useSignUp = () => {
  const { setData } = useUserState();

  const { mutate: signUpMutation } = useMutation<
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
      setData({ user: { ...user }, isLoggedIn: true });
      await setFirebaseUserDoc(user);
      toast('User registration was successful!');
    },

    onError: error => {
      console.log(error);
    },
  });

  return signUpMutation;
};

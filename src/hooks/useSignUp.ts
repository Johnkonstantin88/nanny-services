import { useMutation } from '@tanstack/react-query';
import { useUserState } from '../state/user';
import { signUp } from '../firebase/authService';
import { UserCredential } from 'firebase/auth';
import { ISignUpDto } from '../types/auth.types';
import toast from 'react-hot-toast';

export const useSignUp = () => {
  const { setData } = useUserState();

  const { mutate: signUpMutation } = useMutation<
    UserCredential,
    unknown,
    ISignUpDto,
    unknown
  >({
    mutationFn: data => signUp(data),

    onSuccess: creds => {
      setData({ ...creds, isLoggedIn: true });
      toast('User registration was successful!');
    },

    onError: error => {
      console.log(error);
    },
  });

  return signUpMutation;
};

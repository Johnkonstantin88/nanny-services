import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logOut } from '../../firebase/services/auth';

export const useSignOut = () => {
  const queryCLient = useQueryClient();

  const { mutate: signOutMutation } = useMutation({
    mutationFn: () => logOut(),

    onSuccess: () => {
      queryCLient.invalidateQueries({ queryKey: ['user'] });
    },

    onError: error => {
      console.log(error);
    },
  });

  return signOutMutation;
};

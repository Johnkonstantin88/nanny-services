import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logOut } from '../../firebase/services/auth';

export const useSignOut = () => {
  const queryCLient = useQueryClient();

  const { mutate: signOutMutation } = useMutation({
    mutationFn: () => logOut(),

    onSuccess: async () => {
      await queryCLient.invalidateQueries({ queryKey: ['user'] });
      // queryCLient.clear();
    },

    onError: error => {
      console.log(error);
    },
  });

  return signOutMutation;
};

import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { logOut } from '../../firebase/services/auth';
import { QUERY_KEY } from '../../constants';

export const useSignOut = () => {
  const queryClient = useQueryClient();

  const { mutate: signOutMutation } = useMutation({
    mutationFn: () => logOut(),

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEY.user] });
      queryClient.removeQueries({ queryKey: [QUERY_KEY.favoritesId] });
      toast('User logged out!');
    },

    onError: error => {
      if (error instanceof Error) toast.error(error.message);
    },
  });

  return signOutMutation;
};

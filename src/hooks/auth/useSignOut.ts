import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logOut } from '../../firebase/services/auth';
import { QUERY_KEY } from '../../constants';

export const useSignOut = () => {
  const queryClient = useQueryClient();

  const { mutate: signOutMutation } = useMutation({
    mutationFn: () => logOut(),

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEY.user] });
      queryClient.removeQueries({ queryKey: [QUERY_KEY.favoritesId] });
    },

    onError: error => {
      console.log(error);
    },
  });

  return signOutMutation;
};

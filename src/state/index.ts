import { useQuery, useQueryClient } from '@tanstack/react-query';

export const createGlobalState = <T>(
  queryKey: unknown,
  initialData: T | null = null
) => {
  return () => {
    const queryClient = useQueryClient();

    const { data } = useQuery({
      queryKey: [queryKey],
      queryFn: () => Promise.resolve(initialData),
      refetchInterval: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchIntervalInBackground: false,
    });

    const setData = (data: Partial<T>) => {
      queryClient.setQueryData([queryKey], data);
    };

    const resetData = () => {
      queryClient.invalidateQueries({
        queryKey: [queryKey],
      });
      // queryClient.refetchQueries({
      //   queryKey: [queryKey],
      // });
    };

    return { data, setData, resetData };
  };
};

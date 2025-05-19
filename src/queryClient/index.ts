import { DehydrateOptions, Query, QueryClient } from '@tanstack/react-query';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      // gcTime: 1000 * 60 * 60 * 24,
      // gcTime: 5000,
      // staleTime: 60 * 1000,
    },
  },
});

export const persister = createSyncStoragePersister({
  storage: window.localStorage,
});

const shouldDehydrateQuery = (query: Query): boolean => {
  if (query.queryKey.length === 0) return false;
  if (query.state.status !== 'success') return false;

  const keysToDehydrate: string[] = ['nannies'];

  const stringKey = String(query.queryKey[0]);
  return !keysToDehydrate.includes(stringKey);
};

export const dehydrateOptions: DehydrateOptions = {
  shouldDehydrateQuery,
};

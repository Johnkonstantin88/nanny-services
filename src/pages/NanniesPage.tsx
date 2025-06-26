import { FC } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import CardList from '../components/CardList';
import Button from '../components/Button';
import { useGetNanniesData } from '../hooks';
import { getCountCollectionDocs } from '../firebase/services/docs';
import { IDocument } from '../types/data.types';
import { FIREBASE_COLLECTION, QUERY_KEY, SELECT_VALUES } from '../constants';
import NanniesFilters from '../components/NanniesFilters';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';

const NanniesPage: FC = () => {
  const queryClient = useQueryClient();
  const getNannies = useGetNanniesData();

  const { data: filters } = useQuery({
    queryKey: [QUERY_KEY.filters],
    queryFn: () => {
      const data: string =
        queryClient.getQueryData([QUERY_KEY.filters]) || SELECT_VALUES.showAll;
      return data;
    },
  });

  const {
    data: nanniesData,
    isFetching,
    isError,
    error: nanniesError,
  } = useQuery({
    queryKey: filters ? [QUERY_KEY.nannies, filters] : [QUERY_KEY.nannies],
    queryFn: () => getNannies(filters),
    staleTime: 24 * 60 * 60 * 1000,
  });

  const getNextNannies = async () => {
    const docs = await queryClient.fetchQuery({
      queryKey: [QUERY_KEY.nannies, filters],
      queryFn: () => getNannies(filters),
    });

    queryClient.setQueryData(
      [QUERY_KEY.nannies, filters],
      [...(nanniesData as IDocument[]), ...docs]
    );
  };

  const { data: totalDocs } = useQuery({
    queryKey: filters
      ? [QUERY_KEY.totalNanniesDocs, filters]
      : [QUERY_KEY.totalNanniesDocs],
    queryFn: () => getCountCollectionDocs(FIREBASE_COLLECTION.nannies, filters),
    staleTime: 60 * 60 * 1000,
  });

  const handleSelectChange = (selected: string) => {
    queryClient.setQueryData([QUERY_KEY.filters], selected);
    queryClient.invalidateQueries({ queryKey: [QUERY_KEY.filters] });
  };

  const handleLoadMoreClick = async () => {
    await getNextNannies();

    setTimeout(() => {
      window.scrollBy({
        top: window.innerHeight / 2,
        behavior: 'smooth',
      });
    }, 0);
  };

  if (isError) toast.error(nanniesError.message);

  return (
    <>
      <title>Nannies</title>
      <main className="pt-16 pb-25 font-helvetica-neue">
        <section className="section-container">
          <NanniesFilters
            onChange={selected => handleSelectChange(selected)}
            selectValue={filters}
          />
          {isFetching && <Loader />}
          {isError && !nanniesData ? (
            <h2 className="text-center text-2xl text-red-border font-medium leading-3 font-roboto">
              Something gone wrong. Please, try again later.
            </h2>
          ) : (
            <CardList nanniesData={nanniesData} />
          )}
          {totalDocs && nanniesData && totalDocs > nanniesData.length && (
            <Button
              type="button"
              className="block max-w-[159px] px-10 py-3.5 text-[16px] text-white-main font-normal -tracking-1 leading-6
    bg-green-main rounded-[30px] mx-auto mt-16"
              onClick={handleLoadMoreClick}
              disabled={isFetching ? true : false}
            >
              Load more
            </Button>
          )}
        </section>
      </main>
    </>
  );
};

export default NanniesPage;

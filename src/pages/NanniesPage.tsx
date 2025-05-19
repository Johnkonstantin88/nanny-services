import { FC } from 'react';
import {
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import CardList from '../components/CardList';
import Button from '../components/Button';
import { useGetNanniesData } from '../hooks';
import { getCountCollectionDocs } from '../firebase/services/docs';
import { IDocument } from '../types/data.types';
import { FIREBASE_COLLECTION, QUERY_KEY } from '../constants';

export interface NanniesPageProps {}

const NanniesPage: FC<NanniesPageProps> = () => {
  const queryClient = useQueryClient();
  const getNannies = useGetNanniesData();

  const { data: nanniesData } = useSuspenseQuery({
    queryKey: [QUERY_KEY.nannies],
    queryFn: getNannies,
    structuralSharing: false,
    staleTime: 60 * 60 * 1000,
  });

  console.log(nanniesData);

  const getNext = async () => {
    const docs = await queryClient.fetchQuery({
      queryKey: [QUERY_KEY.nannies],
      queryFn: getNannies,
    });
    console.log(nanniesData);

    queryClient.setQueryData(
      [QUERY_KEY.nannies],
      [...(nanniesData as IDocument[]), ...docs]
    );
  };

  const { data: totalDocs } = useQuery({
    queryKey: [QUERY_KEY.totalDocs],
    queryFn: () => getCountCollectionDocs(FIREBASE_COLLECTION.nannies),
    staleTime: 60 * 60 * 1000,
  });

  return (
    <>
      <title>Nannies</title>
      <section className="section-container ">
        <CardList nanniesData={nanniesData} />
        {totalDocs && totalDocs > nanniesData.length && (
          <Button
            type="button"
            className="block max-w-[159px] px-10 py-3.5 text-[16px] text-white-main font-normal -tracking-1 leading-6
    bg-green-main rounded-[30px] mx-auto mt-16"
            onClick={() => getNext()}
          >
            Load more
          </Button>
        )}
      </section>
    </>
  );
};

export default NanniesPage;

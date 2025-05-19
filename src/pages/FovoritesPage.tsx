import { FC } from 'react';
import Button from '../components/Button';
import CardList from '../components/CardList';

export interface FavoritesPageProps {}

const FavoritesPage: FC<FavoritesPageProps> = () => {
  return (
    <>
      <title>Favorites</title>
      <section className="section-container ">
        <CardList />
        {/* {totalDocs && totalDocs > nanniesData.length && ( */}
        <Button
          type="button"
          className="block max-w-[159px] px-10 py-3.5 text-[16px] text-white-main font-normal -tracking-1 leading-6
bg-green-main rounded-[30px] mx-auto mt-16"
          // onClick={() => getNext()}
        >
          Load more
        </Button>
        {/* )} */}
      </section>
    </>
  );
};

export default FavoritesPage;

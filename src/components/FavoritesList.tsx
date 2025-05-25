import { FC } from 'react';
import Card from './Card';
import { IDocument } from '../types/data.types';

export interface FavoritesListProps {
  favoritesData: IDocument[] | undefined;
}

const FavoritesList: FC<FavoritesListProps> = ({ favoritesData }) => {
  return (
    <ul className="flex flex-col gap-8">
      {favoritesData?.map(el => (
        <li key={el.id}>
          <Card {...el} />
        </li>
      ))}
    </ul>
  );
};

export default FavoritesList;

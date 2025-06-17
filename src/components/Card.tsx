import { FC } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useUserState } from '../state/user';
import { useThrottle } from '../hooks';
import Icon from './Icon';
import { CardReviews } from './CardReviews';
import toast from 'react-hot-toast';
import { toggleFavorite } from '../firebase/services/docs';
import calculateAge from '../utils/calculateAge';
import replaceCharacters from '../utils/replaceCharacters';
import { IDocument } from '../types/data.types';
import { favoritesIdOptions } from '../queryClient/queryOptions';
import { QUERY_KEY } from '../constants';

const Card: FC<IDocument> = ({ documentDetails, id: cardId }) => {
  const {
    about,
    avatar_url,
    birthday,
    characters,
    education,
    experience,
    kids_age,
    location,
    name,
    price_per_hour,
    rating,
    reviews,
  } = documentDetails;

  const queryClient = useQueryClient();
  const { data: userData } = useUserState();
  const userId = userData?.user.uid;
  const isLoggedIn = userData?.isLoggedIn;
  const { data: favoritesId } = useQuery(favoritesIdOptions(userId));
  const isFavorite = favoritesId?.includes(cardId) as boolean;

  const toggleFavoriteHandler = async () => {
    if (!isLoggedIn) {
      toast.error('Only registered users can select this option.', {
        duration: 2000,
        position: 'bottom-right',
      });
      return;
    }
    await toggleFavorite(isFavorite, userId as string, cardId);
    queryClient.setQueryData([QUERY_KEY.favoritesId], favoritesId);
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEY.favoritesId],
    });
  };

  const throttledFavorite = useThrottle(
    toggleFavoriteHandler,
    isLoggedIn ? 300 : 2000
  );

  return (
    <div className="flex gap-6 p-6 bg-white-main rounded-3xl">
      <div className="relative center-position w-30 h-30 p-3 border-2 border-red-border rounded-[30px]">
        <img
          src={avatar_url}
          alt="avatar"
          width={96}
          height={96}
          className="rounded-[15px]"
        />
        <Icon
          name={'icon-online'}
          width={14}
          height={14}
          className="absolute top-[9px] right-3.5"
        />
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <span className="text-[16px] text-grey-text-main font-medium leading-8 align-middle">
              Nanny
            </span>
            <div className="flex gap-12">
              <div className="flex text-[16px] font-medium leading-8 align-middle">
                <div className="center-position gap-2">
                  <Icon
                    name={'icon-map-pin-converted'}
                    width={16}
                    height={16}
                  />
                  <p className="relative center-position pr-4 mr-4 after:border-after">
                    {location}
                  </p>
                </div>
                <div className="center-position gap-2">
                  <Icon name={'icon-star'} width={16} height={16} />
                  <p className="relative center-position pr-4 mr-4 after:border-after">
                    Rating: {rating}
                  </p>
                </div>
                <p className="center-position gap-1">
                  Price / 1 hour:
                  <span className="text-green-light">{price_per_hour}$</span>
                </p>
              </div>
              <button type="button" onClick={throttledFavorite}>
                <Icon
                  name={
                    isFavorite
                      ? 'icon-heart-filled-converted'
                      : 'icon-heart-converted'
                  }
                  width={26}
                  height={26}
                />
              </button>
            </div>
          </div>
          <h2 className="text-2xl font-medium leading-1 align-middle">
            {name}
          </h2>
        </div>
        <ul className="flex flex-wrap gap-2 text-[16px] text-grey-text-main font-medium leading-8 align-middle">
          <li className="flex gap-1 bg-white-bg rounded-3xl h-10 px-4 py-2">
            Age:
            <span className="text-black-main underline">
              {calculateAge(birthday)}
            </span>
          </li>
          <li className="flex gap-1 bg-white-bg rounded-3xl h-10 px-4 py-2">
            Experience: <span className="text-black-main">{experience}</span>
          </li>
          <li className="flex gap-1 bg-white-bg rounded-3xl h-10 px-4 py-2">
            Kids Age: <span className="text-black-main">{kids_age}</span>
          </li>
          <li className="flex gap-1 bg-white-bg rounded-3xl h-10 px-4 py-2">
            Characters:
            <ul className="flex gap-1 text-black-main">
              {replaceCharacters(characters)}
            </ul>
          </li>
          <li className="flex gap-1 bg-white-bg rounded-3xl h-10 px-4 py-2">
            Education: <span className="text-black-main">{education}</span>
          </li>
        </ul>
        <div>
          <p className="font-roboto text-[16px] font-normal text-grey-text leading-6 w-[992px] tracking-0 ">
            {about}
          </p>
          <CardReviews reviews={reviews} />
        </div>
      </div>
    </div>
  );
};

export default Card;

import { FC } from 'react';
import { IReview } from '../types/data.types';
import Icon from './Icon';

const CardReviewsItem: FC<IReview> = ({ comment, rating, reviewer }) => {
  return (
    <>
      <div className="flex gap-3">
        <span
          className="center-position w-11 h-11 bg-green-hover rounded-[50%] 
        text-[20px] font-medium leading-1 tracking-0"
        >
          {reviewer[0]}
        </span>
        <div className="flex flex-col gap-1 align-middle">
          <span className="text-[16px] font-medium leading-6 tracking-0 align-middle">
            {reviewer}
          </span>
          <span className="flex gap-2 text-sm font-medium leading-[1.29] tracking-0 align-middle">
            <Icon name={'icon-star'} width={16} height={16} />
            {rating.toFixed(1)}
          </span>
        </div>
      </div>
      <p className="text-[16px] text-grey-text font-roboto font-normal leading-6 tracking-0">
        {comment}
      </p>
    </>
  );
};

export default CardReviewsItem;

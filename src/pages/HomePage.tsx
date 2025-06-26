import { FC, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Icon from '../components/Icon';
import HomePageHeader from '../components/HomePageHeader';

export interface HomePageProps {}

const HomePage: FC<HomePageProps> = () => {
  const [isHover, setIshover] = useState(false);

  const handleMouseEnter = () => {
    setIshover(true);
  };

  const handleMouseLeave = () => {
    setIshover(false);
  };

  return (
    <div className="home-page-container">
      <title>Home</title>
      <HomePageHeader />
      <main className="font-roboto">
        <section className="home-section-container">
          <div className="absolute left-24 bottom-[163px] w-[517px] h-[322px] text-white-main">
            <h1 className="  text-[70px] font-medium leading-1 -tracking-3 mb-7">
              Make Life Easier for the Family:
            </h1>
            <p className="text-[28px] font-normal leading-2 -tracking-2 mb-16">
              Find Babysitters Online for All Occasions
            </p>
            <NavLink
              to={'/nannies'}
              className="flex max-w-[235px] h-15 gap-4.5 items-center
         px-12.5 py-4.5 text-xl font-normal leading-5 -tracking-1 
         border-button primary-transition  hover:border-(--color-white-main)"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              Get started
              <Icon
                name={isHover ? 'icon-arrow-normal' : 'icon-arrow-rotate'}
                width={18}
                height={18}
                className={'primary-transition'}
              />
            </NavLink>
          </div>
          <div className=" w-[699px] hero-bg-image"></div>
          <div className="absolute flex items-center gap-4 w-[284px] h-[118px] right-20.5 bottom-20.5 p-8 bg-white-main rounded-[20px]">
            <span className="p-3 bg-green-main rounded-[13px]">
              <Icon name={'icon-fe_check'} width={30} height={30} />
            </span>
            <div className="flex flex-col gap-1.5">
              <p className="text-base font-normal text-(--color-grey-text) leading-1">
                Experienced nannies
              </p>
              <span className="text-2xl font-bold leading-1">15,000</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
export default HomePage;

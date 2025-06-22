import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import AppointmentSelect from './AppointmentSelect';
import toast from 'react-hot-toast';
import {
  appointmentSelectOptions,
  initialModalState,
  QUERY_KEY,
} from '../constants';
import { appointmentSchema } from '../validation';
import { IAppointmentCreds } from '../types/query.types';

const AppointmentForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(appointmentSchema),
  });

  const queryClient = useQueryClient();
  const contentRef = useRef<HTMLDivElement>(null);
  const nannieCreds: IAppointmentCreds | undefined = queryClient.getQueryData([
    QUERY_KEY.appointmentCreds,
  ]);

  const onSubmit = (data: unknown) => {
    console.log(data);
    queryClient.setQueryData([QUERY_KEY.modalState], initialModalState);
    toast.success(
      `Great! ${
        nannieCreds?.name.split(' ')[0] || 'babysitter'
      } will contact you as soon as possible.`,
      {
        duration: 5000,
      }
    );
  };

  const handleScroll = () => {
    contentRef.current?.scrollIntoView({
      block: 'start',
      behavior: 'smooth',
    });
  };

  return (
    <div className="flex flex-col gap-10 h-[560px] overflow-y-auto">
      <div className="flex flex-col">
        <h2 className="text-[40px] font-medium -tracking-1 leading-5 mb-5">
          Make an appointment with a babysitter
        </h2>
        <p className="text-base text-(--color-grey-text) font-normal font-roboto leading-6 tracking-0 mb-10">
          Arranging a meeting with a caregiver for your child is the first step
          to creating a safe and comfortable environment. Fill out the form
          below so we can match you with the perfect care partner.
        </p>
        <div className="flex gap-3.5 w-48 h-11">
          <img
            src={nannieCreds?.avatar_url}
            alt="avatar"
            width={44}
            height={44}
            className="rounded-[15px]"
          />
          <div className="flex flex-col gap-1">
            <span className="text-xs text-grey-text-main font-medium leading-7 align-middle">
              Your nanny
            </span>
            <h3 className="text-[16px] font-medium leading-8 tracking-0 align-middle">
              {nannieCreds?.name}
            </h3>
          </div>
        </div>
      </div>
      <form
        className="flex flex-col gap-4 w-[472px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex">
          <div className="flex flex-col">
            <input
              className="w-58 mr-2 form-input"
              {...register('adress')}
              placeholder="Adress"
            />
            <p className="text-red-700 text-center">{errors.adress?.message}</p>
          </div>
          <div className="flex flex-col">
            <input
              className="w-58 form-input"
              {...register('phone')}
              placeholder="+380"
            />
            <p className="text-red-700 text-center">{errors.phone?.message}</p>
          </div>
        </div>
        <div className="flex">
          <div className="flex flex-col">
            <input
              className="w-58 mr-2 form-input"
              {...register('age')}
              placeholder="Child's age"
            />
            <p className="text-red-700 text-center">{errors.age?.message}</p>
          </div>
          <div
            className="flex flex-col"
            ref={contentRef}
            onClick={handleScroll}
          >
            <Controller
              name="time"
              control={control}
              render={({ field }) => (
                <AppointmentSelect
                  field={field}
                  options={appointmentSelectOptions}
                />
              )}
            />
            {<p className="text-red-700 text-center">{errors.time?.message}</p>}
          </div>
        </div>
        <div>
          <input
            className="w-full form-input"
            {...register('email')}
            placeholder="Email"
          />
          <p className="mb-4.5 text-red-700 text-center">
            {errors.email?.message}
          </p>
          <input
            className="w-full form-input"
            {...register('parentName')}
            placeholder="Father's or mother's name"
          />
          <p className="mb-4.5 text-red-700 text-center">
            {errors.parentName?.message}
          </p>
          <textarea
            className="w-full h-29 border border-grey-input px-4.5 py-4 rounded-xl 
          text-[16px] font-roboto leading-6 tracking-0 align-middle placeholder-black-main outline-none resize-none"
            {...register('comment')}
            placeholder="Comment"
            rows={4}
          />
          <p className="mb-10 text-red-700 text-center">
            {errors.comment?.message}
          </p>
          <button
            className="w-full text-base text-white-main font-medium py-4 
          bg-green-main leading-6 -tracking-1 rounded-[30px]"
            type="submit"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default AppointmentForm;

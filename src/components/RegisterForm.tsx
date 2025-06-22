import { FC, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Icon from './Icon';
import Loader from './Loader';
import { ISignUpDto } from '../types/auth.types';
import { useSignUp } from '../hooks';
import { registerSchema } from '../validation';

export interface RegisterFormProps {}

const RegisterForm: FC<RegisterFormProps> = () => {
  const [isHidePassword, setIsHidePassword] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
    resetOptions: { keepIsSubmitted: true },
  });

  const [signUp, isPending] = useSignUp();

  const onSubmit: SubmitHandler<ISignUpDto> = data => signUp(data);

  const togglePasswordHandler = () => {
    setIsHidePassword(!isHidePassword);
  };

  return (
    <>
      {isPending && <Loader />}
      <h2 className="text-[40px] font-medium -tracking-2 leading-5 mb-5">
        Registration
      </h2>
      <p className="text-base text-(--color-grey-text) font-normal leading-6 mb-10">
        Thank you for your interest in our platform! In order to register, we
        need some information. Please provide us with the following information.
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          className="w-full form-input"
          {...register('displayName')}
          placeholder="Name"
        />
        <p className="mb-4.5 text-red-700 text-center">
          {errors.displayName?.message}
        </p>

        <input
          className="w-full form-input"
          {...register('email')}
          placeholder="Email"
        />
        <p className="mb-4.5 text-red-700 text-center">
          {errors.email?.message}
        </p>

        <div className="relative">
          <input
            className=" w-full form-input"
            {...register('password')}
            placeholder="Password"
            type={isHidePassword ? 'password' : 'text'}
          />
          <span
            className="absolute top-4 right-4 cursor-pointer"
            onClick={togglePasswordHandler}
          >
            <Icon
              name={
                isHidePassword ? 'icon-eye-off-converted' : 'icon-eye-converted'
              }
              width={20}
              height={20}
              className={''}
            />
          </span>
        </div>
        <p className="mb-10 text-red-700 text-center">
          {errors.password?.message}
        </p>

        <button
          className="w-full text-base text-white-main font-medium py-4 
          bg-green-main leading-6 -tracking-1 rounded-[30px]"
          type="submit"
        >
          Sigh Up
        </button>
      </form>
    </>
  );
};

export default RegisterForm;

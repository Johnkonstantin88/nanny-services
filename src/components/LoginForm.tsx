import { FC, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Icon from './Icon';
import Loader from './Loader';
import { ISignInDto } from '../types/auth.types';
import { useSignIn } from '../hooks';
import { loginSchema } from '../validation';

export interface LoginFormProps {}

const LoginForm: FC<LoginFormProps> = () => {
  const [isHidePassword, setIsHidePassword] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const [signIn, isPending] = useSignIn();

  const onSubmit: SubmitHandler<ISignInDto> = data => signIn(data);

  const togglePasswordHandler = () => {
    setIsHidePassword(!isHidePassword);
  };

  return (
    <>
      {isPending && <Loader />}
      <h2 className="text-[40px] font-medium -tracking-2 leading-5 mb-5">
        Log In
      </h2>
      <p className="w-[438-px] text-base text-(--color-grey-text) font-normal font-roboto leading-6 tracking-0 mb-10">
        Welcome back! Please enter your credentials to access your account and
        continue your babysitter search.
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
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
          Log In
        </button>
      </form>
    </>
  );
};

export default LoginForm;

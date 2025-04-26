import { FC, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Icon from './Icon';
import { ISignInDto } from '../types/auth.types';
import { useSignIn } from '../hooks';

export interface LoginFormProps {
  onCloseLoginModal: () => void;
}

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required();

const LoginForm: FC<LoginFormProps> = () => {
  const [isHidePassword, setIsHidePassword] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const signIn = useSignIn();

  const onSubmit: SubmitHandler<ISignInDto> = data => signIn(data);

  const togglePasswordHandler = () => {
    setIsHidePassword(!isHidePassword);
  };

  return (
    <div>
      <h2 className="text-[40px] font-medium -tracking-2 leading-5 mb-5">
        Log In
      </h2>
      <p className="text-base text-(--color-grey-text) font-normal leading-6 mb-10">
        Welcome back! Please enter your credentials to access your account and
        continue your babysitter search.
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          className="w-full border border-grey-input px-4.5 py-4 rounded-xl placeholder-black-main outline-none"
          {...register('email')}
          placeholder="Email"
        />
        <p className="mb-4.5 text-red-700 text-center">
          {errors.email?.message}
        </p>

        <div className="relative">
          <input
            className=" w-full border border-grey-input px-4.5 py-4 rounded-xl placeholder-black-main outline-none"
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
    </div>
  );
};

export default LoginForm;

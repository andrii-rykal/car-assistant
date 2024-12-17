import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { clsx } from 'clsx';
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import styles from './LoginPage.module.scss';
import { Button } from '../../components/Button';
import { login } from '../../features/authSlice';
import { useState } from 'react';

interface FormData {
  email: string;
  password: string;
}

export const LoginPage = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector(state => state.auth);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: 'onChange',
  });

  const onSubmit = (data: FormData) => {
    dispatch(login(data));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.loginPage}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <input
          type="text"
          placeholder="Enter your email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)+[\w-]{2,66})$/i,
              message: 'Invalid email format',
            },
          })}
          className={clsx(styles.login, { [styles.error]: errors.email })}
        />
        <p>{errors.email ? errors.email.message : ''}</p>
        <div className={styles.inputBox}>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            {...register('password', {
              required: 'Password is required',
              // minLength: {
              //   value: 8,
              //   message: 'Password must be at least 8 characters',
              // },
            })}
            className={clsx(styles.password, {
              [styles.error]: errors.password,
            })}
          />
          <button
            type="button"
            className={styles.eye}
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <IoEyeOutline size={20} /> : <IoEyeOffOutline size={20} />}
          </button>
        </div>
        <p>{errors.password ? errors.password.message : ''}</p>

        <Button type="submit" text="Sign in" className={styles.submitBtn} />
        {auth.isLoading && <span>Loading...</span>}
        {auth.error && <p>{auth.error}</p>}
      </form>
    </div>
  );
};

import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { clsx } from 'clsx';
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';

import styles from './RegistrationPage.module.scss';
import { Button } from '../../components/Button';
import { RegistrationData } from '../../types';
import { registerUser } from '../../features/registerSlice';
import { useState } from 'react';

export const RegistrationPage = () => {
  const dispatch = useAppDispatch();
  const { isLoading, error, success } = useAppSelector(
    state => state.registration,
  );
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<RegistrationData>({
    mode: 'onSubmit',
  });

  const onSubmit = (data: RegistrationData) => {
    dispatch(registerUser(data));
    console.log(data);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowRepeatPassword(!showRepeatPassword);
  };

  return (
    <div className={styles.registrationPage}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <input
          type="text"
          placeholder="First Name"
          {...register('firstName', {
            required: 'Name is required',
            minLength: {
              value: 3,
              message: 'Name must be at least 3 characters',
            },
          })}
          className={clsx(styles.firstName, {
            [styles.error]: errors.firstName,
          })}
        />
        {errors.firstName && <p>{errors.firstName.message}</p>}
        <input
          type="text"
          placeholder="Last Name"
          {...register('lastName', {
            required: 'Name is required',
            minLength: {
              value: 3,
              message: 'Name must be at least 3 characters',
            },
          })}
          className={clsx(styles.lastName, { [styles.error]: errors.lastName })}
        />
        {errors.lastName && <p>{errors.lastName.message}</p>}
        <input
          type="text"
          placeholder="Email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)+[\w-]{2,66})$/i,
              message: 'Invalid email format',
            },
          })}
          autoComplete="username"
          className={clsx(styles.email, { [styles.error]: errors.email })}
        />
        {errors.email && <p>{errors.email.message}</p>}
        <div className={styles.inputBox}>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
            autoComplete="new-password"
            className={clsx(styles.password, {
              [styles.error]: errors.password,
            })}
          />
          <button
            type="button"
            className={styles.eye}
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <IoEyeOutline size={20} />
            ) : (
              <IoEyeOffOutline size={20} />
            )}
          </button>
        </div>
        {errors.password && <p>{errors.password.message}</p>}
        <div className={styles.inputBox}>
          <input
            type={showRepeatPassword ? 'text' : 'password'}
            placeholder="Repeat Password"
            {...register('repeatPassword', {
              required: 'Repeat Password is required',
              validate: value =>
                value === getValues('password') || 'Passwords do not match',
            })}
            autoComplete="new-password"
            className={clsx(styles.repeatPassword, {
              [styles.error]: errors.repeatPassword,
            })}
          />
          <button
            type="button"
            className={styles.eye}
            onClick={toggleConfirmPasswordVisibility}
          >
            {showRepeatPassword ? (
              <IoEyeOutline size={20} />
            ) : (
              <IoEyeOffOutline size={20} />
            )}
          </button>
        </div>
        {errors.repeatPassword && <p>{errors.repeatPassword.message}</p>}
        <Button type="submit" text="Sign up" className={styles.submitBtn} />
        {isLoading && <span>Loading...</span>}
        {error && <p>{error}</p>}
        {success && <p style={{ color: 'green' }}>Registration successful!</p>}
      </form>
    </div>
  );
};

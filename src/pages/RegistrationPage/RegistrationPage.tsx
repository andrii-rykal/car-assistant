import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { clsx } from 'clsx';
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './RegistrationPage.module.scss';
import { Button } from '../../components/Button';
import { RegistrationData } from '../../types';
import { registerUser } from '../../features/registerSlice';

export const RegistrationPage = () => {
  const dispatch = useAppDispatch();
  const { isLoading, error, success, user } = useAppSelector(
    state => state.registration,
  );
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm<RegistrationData>({
    mode: 'onChange',
  });

  const onSubmit = (data: RegistrationData) => {
    dispatch(registerUser(data));
    console.log(data);
  };

  useEffect(() => {
    if (success && user) {
      navigate('/login')
      reset();
    }
  }, [navigate, reset, success, user]);

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
        <p>{errors.firstName ? errors.firstName.message : ''}</p>
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
        <p>{errors.lastName ? errors.lastName.message : ''}</p>
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
        <p>{errors.email ? errors.email.message : ''}</p>

        <div className={styles.inputBox}>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            {...register('password', {
              required: 'Password is required',
              validate: {
                hasUpperCase: value =>
                  /[A-Z]/.test(value) ||
                  'Password must include at least one uppercase letter',
                hasLowerCase: value =>
                  /[a-z]/.test(value) ||
                  'Password must include at least one lowercase letter',
                hasNumber: value =>
                  /\d/.test(value) ||
                  'Password must include at least one number',
                hasSpecialChar: value =>
                  /[!@#$%^&*(),.?":{}|<>]/.test(value) ||
                  'Password must include at least one special character',
                minLength: value =>
                  value.length >= 8 ||
                  'Password must be at least 8 characters long',
                // maxLength: value =>
                //   value.length >= 35 || 'Password must be no more than 35 characters long',
              },
              // pattern: {
              //   value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]+$/,
              //   message: 'Password must contain special character'
              // },
              maxLength: {
                value: 35,
                message: 'Password must be no more than 35 characters long',
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
              <IoEyeOutline size={24} />
            ) : (
              <IoEyeOffOutline size={24} />
            )}
          </button>
        </div>
        <p>{errors.password ? errors.password.message : ''}</p>
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
              <IoEyeOutline size={24} />
            ) : (
              <IoEyeOffOutline size={24} />
            )}
          </button>
        </div>
        <p>{errors.repeatPassword ? errors.repeatPassword.message : ''}</p>
        <Button type="submit" text="Sign up" className={styles.submitBtn} />
        {isLoading && <span>Loading...</span>}
        {error && <p>{error}</p>}
        {success && <p style={{ color: 'green' }}>Registration successful!</p>}
      </form>
      {user?.email}
    </div>
  );
};

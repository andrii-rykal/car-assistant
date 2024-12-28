import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { clsx } from 'clsx';
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';
import styles from './LoginPage.module.scss';
import { Button } from '../../components/Button';
import { login } from '../../features/authSlice';
import { useEffect, useState } from 'react';
import { LoginData } from '../../types';
import { useNavigate } from 'react-router-dom';

// interface FormData {
//   email: string;
//   password: string;
// }

export const LoginPage = () => {
  const dispatch = useAppDispatch();
  const { token, isLoading, error } = useAppSelector(state => state.auth);
  const { user } = useAppSelector(state => state.registration);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginData>({
    mode: 'onChange',
  });

  const onSubmit = (data: LoginData) => {
    dispatch(login(data));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (token) {
      reset();
      navigate('/dashboard');
    }
  }, [navigate, reset, token]);

  return (
    <div className={styles.loginPage}>
      <p>{ user?.email }</p>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <input
          type="text"
          placeholder="Enter your email"
          autoComplete="user-name"
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
            autoComplete="current-password"
            {...register('password', {
              required: 'Password is required',
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
            {showPassword ? (
              <IoEyeOutline size={24} />
            ) : (
              <IoEyeOffOutline size={24} />
            )}
          </button>
        </div>
        <p>{errors.password ? errors.password.message : ''}</p>

        <Button type="submit" text="Sign in" className={styles.submitBtn} />
        {isLoading && <span>Loading...</span>}
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

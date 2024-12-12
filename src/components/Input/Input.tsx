import { FC } from 'react';
import styles from './Input.module.scss';
import { clsx } from 'clsx';

export interface InputProps {
  className?: string;
  type: string;
  name: string;
  placeholder: string;
}

export const Input: FC<InputProps> = ({
  className = '',
  type,
  name,
  placeholder,
}) => (
  <input
    className={clsx([styles.input, className])}
    type={type}
    name={name}
    placeholder={placeholder}
    required
  />
);

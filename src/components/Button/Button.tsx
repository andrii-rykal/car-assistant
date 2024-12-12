import { clsx } from 'clsx';
import styles from './Button.module.scss';
import { FC } from 'react';

export interface ButtonProps {
  type?: "button" | "submit" | "reset",
  text: string | JSX.Element,
  className?: string,
  onClick?: () => void,
}

export const Button: FC<ButtonProps> = ({type = 'button', text, className = '', onClick = () => {}}) => (
  <button 
    type={type}
    className={clsx([styles.button, className])}
    onClick={onClick}
  >
    {text}
  </button>
);

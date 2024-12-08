import React from 'react';
import styles from './MainSlider.module.scss';
import carKeys from '../../assets/images/mainSlider/car-keys.webp';

export interface MainSliderProps {}

export const MainSlider: React.FC<MainSliderProps> = () => (
  <div className={styles.mainSlider}>
    <img src={carKeys} alt="" />
  </div>
);

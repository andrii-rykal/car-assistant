import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import styles from './MainSlider.module.scss';
import { Image } from '../../components';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import './styles.css';

export const MainSlider = () => (
  <div className={styles.mainSlider}>
    <Swiper
      spaceBetween={0}
      slidesPerView={1}
      centeredSlides={true}
      effect={'fade'}
      // loop={true}
      speed={1000}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={false}
      modules={[Autoplay, Pagination, EffectFade]}
      className={styles.mySwiper}
    >
      <SwiperSlide>
        <Image.MainSlide1 />
      </SwiperSlide>
      <SwiperSlide>
        <Image.MainSlide2 />
      </SwiperSlide>
      <SwiperSlide>
        <Image.MainSlide3 />
      </SwiperSlide>
      <SwiperSlide>
        <Image.MainSlide4 />
      </SwiperSlide>
    </Swiper>
  </div>
);

import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from './MainSlider.module.scss';
import { Image } from '../../components';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './styles.css';

export const MainSlider = () => (
  <div className={styles.mainSlider}>
    <Swiper
      spaceBetween={30}
      slidesPerView={1}
      centeredSlides={true}
      loop={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
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

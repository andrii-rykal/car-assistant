import styles from './RegistrationPage.module.scss';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

export const RegistrationPage = () => (
  <div className={styles.registrationPage}>
    <form action="#" className={styles.form}>
      <Input
        type='text'
        name='name'
        placeholder='Enter your name'
        className={styles.name}
      />
      <Input
        type='email'
        name='email'
        placeholder='Enter your email'
        className={styles.email}
      />
      <Input
        type='password'
        name='password'
        placeholder='Enter your password'
        className={styles.password}
      />
      <Input
        type='password'
        name='password_2'
        placeholder='Repeat password'
        className={styles.password}
      />
      <Button
        type='submit'
        text='Sign up'
        className={styles.submitBtn}
      />
    </form>
  </div>
);

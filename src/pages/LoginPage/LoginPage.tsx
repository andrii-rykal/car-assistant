import styles from './LoginPage.module.scss';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

export const LoginPage = () => (
  <div className={styles.loginPage}>
    <form action="#" className={styles.form}>
      <Input
        type='text'
        name='login'
        placeholder='Enter your login'
        className={styles.login}
      />
      <Input
        type='password'
        name='password'
        placeholder='Enter your password'
        className={styles.password}
      />
      <Button
        type='submit'
        text='Sign in'
        className={styles.submitBtn}
      />
    </form>
  </div>
);

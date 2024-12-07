import { Link, NavLink } from 'react-router-dom';
import styles from './Header.module.scss';

export const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <Link to="/">
          <img src="" alt="Logo" />
        </Link>
        <nav>
          <ul className={styles.list}>
            <li>
              <NavLink to='/'>Домашня</NavLink>
            </li>
            <li>
              <NavLink to="/about">Про додаток</NavLink>
            </li>
            <li>
              <NavLink to="/contacts">Контакти</NavLink>
            </li>
            <li>
              <NavLink to="/help">Допомога</NavLink>
            </li>
          </ul>
        </nav>
        <div className={styles.buttons}>
          <button>Реєстрація</button>
          <button>Логін</button>
        </div>
      </div>
    </div>
  );
};

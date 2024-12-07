import { Link, NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import clsx from 'clsx';

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  clsx(styles.link, {
    [styles.active]: isActive,
  });

  console.log(getLinkClass({isActive: true}));
  

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
              <NavLink to="/" className={getLinkClass}>Домашня</NavLink>
            </li>
            <li>
              <NavLink to="/about" className={getLinkClass}>Про додаток</NavLink>
            </li>
            <li>
              <NavLink to="/contacts" className={getLinkClass}>Контакти</NavLink>
            </li>
            <li>
              <NavLink to="/help" className={getLinkClass}>Допомога</NavLink>
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

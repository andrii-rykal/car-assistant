import { Link, NavLink } from 'react-router-dom';
import {clsx} from 'clsx';
import styles from './Header.module.scss';
import { Image } from '../../components';
import { useEffect, useState } from 'react';

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  clsx(styles.link, {
    [styles.active]: isActive,
  });

export const Header = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const getCloseMenu = () => {
    setIsOpenMenu(true);
  };

  useEffect(() => {
    if (!isOpenMenu) {
      document.body.classList.add(styles.noScroll);
    } else {
      document.body.classList.remove(styles.noScroll);
    }

    return () => {
      document.body.classList.remove(styles.noScroll);
    };
  }, [isOpenMenu]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    if (windowWidth > 1023) {
      getCloseMenu();
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.addEventListener('resize', handleResize);
    };
  }, [windowWidth]);

  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <Link to="/" onClick={getCloseMenu}>
          <img src="" alt="Logo" />
        </Link>
        <button
          onClick={() => setIsOpenMenu(!isOpenMenu)}
          className={styles.openBtn}
        >
          {isOpenMenu ? <Image.MenuOpen /> : <Image.MenuClose />}
        </button>
        <nav
          className={clsx(styles.nav, {
            [styles.visibleMenu]: !isOpenMenu,
          })}
        >
          <ul className={styles.list}>
            <li>
              <NavLink to="/" className={getLinkClass} onClick={getCloseMenu}>
                Домашня
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={getLinkClass}
                onClick={getCloseMenu}
              >
                Про додаток
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contacts"
                className={getLinkClass}
                onClick={getCloseMenu}
              >
                Контакти
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/help"
                className={getLinkClass}
                onClick={getCloseMenu}
              >
                Допомога  
              </NavLink>
            </li>
          </ul>
          <div className={styles.buttons}>
            <button>Реєстрація</button>
            <button>Логін</button>
          </div>
        </nav>
      </div>
    </div>
  );
};

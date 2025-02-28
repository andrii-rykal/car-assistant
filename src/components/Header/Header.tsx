import { Link, NavLink, useNavigate } from 'react-router-dom';
import { clsx } from 'clsx';
import styles from './Header.module.scss';
import { Image } from '../../components';
import { useEffect, useState } from 'react';
import { Button } from '../Button';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { logout } from '../../features/authSlice';
import { resetState } from '../../features/registerSlice';

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  clsx(styles.link, {
    [styles.active]: isActive,
  });
const getLinkStyle = ({ isActive }: { isActive: boolean }) => ({
  color: isActive ? '#3a5c5c' : '',
});

export const Header = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { token } = useAppSelector(state => state.auth);
  const { user } = useAppSelector(state => state.registration);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const getCloseMenu = () => {
    setIsOpenMenu(false);
  };

  const getToddleMenu = () => {
    setIsOpenMenu(!isOpenMenu)
  }

  const handleRegister = () => {
    navigate('register');
    getCloseMenu();
  };

  const handleLogin = () => {
    navigate('login');
    getCloseMenu();
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(resetState());
    navigate('login');
    getCloseMenu();
  };

  useEffect(() => {
    if (isOpenMenu) {
      document.body.classList.add('noScroll');
    } else {
      document.body.classList.remove('noScroll');
    }

    return () => {
      document.body.classList.remove('noScroll');
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
      window.removeEventListener('resize', handleResize);
    };
  }, [windowWidth]);

  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <Link to="/" onClick={getCloseMenu}>
          <img src="" alt="Logo" />
        </Link>
        <Button
          text={!isOpenMenu ? <Image.MenuOpen /> : <Image.MenuClose />}
          className={styles.openBtn}
          onClick={getToddleMenu}
        />
        <nav
          className={clsx(styles.nav, {
            [styles.visibleMenu]: isOpenMenu,
          })}
        >
          <ul className={styles.list}>
            <li>
              <NavLink
                to="/"
                className={getLinkClass}
                style={getLinkStyle}
                onClick={getCloseMenu}
              >
                Домашня
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={getLinkClass}
                style={getLinkStyle}
                onClick={getCloseMenu}
              >
                Про додаток
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contacts"
                className={getLinkClass}
                style={getLinkStyle}
                onClick={getCloseMenu}
              >
                Контакти
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/help"
                className={getLinkClass}
                style={getLinkStyle}
                onClick={getCloseMenu}
              >
                Допомога
              </NavLink>
            </li>
            {token && (
              <li>
                <NavLink
                  to="/dashboard"
                  className={getLinkClass}
                  style={getLinkStyle}
                  onClick={getCloseMenu}
                >
                  Кабінет
                </NavLink>
              </li>
            )}
          </ul>
          {!token ? (
            <div className={styles.buttons}>
              <Button
                className={styles.loginBtn}
                text="Реєстрація"
                onClick={handleRegister}
              />
              <Button
                className={styles.loginBtn}
                text="Логін"
                onClick={handleLogin}
              />
            </div>
          ) : (
              <div className={styles.buttons}>
                <p className={styles.userName}>{ user?.firstName }</p>
              <Button text="Logout" onClick={handleLogout} />
            </div>
          )}
        </nav>
      </div>
    </div>
  );
};

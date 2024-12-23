import { NavLink, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import styles from './DashboardPage.module.scss';
import { clsx } from 'clsx';
import { CurrentCar } from '../../components/CurrentCar';

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  clsx(styles.link, {
    [styles.active]: isActive,
  });

const getLinkStyle = ({ isActive }: { isActive: boolean }) => ({
  color: isActive ? '#3a5c5c' : '',
});

export const DashboardPage = () => {
  const { user } = useAppSelector(state => state.registration);

  console.log(user);

  return (
    <div className={styles.dashboardPage}>
      DashboardPage Component
      <p>{user?.id}</p>
      <p>{user?.email}</p>
      <p>{user?.firstName}</p>
      <p>{user?.lastName}</p>
      <CurrentCar />

      <div className={styles.blockContent}>
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li>
              <NavLink
                to="journal"
                className={getLinkClass}
                style={getLinkStyle}
              >
                Мій журнал
              </NavLink>
            </li>
            <li>
              <NavLink to="gas" className={getLinkClass} style={getLinkStyle}>
                Заправки
              </NavLink>
            </li>
            <li>
              <NavLink
                to="reminder"
                className={getLinkClass}
                style={getLinkStyle}
              >
                Нагадування
              </NavLink>
            </li>
            <li>
              <NavLink
                to="statistics"
                className={getLinkClass}
                style={getLinkStyle}
              >
                Статистика
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className={styles.outlet}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

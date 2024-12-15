import styles from './DashboardPage.module.scss';
import React, { FC } from 'react';

export interface DashboardPageProps {
  '0'?: '',
}

export const DashboardPage: FC<DashboardPageProps> = () => (
  <div className={styles.dashboardPage}>
    DashboardPage Component
  </div>
);

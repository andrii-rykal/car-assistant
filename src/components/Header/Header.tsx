import styles from './Header.module.scss';

export const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.title}>This is a header</h1>
      </div>
    </div>
  )
}
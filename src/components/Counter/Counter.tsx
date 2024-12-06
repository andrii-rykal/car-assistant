import styles from './Counter.module.scss';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

import { addCount, history as historyAction } from '../../features/count'

export const Counter = () => {
  const dispatch = useAppDispatch();
  const {count, history} = useAppSelector(state => state.count);

  const increment = () => {
    dispatch(addCount(10))
    dispatch(historyAction())
  };

  return (
    <div className={styles.block}>
      <div className={styles.count}>{count}</div>
      <button onClick={increment} className={styles.button}>
        increment
      </button>
      <p>History: {history.join(', ')}</p>
    </div>
  );
};

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCaretDown,
  faCaretUp,
  faPenToSquare,
} from '@fortawesome/free-solid-svg-icons';
import styles from './JournalPage.module.scss';
import { useState } from 'react';
import { Button } from '../../components/Button';
import { useForm } from 'react-hook-form';

interface FormData {
  date: string;
  name: string;
  work: {name: string, price: number, description: string}[];
  parts: { name: string, price: number, description: string }[];
};

export const JournalPage = () => {
  const [isShowDetails, setIsShowDetails] = useState(false);
  const [isShowCreateForm, setIsShowCreateForm] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
  }

  return (
    <div className={styles.journalPage}>
      JournalPage Component
      <div className="box">
        <table className="table is-fullwidth is-striped is-hoverable is-narrow">
          <thead>
            <tr className="has-background-link-light">
              <th>#</th>
              <th>Виконані роботи</th>
              <th>Дата</th>
              <th>Вартість</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Технічне обслуговування</td>
              <td>25.09.24</td>
              <td>2500,00</td>
              <td>
                <div className={styles.rowButtons}>
                  <button className={styles.rowBtn}>
                    <FontAwesomeIcon icon={faPenToSquare} size="lg" />
                  </button>
                  <button className={styles.rowBtn} onClick={() => setIsShowDetails(!isShowDetails)}>
                    <FontAwesomeIcon icon={!isShowDetails ? faCaretDown : faCaretUp} size="lg" />
                  </button>
                </div>
              </td>
            </tr>
            {isShowDetails && (
              <tr>
                <td colSpan={10}>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Voluptatibus quas, impedit quia voluptatem fugiat laboriosam
                  eveniet eius odio iure qui.
                </td>
              </tr>
            )}
            <tr>
              <td>2</td>
              <td>Заміна шин</td>
              <td>15.10.24</td>
              <td>800,00</td>
              <td></td>
            </tr>
          </tbody>
        </table>
        <form onSubmit={handleSubmit(onSubmit)}>

        </form>
        <Button text='Create' onClick={() => setIsShowCreateForm(!isShowCreateForm)} />
      </div>
    </div>
  );
};

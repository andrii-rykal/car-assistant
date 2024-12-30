import { ChangeEvent, useEffect } from 'react';
import { CreateCar } from '../CreateCar';
import styles from './CurrentCar.module.scss';
import { Button } from '../Button';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { AddCarResponse } from '../../types';
import {
  fetchCars,
  setSelectedCar,
  showingForm,
} from '../../features/addCarSlice';

export const CurrentCar = () => {
  const dispatch = useAppDispatch();
  const { cars, currentUserCar, isAddingCar } = useAppSelector(
    state => state.addCar,
  );

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedId = +e.target.value;
    const selectedCar =
      cars.find((car: AddCarResponse) => car.id === selectedId) || null;
    dispatch(setSelectedCar(selectedCar));
  };

  return (
    <div className={styles.nameCar}>
      <select
        name="cars"
        className={styles.select}
        defaultValue={'0'}
        onChange={handleSelectChange}
      >
        <option value="0" disabled>
          Choose the car
        </option>
        {cars.map((car: AddCarResponse) => (
          <option value={car.id} key={car.id}>
            {`${car.brand} ${car.model} ${car.yearOfManufacture}`}
          </option>
        ))}
      </select>
      {currentUserCar && (
        <p>{`${currentUserCar.brand} ${currentUserCar.model} ${currentUserCar.yearOfManufacture}`}</p>
      )}
      <Button
        text={'Add car'}
        className={styles.addCarBtn}
        onClick={() => dispatch(showingForm(true))}
      />

      {isAddingCar && <CreateCar />}
    </div>
  );
};

import { CreateCar } from '../CreateCar';
import styles from './CurrentCar.module.scss';
import { Button } from '../Button';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchCars, setSelectedCar, showingForm } from '../../features/addCarSlice';
import { ChangeEvent, useEffect } from 'react';

export const CurrentCar = () => {
  const dispatch = useAppDispatch();
  const { isAddingCar, cars, currentUserCar } = useAppSelector(state => state.addCar);

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedId = +e.target.value;
    const selectedCar = cars.find(car => car.id === selectedId) || null
    dispatch(setSelectedCar(selectedCar))
  }

  return (
    <div className={styles.nameCar}>
      <select name="cars" className={styles.select} defaultValue={'0'} onChange={handleSelectChange}>
        <option value="0" disabled>
          Choose the car
        </option>
        {cars.map(car => (
          <option value={car.id} key={car.id}>
            {`${car.brand} ${car.model} ${car.yearOfManufacture}`}
          </option>
        ))}
      </select>
      {currentUserCar && <p>{`${currentUserCar.brand} ${currentUserCar.model} ${currentUserCar.yearOfManufacture}`}</p>}
      <Button
        text={'Add car'}
        className={styles.addCarBtn}
        onClick={() => dispatch(showingForm(true))}
      />

      {isAddingCar && <CreateCar />}
    </div>
  );
};

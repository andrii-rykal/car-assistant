import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { clsx } from 'clsx';
import styles from './CurrentCar.module.scss';
import { Button } from '../Button';
import { AddNewCar } from '../../types';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { creatingCar } from '../../features/addCarSlice';

export const CurrentCar = () => {
  const dispatch = useAppDispatch();
  const { isLoading, error, success, newCar } = useAppSelector(
    state => state.addCar,
  );
  const [isAddingCar, setIsAddingCar] = useState(false);
  const [isSelectedDate, setIsSelectedDate] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddNewCar>({
    mode: 'onChange',
  });

  const onSubmit = (data: AddNewCar) => {
    console.log(data);
    dispatch(creatingCar(data));
    console.log(newCar);
    reset();
    setIsAddingCar(false);
  };

  return (
    <div className={styles.nameCar}>
      <select name="cars" className={styles.select} defaultValue={'0'}>
        <option value="0" disabled>
          Choose the car
        </option>
        <option value="1">Car 1</option>
        <option value="2">Car 2</option>
      </select>
      <Button
        text={'Add car'}
        className={styles.addCarBtn}
        onClick={() => setIsAddingCar(true)}
      />

      {isAddingCar && (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Brand"
            {...register('brand', {
              required: 'Brand is required',
            })}
            className={clsx(styles.brand, {
              [styles.error]: errors.brand,
            })}
          />
          <p>{errors.brand ? errors.brand.message : ''}</p>
          <input
            type="text"
            placeholder="Model"
            {...register('model', {
              required: 'Model is required',
            })}
            className={clsx(styles.model, {
              [styles.error]: errors.model,
            })}
          />
          <p>{errors.model ? errors.model.message : ''}</p>
          <input
            type="number"
            placeholder="Year"
            {...register('yearOfManufacture', {
              required: 'Year is required',
              min: { value: 1900, message: 'Year must be at least 1900' },
              max: {
                value: new Date().getFullYear(),
                message: `Year cannot exceed ${new Date().getFullYear()}`,
              },
            })}
            className={clsx(styles.year, {
              [styles.error]: errors.yearOfManufacture,
            })}
          />
          <p>
            {errors.yearOfManufacture ? errors.yearOfManufacture.message : ''}
          </p>
          <input
            type="text"
            placeholder="VIN"
            {...register('vinCode', {
              required: 'VIN is required',
              validate: {
                isInvalidLetters: value =>
                  !/[ioq]/i.test(value) ||
                  'VIN must contains invalid letters (I, O, Q are not allowed)',
                onlyUppercaseAndNumbers: value =>
                  /^[A-HJ-NPR-Z0-9]+$/.test(value) ||
                  'VIN must contain only uppercase letters and numbers',
                isCorrectLength: value =>
                  value.length === 17 ||
                  'VIN must be exactly 17 characters long',
              },
            })}
            className={clsx(styles.vin, {
              [styles.error]: errors.vinCode,
            })}
          />
          <p>{errors.vinCode ? errors.vinCode.message : ''}</p>
          <input
            type={isSelectedDate ? 'date' : 'text'}
            placeholder="Purchase date"
            {...register('purchaseDate', {
              required: 'Date is required',
              validate: {
                isDate: value =>
                  !isNaN(new Date(value).getTime()) || 'Invalid date',
                notFuture: value => {
                  const today = new Date().toISOString().split('T')[0];
                  return value <= today || 'Date cannot be in the future';
                },
              },
            })}
            onChange={e => setIsSelectedDate(!!e.target.value)}
            className={clsx(styles.purchaseDate, {
              [styles.error]: errors.purchaseDate,
            })}
          />
          <p>{errors.purchaseDate ? errors.purchaseDate.message : ''}</p>
          <input
            type="number"
            placeholder="Mileage"
            {...register('mileage', {
              required: 'Mileage is required',
              validate: {
                isNegative: value => value >= 0 || 'Mileage must be positive',
              },
            })}
            className={clsx(styles.mileage, {
              [styles.error]: errors.mileage,
            })}
          />
          <p>{errors.mileage ? errors.mileage.message : ''}</p>
          <input
            type="text"
            placeholder="Color Code"
            {...register('colorCode', {
              required: 'Color code is required',
            })}
            className={clsx(styles.color, {
              [styles.error]: errors.colorCode,
            })}
          />
          <p>{errors.colorCode ? errors.colorCode.message : ''}</p>

          <fieldset className={styles.fieldset}>
            <legend>Select type of fuel:</legend>
            <label>
              <input
                type="checkbox"
                value={1}
                {...register('fuelTypes', {
                  required: 'You must select at least one option',
                })}
              />
              Petrol
            </label>
            <label>
              <input type="checkbox" value={2} {...register('fuelTypes')} />
              Diesel
            </label>
            <label>
              <input type="checkbox" value={3} {...register('fuelTypes')} />
              Gas_LPG
            </label>
            <label>
              <input type="checkbox" value={4} {...register('fuelTypes')} />
              Gas_CNG
            </label>
            <label>
              <input type="checkbox" value={5} {...register('fuelTypes')} />
              Hybrid
            </label>
            <label>
              <input type="checkbox" value={6} {...register('fuelTypes')} />
              Electro
            </label>
          </fieldset>
          <p>{errors.fuelTypes ? errors.fuelTypes.message : ''}</p>

          <Button type="submit" text="Add car" className={styles.btn} />
          <Button
            type="button"
            text="Cancel"
            className={styles.btn}
            onClick={() => setIsAddingCar(false)}
          />
          {isLoading && <span>Loading...</span>}
          {error && <p>{error}</p>}
          {success && (
            <p style={{ color: 'green' }}>Car created!</p>
          )}
        </form>
      )}
    </div>
  );
};

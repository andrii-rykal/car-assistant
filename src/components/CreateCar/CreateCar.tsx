import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { clsx } from 'clsx';
import { Button } from '../Button';
import { AddNewCar } from '../../types';
import { creatingCar, resetStateCar, showingForm } from '../../features/addCarSlice';
import styles from './CreateCar.module.scss';

const convertFormatDate = (date: Date) => {
  const isoString = date.toISOString();
  return isoString.split('T')[0].split('-').reverse().join('-');
};

const convertArrayToNumber = (arr: number[]): number[] => {
  return arr.map(item => +item);
};

export const CreateCar = () => {
  const dispatch = useAppDispatch();
  const { createCar } = useAppSelector(state => state.addCar)
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
    if (data.purchaseDate instanceof Date) {
      data.purchaseDate = convertFormatDate(data.purchaseDate);
    }

    data.fuelTypes = convertArrayToNumber(data.fuelTypes);

    dispatch(creatingCar(data));
    reset();

    setTimeout(() => {
      dispatch(resetStateCar());
      dispatch(showingForm(false))
    }, 2000);
  };

  return (
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
              valueAsNumber: true,
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
                  'VIN must not contains invalid letters (I, O, Q are not allowed)',
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
              valueAsDate: true,
              required: 'Date is required',
              validate: {
                isDate: value => {
                  const date =
                    typeof value === 'string' ? new Date(value) : value;
                  return (
                    (date instanceof Date && !isNaN(date.getTime())) ||
                    'Invalid date'
                  );
                },
                notFuture: value => {
                  const date =
                    typeof value === 'string' ? new Date(value) : value;
                  if (!(date instanceof Date)) return 'Invalid date';
                  const today = new Date();
                  // today.setHours(0, 0, 0, 0);
                  return date <= today || 'Date cannot be in the future';
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
              valueAsNumber: true,
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
              <input type="checkbox" value={1} {...register('fuelTypes')} />
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
            onClick={() => dispatch(showingForm(false))
            }
          />
          {createCar.isLoading && <span>Loading...</span>}
          {createCar.error && <p>{createCar.error}</p>}
          {createCar.success && <p style={{ color: 'green' }}>Car created!</p>}
        </form>
  )
}

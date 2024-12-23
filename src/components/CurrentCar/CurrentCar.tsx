import { useState } from 'react';
import styles from './CurrentCar.module.scss';
import { useForm } from 'react-hook-form';
import { clsx } from 'clsx';
import { Button } from '../Button';

interface AddNewCar {
  brand: string;
  model: string;
  year: string;
  vin: string;
  purchaseDate: string;
}

export const CurrentCar = () => {
  const [isAddingCar, setIsAddingCar] = useState(false);

  const {
    register,
    handleSubmit,
    // reset,
    formState: { errors },
  } = useForm<AddNewCar>({ mode: 'onChange' });

   const onSubmit = (data: AddNewCar) => {
      console.log(data);
    };

  return (
    <div className={styles.nameCar}>
      <select name="cars" className={styles.select} defaultValue={'0'}>
        <option value="0" disabled>Choose the car</option>
        <option value="1">Car 1</option>
        <option value="2">Car 2</option>
      </select>
      <Button text={'Add car'} className={styles.addCarBtn} onClick={() => setIsAddingCar(true)} />

      {isAddingCar && (
        <div className={styles.formBg}>
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
              {...register('year', {
                required: 'Year is required',
                min: { value: 1900, message: 'Year must be at least 1900' },
                max: { value: new Date().getFullYear(), message: `Year cannot exceed ${new Date().getFullYear()}` }
              })}
              className={clsx(styles.year, {
                [styles.error]: errors.year,
              })}
            />
            <p>{errors.year ? errors.year.message : ''}</p>
            <input
              type="text"
              placeholder="VIN"
              {...register('vin', {
                required: 'VIN is required',
                validate: {
                  isInvalidLetters: value => !/[ioq]/i.test(value) || 'VIN must contains invalid letters (I, O, Q are not allowed)',
                  onlyUppercaseAndNumbers: value => /^[A-HJ-NPR-Z0-9]+$/.test(value) || 'VIN must contain only uppercase letters and numbers',
                  isCorrectLength: value => value.length === 17 || 'VIN must be exactly 17 characters long',
                }
              })}
              className={clsx(styles.vin, {
                [styles.error]: errors.vin,
              })}
            />
            <p>{errors.vin ? errors.vin.message : ''}</p>
            <input
              type="date"
              placeholder="Purchase date"
              {...register('purchaseDate', {
                required: 'Date is required',
                
              })}
              className={clsx(styles.purchaseDate, {
                [styles.error]: errors.purchaseDate,
              })}
            />
            <p>{errors.purchaseDate ? errors.purchaseDate.message : ''}</p>
            <Button type="submit" text="Add car" className={styles.btn} />
            <Button type="button" text="Cancel" className={styles.btn} onClick={() => setIsAddingCar(false)} />
          </form>
        </div>
      )}
    </div>
  );
};

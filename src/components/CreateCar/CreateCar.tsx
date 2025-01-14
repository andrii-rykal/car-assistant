import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { clsx } from 'clsx';
import { Button } from '../Button';
import { AddNewCar } from '../../types';
import {
  creatingCar,
  fetchCars,
  finishEditingCar,
  resetStateCar,
  updatingCar,
} from '../../features/AddCarSlice';
import styles from './CreateCar.module.scss';
import { numberFromDate } from '../../functions/numberFromDate';
import { dateFromNumber } from '../../functions/dateFromNumber';

export const CreateCar = () => {
  const dispatch = useAppDispatch();
  const { createCar, fuelTypes, editingCar } = useAppSelector(
    state => state.addCar,
  );
  const [isSelectedDate, setIsSelectedDate] = useState(false);
  const [selectedFuelTypes, setSelectedFuelTypes] = useState<number[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<AddNewCar>({
    mode: 'onChange',
  });

  useEffect(() => {
    register('fuelTypes', {
      validate: value => {
        const selected = value || [];
        return selected.length <= 2 || 'You can select up to 2 fuel types'
      }
    })
  }, [register]); 

  useEffect(() => {
    if (editingCar) {
      reset({
        brand: editingCar.brand || '',
        model: editingCar.model || '',
        yearOfManufacture: editingCar.yearOfManufacture || 0,
        vinCode: editingCar.vinCode || '',
        purchaseDate: dateFromNumber(editingCar.purchaseDate),
        mileage: editingCar.mileage || 0,
        colorCode: editingCar.colorCode || '',
        fuelTypes: editingCar.fuelTypesIds || [],
      });
      setSelectedFuelTypes(editingCar.fuelTypesIds || []);
    } else {
      reset();
    }
  }, [editingCar, reset]);

  const handleFuelTypeChange = (fuelId: number, checked: boolean) => {
    const updatedFuelTypes = checked
      ? [...selectedFuelTypes, fuelId]
      : selectedFuelTypes.filter(id => id !== fuelId);
    
    setSelectedFuelTypes(updatedFuelTypes);
    setValue('fuelTypes', updatedFuelTypes, { shouldValidate: true });
  }

  const onSubmit = (data: AddNewCar) => {
    const carData = {
      ...data,
      purchaseDate: numberFromDate(data.purchaseDate),
      fuelTypes: data.fuelTypes.map(Number),
    };

    if (editingCar) {
      dispatch(updatingCar({ id: editingCar.id, carData })).then(() =>{
        dispatch(fetchCars())
        dispatch(finishEditingCar());
        dispatch(resetStateCar());
      });
    } else {
      dispatch(creatingCar(data))
        .then(() => {
          dispatch(fetchCars())
          // dispatch(finishEditingCar());
          dispatch(resetStateCar());
        })
    }

    reset();
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
      <p>{errors.brand?.message}</p>
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
      <p>{errors.model?.message}</p>
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
      <p>{errors.yearOfManufacture?.message}</p>
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
              value.length === 17 || 'VIN must be exactly 17 characters long',
          },
        })}
        className={clsx(styles.vin, {
          [styles.error]: errors.vinCode,
        })}
      />
      <p>{errors.vinCode?.message}</p>
      <input
        type={isSelectedDate ? 'date' : 'text'}
        placeholder="Purchase date"
        {...register('purchaseDate', {
          valueAsDate: true,
          required: 'Date is required',
          validate: {
            isDate: value => {
              const date = typeof value === 'string' ? new Date(value) : value;
              return (
                (date instanceof Date && !isNaN(date.getTime())) ||
                'Invalid date'
              );
            },
            notFuture: value => {
              const date = new Date(value);
              const today = new Date();
              return date <= today || 'Date cannot be in the future';
            },
          },
        })}
        onFocus={() => setIsSelectedDate(true)}
        onBlur={() => setIsSelectedDate(false)}
        className={clsx(styles.purchaseDate, {
          [styles.error]: errors.purchaseDate,
        })}
      />
      <p>{errors.purchaseDate?.message}</p>
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
      <p>{errors.mileage?.message}</p>
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
      <p>{errors.colorCode?.message}</p>

      <fieldset className={styles.fieldset}>
        <legend>Select type of fuel:</legend>
        {fuelTypes.map(fuel => (
          <label key={fuel.id}>
            <input
              type="checkbox"
              value={fuel.id}
              checked={selectedFuelTypes.includes(fuel.id)}
              onChange={e => handleFuelTypeChange(fuel.id, e.target.checked)}
            />
            {fuel.fuelType}
          </label>
        ))}
      </fieldset>
      <p>{errors.fuelTypes?.message}</p>

      <Button
        type="submit"
        text={editingCar ? 'Update car' : 'Add car'}
        className={styles.btn}
      />
      <Button
        type="button"
        text="Cancel"
        className={styles.btn}
        onClick={() => dispatch(finishEditingCar())}
      />
      {createCar.isLoading && <span>Loading...</span>}
      {createCar.error && <p>{createCar.error}</p>}
      {createCar.success && <p style={{ color: 'green' }}>Car created!</p>}
    </form>
  );
};

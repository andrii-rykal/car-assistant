import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '../../components/Button';
import styles from './CarsPage.module.scss';
import { useState } from 'react';
import {
  faCaretDown,
  faCaretUp,
  faPenToSquare,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setSelectedCar, showingForm } from '../../features/AddCarSlice';
import { CreateCar } from '../../components/CreateCar';
import { AddCarResponse } from '../../types';
import * as React from 'react';

export const CarsPage = () => {
  const dispatch = useAppDispatch();
  const [isShowDetails, setIsShowDetails] = useState(false);
  const { cars, currentUserCar, isAddingCar, fuelTypes } = useAppSelector(state => state.addCar);

  const nameOfFuelType = (arr: number[]): string => {
    const result: string[] = [];
    arr.forEach(el => {
      fuelTypes.forEach(type => {
        if (el === type.id) {
          result.push(type.fuelType)
        }
      })
    })

    return result.join('/');
  }

  const handleShowDetails = (car: AddCarResponse) => {
    // setIsShowDetails(!isShowDetails);
    dispatch(setSelectedCar(car));

    if (!isShowDetails && currentUserCar?.id === car.id) {
      setIsShowDetails(true);
    } else if (isShowDetails && currentUserCar?.id === car.id) {
      setIsShowDetails(false);
    } else if (!isShowDetails && currentUserCar?.id !== car.id) {
      setIsShowDetails(true);
    }
  };

  const toggleArrowDetails = (car: AddCarResponse )=> {
    return isShowDetails && currentUserCar?.id === car.id;
  };

  return (
    <div className={styles.carsPage}>
      CarsPage Component
      <div className="box">
        <table className="table is-fullwidth is-hoverable is-narrow">
          <thead>
            <tr className="has-background-link-light">
              <th>#</th>
              <th>Марка</th>
              <th>Модель</th>
              <th>Рік</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car, index) => (
              <React.Fragment key={car.id}>
                <tr>
                  <td>{index + 1}</td>
                  <td>{car.brand}</td>
                  <td>{car.model}</td>
                  <td>{car.yearOfManufacture}</td>
                  <td>
                    <div className={styles.rowButtons}>
                      <button className={styles.rowBtn}>
                        <FontAwesomeIcon icon={faPenToSquare} size="lg" />
                      </button>
                      <button className={styles.rowBtn}>
                        <FontAwesomeIcon icon={faTrash} size="lg" />
                      </button>
                      <button
                        className={styles.rowBtn}
                        onClick={() => handleShowDetails(car)}
                      >
                        <FontAwesomeIcon
                          icon={
                            toggleArrowDetails(car) ? faCaretDown : faCaretUp
                          }
                          size="lg"
                        />
                      </button>
                    </div>
                  </td>
                </tr>
                {toggleArrowDetails(car) && (
                  <tr>
                    <td colSpan={5}>
                      <table className="table is-fullwidth">
                        <tbody>
                          <tr>
                            <th colSpan={2}>VIN code</th>
                            <td colSpan={3}>{car.vinCode}</td>
                          </tr>
                          <tr>
                            <th colSpan={2}>Purchase date</th>
                            <td colSpan={3}>{car.purchaseDate.split('-').reverse().join('-')}</td>
                          </tr>
                          <tr>
                            <th colSpan={2}>Mileage</th>
                            <td colSpan={3}>{`${car.mileage} km`}</td>
                          </tr>
                          <tr>
                            <th colSpan={2}>Color code</th>
                            <td colSpan={3}>{car.colorCode}</td>
                          </tr>
                          <tr>
                            <th colSpan={2}>Fuel Types</th>
                            <td colSpan={3}>{nameOfFuelType(car.fuelTypesIds)}</td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}

            {/* <tr>
              <td>2</td>
              <td>Ford</td>
              <td>Focus</td>
              <td>2020</td>
              <td></td>
            </tr> */}
          </tbody>
        </table>

        <Button
          text={'Add car'}
          className={styles.addCarBtn}
          onClick={() => dispatch(showingForm(true))}
        />

        {isAddingCar && <CreateCar />}
      </div>
    </div>
  );
};

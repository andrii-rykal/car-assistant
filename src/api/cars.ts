import { AddCarResponse, AddNewCarFromServer } from "../types";
import { client } from "./httpClient"

export const getCars = (): Promise<{ data: AddCarResponse[] }> => {
  return client.get('/cars');
}

export const createCar = (carData: AddNewCarFromServer): Promise<{ data: AddCarResponse }> => {
  return client.post('/cars', carData);
}

export const deleteCar = (id: number): Promise<void> => {
  return client.delete(`/cars/${id}`)
}

export const updateCar = (id: number, carData: AddNewCarFromServer): Promise<{ data: AddCarResponse }> => {
  return client.put(`/cars/${id}`, carData);
}
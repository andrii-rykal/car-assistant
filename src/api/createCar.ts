import { AddNewCar } from "../types";
import { AddCarResponse } from "../types/AddCarResponse";
import { client } from "./httpClient";

export const createCar = (carData: AddNewCar): Promise<{ data: AddCarResponse }> => {
  return client.post('/cars', carData);
}
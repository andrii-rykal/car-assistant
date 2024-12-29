import { AddCarResponse } from "../types";
import { client } from "./httpClient"

export const getCars = (): Promise<{ data: AddCarResponse[] }> => {
  return client.get('/cars');
}
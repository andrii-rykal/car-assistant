import { FuelType } from "../types";
import { client } from "./httpClient"

export const getFuelTypes = (): Promise<{ data: FuelType[] }> => {
  return client.get('/fuel-types');
}
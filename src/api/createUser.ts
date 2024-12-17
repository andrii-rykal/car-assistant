import { RegistrationData } from "../types";
import { client } from "./httpClient"

export const createUser = (userData: RegistrationData) => {
  return client.post('/auth/registration', userData);
}
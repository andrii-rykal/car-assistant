import { RegistrationData, UserResponse } from "../types";
import { client } from "./httpClient"

export const createUser = (userData: RegistrationData): Promise<{ data: UserResponse }> => {
  return client.post('/auth/registration', userData);
}
import { LoginData } from '../types';
import { client } from './httpClient';

interface TokenResponse {
  token: string;
}

export const getToken = (credentials: LoginData): Promise<{ data: TokenResponse }> => {
  return client.post('/auth/login', credentials);
};

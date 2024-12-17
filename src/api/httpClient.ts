import axios from "axios";

export const client = axios.create({
  baseURL: "https://car-assistant-app-production.up.railway.app/api",
  headers: {
    'Content-Type': 'application/json',
  },
});
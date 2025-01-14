export interface AddNewCarFromServer {
  brand: string;
  model: string;
  yearOfManufacture: number;
  vinCode: string;
  purchaseDate: number;
  mileage: number;
  colorCode: string;
  fuelTypes: number[];
}
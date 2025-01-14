export interface AddNewCar {
  brand: string;
  model: string;
  yearOfManufacture: number;
  vinCode: string;
  purchaseDate: number | string;
  mileage: number;
  colorCode: string;
  fuelTypes: number[];
}
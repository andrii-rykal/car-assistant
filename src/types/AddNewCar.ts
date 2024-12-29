export interface AddNewCar {
  brand: string;
  model: string;
  yearOfManufacture: number;
  vinCode: string;
  purchaseDate: string | Date;
  mileage: number;
  colorCode: string;
  fuelTypes: number[];
}
export interface AddCarResponse {
  "id": number,
  "userId": number,
  "brand": string,
  "model": string,
  "yearOfManufacture": number,
  "vinCode": string,
  "purchaseDate": number,
  "mileage": number,
  "colorCode": string,
  "fuelTypesIds": number[]
}
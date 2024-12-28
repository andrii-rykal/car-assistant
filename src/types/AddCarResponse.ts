export interface AddCarResponse {
  "id": number,
  "userId": number,
  "brand": string,
  "model": string,
  "yearOfManufacture": number,
  "vinCode": string,
  "purchaseDate": string,
  "mileage": number,
  "colorCode": string,
  "fuelTypesIds": number[]
}
export interface IHotel {
  id: string
  name: string
  description: string
  location: string
  address: string
  rating: number
  photos: string[]
  pricePerNight: number
  createdAt: string
  updatedAt: string
  rooms: IRoom[]
}

export interface IRoom {
  id: string
  hotelId: string
  type: string
  price: number
  amenities: string[]
  photos: string[]
  isAvailable: boolean
  createdAt: string
  updatedAt: string
}
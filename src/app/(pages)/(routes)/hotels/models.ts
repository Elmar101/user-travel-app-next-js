// types/prisma.ts
import { TripStatus, Transmission, FuelType } from '@prisma/client';

/* ============== User ============== */
export interface IUser {
  id: string;
  email: string;
  username: string;
  photo: string;
  firstName?: string | null;
  lastName?: string | null;
  hashedPassword: string;

  // relations
  trips?: ITrip[];
  bookings?: IBooking[];
}

/* ============== Hotel ============== */
export interface IHotel {
  id: string;
  name: string;
  description?: string | null;
  location: string;
  address: string;
  rating: number;
  photos: string[];
  pricePerNight: number;
  createdAt: Date;
  updatedAt: Date;

  // relations
  rooms?: IRoom[];
  tripHotels?: ITripHotel[];
}

/* ============== Room ============== */
export interface IRoom {
  id: string;
  hotelId: string;
  hotel?: IHotel; // optional relation

  type: string;
  price: number;
  amenities: string[];
  photos: string[];
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;

  // relations
  bookings?: IBooking[];
}

/* ============== Trip ============== */
export interface ITrip {
  id: string;

  // user (optional)
  userId?: string | null;
  user?: IUser | null;

  // explicit M:N via TripHotel
  tripHotels?: ITripHotel[];

  // data
  name: string;
  photos: string[];
  location: string;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  notes?: string | null;

  totalPrice: number;
  currency: string;
  status: TripStatus;

  createdAt: Date;
  updatedAt: Date;

  // relations
  bookings?: IBooking[];
}

/* ============== TripHotel (join) ============== */
export interface ITripHotel {
  id: string;

  tripId: string;
  trip?: ITrip;

  hotelId: string;
  hotel?: IHotel;

  hotelName: string; // denormalized for quick reads
  createdAt: Date;
}

/* ============== Booking ============== */
export interface IBooking {
  id: string;

  userId: string;
  user?: IUser;

  tripId: string;
  trip?: ITrip;

  roomId: string;
  room?: IRoom;

  createdAt: Date;
  updatedAt: Date;
}

/* ============== Region ============== */
export interface IRegion {
  id: string;
  name: string;
  code?: string | null;
  createdAt: Date;

  // relations
  rentaCarLinks?: IRentaCarRegion[];
}

/* ============== RentaCar ============== */
export interface IRentaCar {
  id: string;

  name: string;
  brand: string;
  model: string;
  year?: number | null;
  seats: number;
  currency: string;
  transmission: Transmission;
  fuelType: FuelType;
  pricePerDay: number;
  photos: string[];
  rating: number;
  location?: string | null;
  available: boolean;

  createdAt: Date;
  updatedAt: Date;

  // relations
  regionLinks?: IRentaCarRegion[];
}

/* ============== RentaCarRegion (join) ============== */
export interface IRentaCarRegion {
  id: string;

  rentaCarId: string;
  rentaCar?: IRentaCar;

  regionId: string;
  region?: IRegion;

  createdAt: Date;
}

/* ============== Helper “lean” shapes (istəyə görə) ============== */
// Minimal Trip response (populate əvəzinə sadə xəritə)
export interface ITripSummary {
  id: string;
  name: string;
  location: string;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  totalPrice: number;
  currency: string;
  status: TripStatus;
  photos: string[];
  hotels?: Array<{ hotelId: string; hotelName: string }>; // TripHotel-dən map
}

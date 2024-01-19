export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  profilePic: string;
};

export type LoginFormData = {
  email: string;
  password: string;
};

export type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  myTrips?: Array<MyTripsType>;
  myProperties?: any[];
  myReservations?: any[];
  wishList?: any[];
  createdAt: string;
  updatedAt: string;
  __v?: number;
  profileImage: {
    url: string;
    public_id: string;
  };
};

export type UserState = {
  user: User;
  token: string | null;
};

export type CreateListingFormData = {
  categories: string[];
  accomodation: string;
  price: number;
  title: string;
  description: string;
  highlight: string;
  streetAddress: string;
  apartmentSuite: string;
  city: string;
  country: string;
  pinCode: string;
  facilities: string[];
  images: File[];
  guests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
};

export type Listing = {
  _id: string;
  categories: string[];
  accomodation: string;
  price: number;
  title: string;
  description: string;
  highlight: string;
  streetAddress: string;
  apartmentSuite: string;
  city: string;
  country: string;
  pinCode: string;
  facilities: string[];
  images: Array<{
    url: string;
    public_id: string;
  }>;
  guests: string;
  bedrooms: string;
  beds: string;
  bathrooms: string;
  createdAt?: Date;
  updatedAt?: Date;
  author: User;
};

export type MyTripsType = {
  tripId: string;
  listingId: string;
  startDate: string;
  endDate: string;
  price: number;
  name: string;
  images: Array<{ url: string; public_id: string }>;
  accomodation: string;
};

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

export type UserState = {
   user: {
      _id: string;
      firstName: string;
      lastName: string;
      email: string;
      password: string;
      myTrips?: any[];
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

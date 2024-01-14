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

declare namespace REDUX_STORE {
  interface Store {
    isMobile: boolean;
    openCartDrawer: boolean;
    profile?: Profile;
  }

  interface Profile {
    id: number;
    fistName: string;
    lastName: string;
    userName: string;
    createdAt?: String;
    updatedAt?: string;
    client: Client;
  }

  interface Client {
    id: string;
    userId: string;
    avatar?: string;
    dob?: string;
    gender: EnumGender;
  }

  enum EnumGender {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
    UNDEFINED = 'UNDEFINED',
  }
}

declare namespace REDUX_STORE {
  interface Profile {
    id: number;
    firstName: string;
    lastName: string;
    userName: string;
    email?: string;
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

  interface InitializeAuthPageArgs {
    req: any;
  }

  interface InitializeAuthPagePayload {
    isMobile: boolean;
    cookie?: string;
  }
}

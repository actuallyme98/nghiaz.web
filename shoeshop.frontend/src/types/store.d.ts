declare namespace REDUX_STORE {
  interface Profile {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    email?: string;
    createdAt?: string;
    updatedAt?: string;
    client: Client;
  }

  interface Client {
    id: number;
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

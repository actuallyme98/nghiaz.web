declare namespace SHOES_API {
  interface RegisterParams {
    username: string;
    firstName: string;
    lastName: string;
    password: string;
  }
  interface RegisterResponse {
    status: boolean;
    message: string;
  }
}

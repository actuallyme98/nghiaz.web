import Axios from 'axios';
import { APIRouteEnum } from '../enums/api';

class ApiServices {
  public signIn(params: SHOESWEB_API.SignInParams): Promise<SHOESWEB_API.SignInResponse> {
    return Axios.post(APIRouteEnum.SIGN_IN, params);
  }

  public signOut() {
    return Axios.post(APIRouteEnum.SIGN_OUT);
  }
}

export default new ApiServices();

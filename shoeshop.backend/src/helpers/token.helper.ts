import * as jwt from 'jsonwebtoken';

/**
 * Token helper
 */
export class TokenHelper {
  /**
   * Signs token helper
   * @param payload - your json object
   * @param secret - your private hash
   * @param expiresIn - seconds
   * @returns
   */
  public async generate(
    payload: Record<string, any>,
    secret: string,
    expiresIn: any,
  ): Promise<{
    token: string;
    expires: number;
  }> {
    const token = await jwt.sign(payload, secret, {
      expiresIn,
    });

    const decoded: any = jwt.decode(token);
    return {
      token: token,
      expires: decoded.exp,
    };
  }

  /**
   * Verifys token helper
   * @param token
   * @param secret
   */
  public async verify<T>(token: string, secret: string): Promise<T> {
    return new Promise((resolve, reject) => {
      try {
        const payload: any = jwt.verify(token, secret);
        // seconds to miliseconds
        payload.iat = payload.iat;
        payload.exp = payload.exp;
        resolve(payload);
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default new TokenHelper();

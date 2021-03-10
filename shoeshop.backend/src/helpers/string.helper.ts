export class StringHelper {
  public randomString(length: number = 8) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  public getEnvWithoutComment(str: string) {
    return str.replace(/\s*#.*/g, '');
  }

  public deepTrim(obj: any) {
    for (var prop in obj) {
      var value = obj[prop],
        type = typeof value;
      if (value != null && (type == 'string' || type == 'object') && obj.hasOwnProperty(prop)) {
        if (type == 'object') {
          this.deepTrim(obj[prop]);
        } else {
          obj[prop] = obj[prop].trim();
        }
      }
    }
    return obj;
  }
}

export default new StringHelper();

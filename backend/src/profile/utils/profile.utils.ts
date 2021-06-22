export class ProfileUtils {
  static trimPatronimyc(userName: string) {
    const [lastName, firstName] = userName.split(' ');

    return `${lastName} ${firstName}`;
  }
}

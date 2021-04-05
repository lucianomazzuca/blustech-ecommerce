export class AuthService {
  constructor({ userService }) {
    this.userService = userService;
  };

  async validateUser(email, password) {
    const user = await this.userService.getByEmail(email);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;s
    };
    return null;
  }
}
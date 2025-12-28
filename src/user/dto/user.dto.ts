export class UserDto {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
}

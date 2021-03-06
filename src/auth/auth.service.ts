import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../model/user';
import * as bcrypt from 'bcrypt';
import { throws } from 'node:assert';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}
  
  async validateUser(username: string, pass: string): Promise<any> {
    const user = this.usersService.findUser(username);
    if (!user) {
      // Can possibly implement custom exception handling for scenario where user isn't found
      return null;
    }
    const isMatch = await bcrypt.compare(pass, user.password);
    if (user && isMatch) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: User) {
    const payload = { username: user.username, sub: user.user_id, role: user.type };
    return {
      access_token: this.jwtService.sign(payload),
      expiresIn: 1000
    }
  }
}

import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../model/user';
import * as bcrypt from 'bcrypt';
import { throws } from 'node:assert';

@Injectable()
export class AuthService {
  user: User;
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}
  
  async validateUser(username: string, pass: string): Promise<any> {
    const user = this.usersService.findUser(username);

    const isMatch = await bcrypt.compare(pass, this.user.password);
    if (this.user && isMatch) {
      const { password, ...result } = this.user;
      return result;
    }

    return null;
  }

  async login(user: User) {
    const payload = { username: user.username, sub: user.user_id };
    return {
      access_token: this.jwtService.sign(payload)
    }
  }
}

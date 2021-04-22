import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { UsersService } from './users/users.service';
import { AuthService } from './auth/auth.service';
import { AppService } from './app.service';
import { User } from './model/User';

@Controller()
export class AppController {
  constructor(
    private appService: AppService,
    private usersService: UsersService,
    private authService: AuthService
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  login(@Request() req) {
    return req.user;
   //return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('auth/create')
  create(@Request() req) {
    //return this.userService.createUser(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('auth/update')
  update(@Request() req) {
    //return this.userService.updateUser(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('auth/delete')
  delete(@Request() req) {
    //return this.userService.deleteUser(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
 
  @Get('user') 
  findUser(): User | string {
    return this.usersService.findUser('mojombo');
  }  

  @Get()
  sayHello(): string {
    return this.appService.getHello();
  }

}

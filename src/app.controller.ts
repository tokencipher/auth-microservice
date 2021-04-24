import { Controller, Get, Request, Put, Delete, Post, UseGuards } from '@nestjs/common';
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
    //return req.user;
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('auth/create')
  create(@Request() req) {
    //return req.body
    this.usersService.createUser(req.body).subscribe(() => console.log('User creation request initiated!'));
  }

  @UseGuards(JwtAuthGuard)
  @Put('auth/update')
  update(@Request() req) {
    this.usersService.updateUser(req.body.user_id, req.body).subscribe(() => console.log('User update request initiated!'));
  }

  @UseGuards(JwtAuthGuard)
  @Delete('auth/delete')
  delete(@Request() req) {
    this.usersService.deleteUser(req.body.user_id).subscribe(() => console.log('Delete user request initiated!'));
  }
 
  /*
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
  */

}

import { Controller, Get, Request, Param, Put, Delete, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { UsersService } from './users/users.service';
import { AuthService } from './auth/auth.service';
import { AppService } from './app.service';
import { User } from './model/User';

@Controller('api')
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
    return `${req.body.username} has successfully been created!`;
  }

  @UseGuards(JwtAuthGuard)
  @Put('auth/update/:id')
  update(@Request() req, @Param() param) {
    this.usersService.updateUser(param.id, req.body).subscribe(() => console.log('User update request initiated!'));
    return `User with user id ${param.id} has been successfully updated!`;
  }

  @UseGuards(JwtAuthGuard)
  @Delete('auth/delete/:id')
  delete(@Request() req, @Param() param) {
    this.usersService.deleteUser(param.id).subscribe(() => console.log('Delete user request initiated!'));
    return `User with user id ${param.id} has been successfully deleted!`
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

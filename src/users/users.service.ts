import { Injectable, HttpService } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AxiosResponse } from 'axios';
import { User } from '../model/user';

@Injectable()
export class UsersService {
  private users: User[];
  private usersAPI: string = 'http://localhost:3080/api';

  constructor(private httpService: HttpService) {}
  
  refresh() {
    this.getUsers().subscribe((response) => this.users = response.data);
  }

  findUser(username: string): User | string {
    this.refresh();
    let user = this.users.find(user => user.username === username);
    return (user ? user : 'User not found\n');
  }
  
  getUsers(): Observable<AxiosResponse<User[]>> {
    return this.httpService.get(`${this.usersAPI}/users`);
  }
  
  /*
  findUser(username: string): Observable<AxiosResponse<User>> {
    return this.httpService.get(`${this.usersAPI}/user/${username}`);
  }
  */

  createUser(user: User): Observable<AxiosResponse> {
    return this.httpService.post(`${this.usersAPI}/user`, {user});
  }  

  updateUser(userID: number, user: Partial<User>): Observable<AxiosResponse> {
    return this.httpService.patch(`${this.usersAPI}/user/${userID}`, {user});
  }

  deleteUser(userID: number): Observable<AxiosResponse> {
    return this.httpService.delete(`${this.usersAPI}/user/${userID}`);
  }
}

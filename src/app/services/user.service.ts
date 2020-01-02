import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  username: string;
  constructor() { }

  getUsername(): string{
    return this.username;
  }

  setUsername(username:string){
    this.username = username;
  }

  isUserNameSet(): boolean {
    return !!this.username;
  }
}

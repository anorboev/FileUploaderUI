import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private userService: UserService
  ) {}

  title = 'FileUploaderUi';
  isUserNameSet: boolean;

  ngOnInit() {     
    this.usernameSetted();
  }

  usernameSetted(){
    this.isUserNameSet = this.userService.isUserNameSet();
  }
}

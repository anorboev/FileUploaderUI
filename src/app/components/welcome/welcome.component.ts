import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  @Output() usernameSetted = new EventEmitter();
  form: FormGroup;

  constructor(private userService: UserService, private fb: FormBuilder) { 
    this.form = this.fb.group({
      name: ['', [
        Validators.required,
        Validators.maxLength(50)
      ]]      
    })
  }
  
  get name() { return this.form.get('name'); }

  ngOnInit() {
    
  }
  saveUsername(){
    if(this.form.valid){
      this.userService.setUsername(this.form.value.name);
      this.usernameSetted.emit();
    }
    
    
  }


}

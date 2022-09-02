import { Component, OnInit } from '@angular/core';
import {FormBuilder,Validator, Validators} from '@angular/forms';
import {AuthService} from './../services/auth.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  validEmail: boolean = false;
  invalidEmail: boolean = false;
  passwordRegEx = /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/;;
  public emailSignupForm = this.fb.group({
    fullName: [''],
    email: [''],
    password: [''],
    phone: [''],
    website: ['',[
      Validators.required,
      Validators.pattern(this.passwordRegEx)
    ]]
  });

  get website(): any{
    return this.emailSignupForm.get('website');
  }

  constructor(private fb: FormBuilder,private auth: AuthService) { }

  ngOnInit(): void {
  }

  emailSignup(): void{
    this.auth.emailSignup(this.emailSignupForm.value);
  }

  isUserAlreadyExist(input: any): void{
    let check = this.auth.isUserAlreadyExist(input.value);
    check.then((response: any)=>{
      if(response.length == 1){
        this.emailSignupForm.get('email')?.setErrors({
          invalid: true,
        });
        this.validEmail = false;
        this.invalidEmail = true;
      }
      else{
        this.validEmail = true;
        this.invalidEmail = false;
      }
      
      
    })
  }

}

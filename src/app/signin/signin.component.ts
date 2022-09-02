import {Component,OnInit} from '@angular/core';
import {FormBuilder,Validator} from '@angular/forms';
import {AuthService} from './../services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  public emailSigninForm = this.fb.group({
    email: [''],
    password: [''],
  });

  constructor(private fb: FormBuilder,private auth: AuthService) {}

  ngOnInit(): void {
  }

  emailSignin(): void {
    this.auth.emailSignIn(this.emailSigninForm.value);
  }


}

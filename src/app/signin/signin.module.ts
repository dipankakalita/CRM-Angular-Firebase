import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SigninRoutingModule } from './signin-routing.module';
import {SigninComponent} from './signin.component';
import {AllModule} from './../modules/all.module';


@NgModule({
  declarations: [
    SigninComponent
  ],
  imports: [
    CommonModule,
    SigninRoutingModule,
    AllModule
  ]
})
export class SigninModule { }

import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FirebaseModule} from './firebase.module';
import {MaterialModule} from './material.module';
import {ReactiveFormsModule} from '@angular/forms';

const all = [
  FlexLayoutModule,
  FirebaseModule,
  MaterialModule,
  ReactiveFormsModule
]
@NgModule({
  declarations: [],
  imports: [ all ],
  exports: [ all ]
})
export class AllModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';

const routes: Routes = [
  { 
    path: '',
    component: ProfileComponent,
    children: [
      {path: 'customers',loadChildren: () => import('../profile-data/customer/customer.module').then(m => m.CustomerModule)}
    ]
  }, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }

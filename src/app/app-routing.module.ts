import {NgModule} from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import {AngularFireAuthGuard} from '@angular/fire/compat/auth-guard';

const routes: Routes = [
  { path: '', loadChildren: () => import('./signup/signup.module').then(m => m.SignupModule) },
  {path: 'profile',loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule),canActivate: [AngularFireAuthGuard] },
  { path: 'signin', loadChildren: () => import('./signin/signin.module').then(m => m.SigninModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

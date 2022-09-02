import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {Router} from '@angular/router';
import Swal from 'sweetalert2'
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private cookieService: CookieService, private router: Router,private auth: AngularFireAuth,private firestore: AngularFirestore) {
    // check auth state
    this.checkAuthState();
    // this.sweetAlert();
  }

  emailSignup(formdata: any): void{
    this.auth
      .createUserWithEmailAndPassword(formdata.email,formdata.password)
      .then((result) => {
        console.warn('You have been successfully registered!');
        // // console.log(result.user);
        // console.log(result);
        const userId = result.user?.uid;
        const userData = {
          fullname: formdata.fullName,
          phone: formdata.phone,
          website: formdata.website
        };
        this.storeUserInfo(userId,userData);
      })
      .catch((error) => {
        console.warn(error.message);
        console.log(error);
        
      });
  }

  private storeUserInfo(userId: any,userData: any): void{
    this.firestore.collection("users").doc(userId).set(userData);
  }

  checkAuthState(): void{
    this.auth.authState.subscribe((res:any)=>{
      if(res!=null){
        if(res.emailVerified){
          this.cookieService.set('userId',res.uid);
          this.router.navigateByUrl("/profile/customers")
        }else{
          res.sendEmailVerification().then(()=>{
            this.sweetAlert("error","Verification Required !","You have to verify your email id, check email for verification link.");
          });
        }
      }
      else{
        this.router.navigateByUrl("/signin")
      }
      
    })
  }

  signOut(): void{
    this.auth.signOut().then(()=>{
      console.log("Sign out success");
      
    })
  }

  emailSignIn(formdata: any): void{
    console.log(formdata);
    
    this.auth.signInWithEmailAndPassword(formdata.email,formdata.password);
  }

  // check email already exist
  isUserAlreadyExist(email: any): any{
    return this.auth.fetchSignInMethodsForEmail(email);
  }

  sweetAlert(icon:any,title: any, text: any): void{
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      confirmButtonText: 'Done'
    })
  }
}

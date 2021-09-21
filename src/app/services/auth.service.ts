import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Auth} from 'firebase/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  auth: Auth;
  userData:any;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,  
    public ngZone: NgZone 
  ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user') as string);
      } else {
        localStorage.removeItem('user');
        JSON.parse(localStorage.getItem('user') as string);
      }
    })
  }

  logIn(email:string, password:string){
    this.afAuth.signInWithEmailAndPassword(email, password).then((result) => {
      this.ngZone.run(() => {
        this.router.navigate(['admin']);
      });
      this.SetUserData(result.user);
    }).catch((error) => {
      window.alert(error.message)
    });
  }

  signUp(email:string,password:string){
    this.afAuth.createUserWithEmailAndPassword(email, password).then((result) => {
      this.SetUserData(result.user);
    }).catch((error) => {
      window.alert(error.message)
    });
  }

  isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user') as string);
    return (user !== null) ? true : false;
  }

  SetUserData(user:any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: any = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    return userRef.set(userData, {
      merge: true
    })
  }
}

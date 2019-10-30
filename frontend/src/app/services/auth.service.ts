import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: Observable<firebase.User>;
  constructor(public afAuth: AngularFireAuth, private router: Router) {
    this.user = afAuth.authState;
  }

  getUser(): Observable<firebase.User> {
    return this.user;
  }

  isAuth(): Observable<boolean> {
    return this.user.pipe(map(u => !!u));
  }

  register(value: { email: string; password: string }) {
    return new Promise<any>((resolve, reject) => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(value.email, value.password)
        .then(
          res => {
            resolve(res);
            this.router.navigateByUrl('/presence');
          },
          err => reject(err)
        );
    });
  }

  login(email: string, password: string) {
    this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Success!', value);
        this.router.navigateByUrl('/presence');
      })
      .catch(err => {
        alert(err.message);
      });
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}

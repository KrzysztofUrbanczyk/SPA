import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import { ToastrController } from 'ng2-toastr-notifications';

interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
}

@Injectable()
export class AuthService {

  user: Observable<User>;

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router,
              private toastCtrl: ToastrController) {

    this.user = this.afAuth.authState
      .switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return Observable.of(null);
        }
      });
  }

  signup(email: string, password: string, displayName: string, photoURL: string) {
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        const data: User = {
          uid: user.uid,
          email: user.email,
          displayName: displayName,
          photoURL: photoURL
        };

        return this.afs.doc<User>(`users/${user.uid}`).set(data);
      })
      .catch(error => {
        this.handleError(error);
        return false;
      });
  }

  emailLogin(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  twitterLogin() {
    const provider = new firebase.auth.TwitterAuthProvider();
    return this.oAuthLogin(provider);
  }

  facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider();
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.updateUserData(credential.user);
        this.router.navigateByUrl('/pages');
      });
  }

  public updateUserData(user) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    };
    return this.afs.doc<User>(`users/${user.uid}`).set(data);
  }

  public handleError(error) {
  }

  logout() {
    this.afAuth.auth.signOut().then(() => {
      this.toastCtrl.show({type: 'success', title: 'Success', message: 'Pomyślnie wylogowano'});
      this.router.navigateByUrl('/login');
    });
  }
}

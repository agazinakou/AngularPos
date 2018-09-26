import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import * as firebase from 'firebase';
import 'firebase/firestore';
import 'rxjs/add/operator/map';

import { auth } from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from '../../interface/User';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private _DB: any;
  user: Observable<User>;

  uid: any;

  constructor(public http: HttpClient,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore, ) {
    this._DB = firebase.firestore();
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          console.log(user);
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
        } else {
          return of(null)
        }
      })
    );
  }



  googleLogin() {
    const provider = new auth.GoogleAuthProvider()
    return this.oAuthLogin(provider);
  }

  facebookLogin() {
    const provider = new auth.FacebookAuthProvider()
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        console.log(credential);
        this.updateUserData(credential.user);
      })
  }

  loginUser(email: string, password: string): Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password).then((credential) => {

      return new Promise((resolve, reject) => {
        var cityRef = this._DB.collection('users').doc(credential.user.uid);
        var getDoc = cityRef.get()
          .then(doc => {
            if (!doc.exists) {
              console.log('No such document!');
            } else {
              resolve(doc.data());
            }
          })
          .catch(err => {
            reject(err);
            console.log('Error getting document', err);
          });
      });
    });
  }

  registerUser(user: any, password: string): Promise<any> {
    return this.afAuth.auth.createUserWithEmailAndPassword(user.email, password).then((credential) => {
      this.updateUser(credential.user, user);
    });
  }

  private updateUser(cred, user) {
    // Sets user data to firestore on login

    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${cred.uid}`);

    const data: User = {
      name: cred.uid,
      photoUrl: cred.uid,
      phoneNumber: cred.uid,
      email: cred.uid,
    }



    return userRef.set(data, { merge: true })

  }

  private updateUserData(user) {
    // Sets user data to firestore on login

    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);

    const data: User = {
      name: user.uid,
      photoUrl: user.uid,
      phoneNumber: user.uid,
      email: user.uid,  
    }



    return userRef.set(data, { merge: true })

  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
    });
  }
}

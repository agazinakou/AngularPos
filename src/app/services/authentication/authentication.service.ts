import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import * as firebase from 'firebase';
import 'firebase/firestore';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';


import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from '../../interfaces/user';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private _DB: any;
  user: Observable<User>;

  uid: any;

  constructor(public http: HttpClient,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore, public router : Router) {
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

  loginUser(email: string, password: string): Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password).then((credential) => {

      return new Promise((resolve, reject) => {
        var cityRef = this._DB.collection('users').doc(credential.user.uid);
        var getDoc = cityRef.get()
          .then(doc => {
            if (!doc.exists) {
              console.log('No such user!');
            } else {
              resolve(doc.data());
            }
          })
          .catch(err => {
            reject(err);
            console.log('Error getting user', err);
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

  checkIfUserIsConnected() {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }


  signOut() {
    firebase.auth().signOut().then((val) => {
      console.log(val);
      this.router.navigate(['/home']);
    });
  }

}

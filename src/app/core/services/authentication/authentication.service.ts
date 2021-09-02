import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';


import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { User } from '../../models';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  user: Observable<User>;

  uid: any;

  constructor(public http: HttpClient, private afAuth: AngularFireAuth,
    private afs: AngularFirestore, public router : Router) {
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

    return this.afAuth.signInWithEmailAndPassword(email, password).then((credential) => {
      console.log('credential', credential);
      return new Promise((resolve, reject) => {
        this.afs.collection('users').doc(credential.user.uid).ref.get().then(function (doc) {
          if (doc.exists) {
            localStorage.setItem('user', JSON.stringify(doc.data()));
            resolve(doc.data());
          } else {
            console.log("There is no document!");
            reject('There is no document!');
          }
        }).catch(function (error) {
            reject(error);
            console.log("There was an error getting your document:", error);
        });
      }
      );
    });
  }

  getUserData(){
    var local = localStorage.getItem('user');
    return JSON.parse(local);
  }

  registerUser(user: any, password: string): Promise<any> {
    return this.afAuth.createUserWithEmailAndPassword(user.email, password).then((credential) => {
      this.updateUser(credential.user, user);
    });
  }

  private updateUser(cred, user) {
    // Sets user data to firestore on login

    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${cred.uid}`);

    const data: User = {
      name: cred.uid,
      photoUrl: cred.uid,
      phoneNumber: cred.uid,
      email: cred.uid,
      updated_at: new Date()
    }

    return userRef.set(data, { merge: true })

  }

  checkIfUserIsConnected() {
    return new Promise((resolve, reject) => {
      this.afAuth.onAuthStateChanged(function(user) {
        if (user) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }


  signOut() {
    this.afAuth.signOut().then((val) => {
      console.log(val);
      this.router.navigate(['/home']);
    });
  }

}

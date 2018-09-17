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
import { Products } from '../interface/products';


@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  private _DB: any;
  user: Observable<Products>;

  uid: any;

  constructor(public http: HttpClient,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,) {
    this._DB = firebase.firestore();
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          console.log(user);
          return this.afs.doc<Products>(`users/${user.uid}`).valueChanges()
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
    /*return this.facebook.login(['email', 'public_profile']).then(res => {
      const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
      return firebase.auth().signInWithCredential(facebookCredential).then(credential => {
        this.updateUserData(credential.user)
      });
    })*/
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

    const data: Products = {
      name: cred.uid,
    }



    return userRef.set(data, { merge: true })

  }

  private updateUserData(user) {
    // Sets user data to firestore on login

    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);

    const data: Products = {
      name: user.uid
    }



    return userRef.set(data, { merge: true })

  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
    });
  }

  getDocuments(collectionObj: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this._DB.collection(collectionObj).get().then((querySnapshot) => {

        let obj: any = [];

        querySnapshot
          .forEach((doc: any) => {
            obj.push({
              data: doc.id,
            });
          });

        resolve(obj);
      })
        .catch((error: any) => {
          reject(error);
        });
    });
  }


  addDocument(collectionObj: string,
    dataObj: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this._DB.collection(collectionObj).add(dataObj).then((obj: any) => {
        resolve(obj);
      })
        .catch((error: any) => {
          reject(error);
        });
    });
  }


  deleteDocument(collectionObj: string,
    docID: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this._DB
        .collection(collectionObj)
        .doc(docID)
        .delete()
        .then((obj: any) => {
          resolve(obj);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }


  updateDocument(collectionObj: string,
    docID: string,
    dataObj: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this._DB
        .collection(collectionObj)
        .doc(docID)
        .update(dataObj)
        .then((obj: any) => {
          resolve(obj);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  getStudentsCourse(collectionObj: string, user: string, language: string): Promise<any> {
    console.log(collectionObj + ' ' + user + ' ' + language);
    return new Promise((resolve, reject) => {
      this._DB.collection(collectionObj).doc(user).collection(language).get().then((querySnapshot) => {

        let obj: any = [];

        querySnapshot
          .forEach((doc: any) => {
            obj.push({
              data: doc.data(),
            });
          });

        resolve(obj);

      })
        .catch((error: any) => {
          reject(error);
        });
    });
  }
}

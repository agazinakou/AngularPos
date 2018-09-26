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

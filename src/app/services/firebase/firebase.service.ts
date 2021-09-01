import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import * as firebase from 'firebase/compat';
import undefined from 'firebase/compat/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Product } from '../../interfaces/product';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private _DB: any;
  user: Observable<Product>;

  uid: any;

  constructor(public http: HttpClient,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,) {
    this._DB = firebase.firestore();
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          console.log(user);
          return this.afs.doc<Product>(`users/${user.uid}`).valueChanges()
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
              id: doc.id,
              data: doc.data()
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

}

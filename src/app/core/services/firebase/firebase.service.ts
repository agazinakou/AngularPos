import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../../models';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  user: Observable<User>;

  constructor(public http: HttpClient,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore) {
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

  getDocuments(name: string): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        var res = this.afs.collection(name).valueChanges();
        resolve(res);
      } catch (error) {
        reject(error);
      }
    });
  }


  addDocument(collectionObj: string,
    dataObj: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.afs.collection(collectionObj).add(dataObj).then((obj: any) => {
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
      this.afs
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
      this.afs
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

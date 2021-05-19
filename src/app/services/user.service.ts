import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { User } from '../shared/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  usersCollection: AngularFirestoreCollection<any>;
  userDoc: void = null;
  constructor(private firestore: AngularFirestore, public auth: AngularFireAuth) {
    this.usersCollection = this.firestore.collection('users');
   }

  getUsers(){
    return this.usersCollection.valueChanges({ idField: 'id'});
  }
  getCurrentUserInfo(){
    this.getCurrentUser().then(userID => {
      this.usersCollection.doc(userID).valueChanges()
       .subscribe(userFireStoreDoc => {
         this.userDoc = userFireStoreDoc;
       })
    }).catch(nullID => {
      this.userDoc = null;
    })
  }
  getCurrentUser(): Promise<string> {
    var promise = new Promise<string>((resolve, reject) => {
      this.auth.onAuthStateChanged(returnedUser => {
        if (returnedUser) {
          this.userDoc =  resolve(returnedUser.uid)
          resolve(returnedUser.uid);
        } else {
          reject(null);
        }
      });
    })
    return promise
  }
}

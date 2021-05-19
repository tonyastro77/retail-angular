import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class LeadershipService {
  leadershipCollection: AngularFirestoreCollection<any>;
  constructor(private firestore: AngularFirestore) {
    this.leadershipCollection = this.firestore.collection('leadership');
  }
  getItems(){
    return this.leadershipCollection.valueChanges({ idField: 'id'});
  }
}

import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Promotion } from '../shared/promotion';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {
  promotionsCollection: AngularFirestoreCollection<Promotion>;

  constructor(private firestore: AngularFirestore) {
    this.promotionsCollection = this.firestore.collection('promotions');
  }

  getPromotions(): Observable<Promotion[]> {
    return this.promotionsCollection.valueChanges({ idField: 'id'});
  }

}

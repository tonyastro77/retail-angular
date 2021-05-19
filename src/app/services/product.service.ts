import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Product } from '../shared/product';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productsCollection: AngularFirestoreCollection<any>;
  products: Observable<any[]>;

  constructor(private http: HttpClient, private firestore: AngularFirestore) {
    this.productsCollection = this.firestore.collection('products');
  }

  getProducts(){
    return this.productsCollection.valueChanges({ idField: 'id'});
  }
  getProductsSortedByName(){
    return this.firestore.collection('products', ref => ref.orderBy('name')).valueChanges({ idField: 'id'});
  }
  getProduct(id: string): Observable<Product> {
    return this.productsCollection.doc(id).valueChanges({ idField: 'id'}).pipe(item => {
      return item;
    });
  }
  getFeaturedProduct(): Observable<any>{
    return this.firestore.collection('products', ref => ref.where('featured', '==', true)).valueChanges();
  }

  getProductIds(): Observable<number[] | any> {
    return this.getProducts().pipe(map(products => products.map(product => product.id)));
  }
}

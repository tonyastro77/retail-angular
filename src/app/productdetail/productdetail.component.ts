import { Component, OnInit, Inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Comment } from '../shared/comment';
import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service';
import { switchMap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrls: ['./productdetail.component.scss']
})
export class ProductdetailComponent implements OnInit {
  product: any;
  productIds: string[];
  commentArray: Comment[];
  prev: string;
  next: string;
  comments: Comment  = {author: '', comment: '', date: (new Date()).toString(), rating: 5};

  userDoc: any = null;

  constructor(private productservice: ProductService,
    private userService: UserService,
    private route: ActivatedRoute,
    private location: Location,
    public auth: AngularFireAuth,
    private firestore: AngularFirestore,
    @Inject('BaseURL') private BaseURL) {
      this.getCurrentUserInfo();
    }

  ngOnInit() {
    this.getCurrentUserInfo();
    this.productservice.getProducts()
     .subscribe(products => this.product = products);

    this.productservice.getProductIds()
     .subscribe((productIds) => this.productIds = productIds);

    this.route.params
     .pipe(switchMap((params: Params) =>  this.productservice.getProduct(params['id'])))
     .subscribe(product => {this.product = product; this.setPrevNext(product.id); this.getComments(product.id)});
  }
  getCurrentUserInfo(){
    this.userService.getCurrentUser().then(userID => {
      this.userService.usersCollection.doc(userID).valueChanges()
       .subscribe(userFireStoreDoc => {
         this.comments.author = userFireStoreDoc.name;
       })
    }).catch(nullID => {
      this.userDoc = null;
    })
  }
  getComments(productId: string){
    this.productservice.getProduct(productId)
    .subscribe((item) => this.commentArray = item.comments);
  }
  setPrevNext(productId: string) {
    const index = this.productIds.indexOf(productId);
    this.prev = this.productIds[(this.productIds.length + index - 1) % this.productIds.length];
    this.next = this.productIds[(this.productIds.length + index + 1) % this.productIds.length];
  }
  goBack(): void {
    this.location.back();
  }
  onComment(){
    this.productservice.productsCollection.doc(this.product.id).update({
        'comments' : this.commentArray.concat([this.comments])
      });
    this.comments = {author: this.comments.author, comment: '', date: (new Date()).toString(), rating: 5}
  }

}

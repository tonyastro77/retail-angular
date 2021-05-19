import { Component, OnInit, Inject } from '@angular/core';
import { Product } from '../shared/product';
import { ProductService } from '../services/product.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  product: Product;
  promotion: Promotion;

  constructor(private productservice: ProductService,
    private promotionservice: PromotionService,
    @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.productservice.getFeaturedProduct()
     .subscribe(product => this.product = product[0]);
    this.promotionservice.getFeaturedPromotion()
     .subscribe(promotion => this.promotion = promotion);
  }

}

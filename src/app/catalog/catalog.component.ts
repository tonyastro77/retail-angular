import { Component, OnInit, Inject } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {

  products: any[];

  constructor(private productService: ProductService,
    @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.productService.getProductsSortedByName()
    .subscribe(products => this.products = products);
  }
}

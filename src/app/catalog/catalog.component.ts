import { Component, OnInit, Inject } from '@angular/core';
import { Product } from '../shared/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {

  products: Product[];

  constructor(private productService: ProductService,
    @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.productService.getProducts()
    .subscribe(products => this.products = products);
  }
}

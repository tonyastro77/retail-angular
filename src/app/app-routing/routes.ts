import { Routes } from '@angular/router';

import { CatalogComponent } from '../catalog/catalog.component';
import { ProductdetailComponent } from '../productdetail/productdetail.component';
import { HomeComponent } from '../home/home.component';
import { AboutComponent } from '../about/about.component';
import { ContactComponent } from '../contact/contact.component';

export const routes: Routes = [
  { path: 'home',  component: HomeComponent },
  { path: 'about',  component: AboutComponent },
  { path: 'catalog',  component: CatalogComponent },
  { path: 'contact',  component: ContactComponent },
  { path: 'productdetail/:id',  component: ProductdetailComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

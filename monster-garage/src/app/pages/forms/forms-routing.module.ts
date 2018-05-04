import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormsComponent } from './forms.component';

import { UserProfileComponent } from './user-profile/user-profile.component';

import { OrderProductsComponent } from './order-products/order-products.component';
import { SmartTableComponent } from './order-list/smart-table/smart-table.component';


const routes: Routes = [{
  path: '',
  component: FormsComponent,

  children: [
    {
      path: 'profile',
      component: UserProfileComponent,
    },
    {
      path: 'order-product',
      component: OrderProductsComponent,
    },
    {
      path: 'order-list',
      component: SmartTableComponent,
    }
  ]
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class FormsRoutingModule {

}

export const routedComponents = [
  FormsComponent,
  UserProfileComponent
];

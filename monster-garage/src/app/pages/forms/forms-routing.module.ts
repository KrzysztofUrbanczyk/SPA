import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormsComponent } from './forms.component';
import { OrderComponent } from './order/order.component';
import {UserProfileComponent} from './user-profile/user-profile.component';

const routes: Routes = [{
  path: '',
  component: FormsComponent,
  children: [{
    path: 'order',
    component: OrderComponent
  },
  {
    path: 'profile',
    component: UserProfileComponent,
  }],

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
  OrderComponent,
  UserProfileComponent
];

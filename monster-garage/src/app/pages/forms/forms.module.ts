import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { FormsRoutingModule, routedComponents } from './forms-routing.module';
import { OrderProductsComponent } from './order-products/order-products.component';
import { OrderListModule } from './order-list/order-list.module';

@NgModule({
  imports: [
    ThemeModule,
    FormsRoutingModule,
    OrderListModule,
  ],
  declarations: [
    ...routedComponents,
    OrderProductsComponent,
  ],
})
export class FormsModule {
}

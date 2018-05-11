import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../../@theme/theme.module';
import { OrderListRoutingModule, routedComponents } from './order-list.routing';
import { OrderListService } from './order-list.service';

@NgModule({
  imports: [
    ThemeModule,
    OrderListRoutingModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    OrderListService,
  ],
})
export class OrderListModule {
}

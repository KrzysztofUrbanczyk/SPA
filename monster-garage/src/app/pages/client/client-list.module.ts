import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { ClientListRoutingModule, routedComponents } from './client-list.routing';
import { ClientListService } from './client-list.service';

@NgModule({
  imports: [
    ThemeModule,
    ClientListRoutingModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    ClientListService,
  ],
})
export class ClientListModule { }

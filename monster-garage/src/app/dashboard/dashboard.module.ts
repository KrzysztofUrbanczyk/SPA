import { NgModule } from '@angular/core';

import { DashboardComponent } from './dashboard.component';
import { ThemeModule } from '../@theme/theme.module';

@NgModule({
  imports: [
    ThemeModule,
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule { }

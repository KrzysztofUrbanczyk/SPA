import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { ChartByStatusComponent } from './charts/chart-by-status/chart-by-status.component';

@NgModule({
  imports: [
    ThemeModule,
  ],
  declarations: [
    DashboardComponent,
    ChartByStatusComponent,
  ],
})
export class DashboardModule {
}

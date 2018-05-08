import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { ChartByStatusComponent } from './charts/chart-by-status/chart-by-status.component';
import { ChartByDateComponent } from './charts/chart-by-date/chart-by-date.component';

@NgModule({
  imports: [
    ThemeModule,
  ],
  declarations: [
    DashboardComponent,
    ChartByStatusComponent,
    ChartByDateComponent,
  ],
})
export class DashboardModule {
}

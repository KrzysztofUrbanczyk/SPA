import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './account/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { RegisterComponent } from './account/register/register.component';
import { CoreModule } from './core/core.module';
import { AuthGuard } from './core/auth.guard';
import { ThemeModule } from './@theme/theme.module';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { LogoutComponent } from './account/logout/logout.component';
import { NotifyService } from './core/notify.service';
import { HttpClientModule } from '@angular/common/http';
import { EmailService } from './core/email.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    CoreModule,
    SimpleNotificationsModule.forRoot(),
    ThemeModule.forRoot(),
    HttpClientModule
  ],
  providers: [AuthGuard, NotifyService, EmailService],
  bootstrap: [AppComponent]
})
export class AppModule {
}

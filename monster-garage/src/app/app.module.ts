import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {MenuComponent} from './menu/menu.component';
import {ContentComponent} from './content/content.component';
import {LoginComponent} from './login/login.component';
import {UserComponent} from './user/user.component';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule} from "@angular/forms";
import {AngularFireModule} from 'angularfire2';

import {environment} from '../environments/environment';
import { RegisterComponent } from './register/register.component';
import { CoreModule } from './core/core.module';

@NgModule({
    declarations: [
        AppComponent,
        MenuComponent,
        ContentComponent,
        LoginComponent,
        UserComponent,
        RegisterComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        AngularFireModule.initializeApp(environment.firebase),
        CoreModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}

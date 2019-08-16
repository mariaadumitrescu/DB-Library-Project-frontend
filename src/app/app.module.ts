import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';

import { BookService} from './services/book.service';
import { UserService} from './services/user.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { GridBooksComponent } from './pages/grid-books/grid-books.component';
import {User} from './models/user';
import { LoginPageComponent } from './pages/login-page/login-page.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminPageComponent,
    RegisterPageComponent,
    DashboardPageComponent,
    GridBooksComponent,
    LoginPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [BookService,
              UserService],
  bootstrap: [AppComponent]
})
export class AppModule {
}

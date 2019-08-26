import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import { BookService} from './services/book.service';
import { UserService} from './services/user.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AdminPageComponent} from './pages/admin-page/admin-page.component';
import {RegisterPageComponent} from './pages/register-page/register-page.component';
import {DashboardPageComponent} from './pages/dashboard-page/dashboard-page.component';
import {GridBooksComponent} from './pages/grid-books/grid-books.component';
import {UploadImageService} from './services/uploadImage.service';
import {GrdFilterPipe} from './grd-fiter.pipe';
import {NgxPaginationModule} from 'ngx-pagination';

import {ImageUploadModule} from 'ng2-imageupload';
import { UploadBookComponent } from './upload-book/upload-book.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { BooksComponent } from './pages/dashboard-page/books/books.component';
import { AdminDashboardBooksTableComponent } from './admin-dashboard-books-table/admin-dashboard-books-table.component';
import {AuthenticationService} from './services/autentication.service';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {JwtInterceptor} from './helpers/jwt.interceptor';
import {ErrorInterceptor} from './helpers/error.interceptor';
import {BookGridComponent} from './pages/grid-books/book-grid-icon/book-grid-icon.component';
import {BookPageComponent} from './pages/book-page/book-page.component';



@NgModule({
  declarations: [
    AppComponent,
    AdminPageComponent,
    RegisterPageComponent,
    DashboardPageComponent,
    GridBooksComponent,
    GrdFilterPipe,
    GridBooksComponent,
    UploadBookComponent,
    BooksComponent,
    HomeComponent,
    LoginComponent,
    AdminDashboardBooksTableComponent,
    BookGridComponent,
    RegisterPageComponent,
    BookPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    NgxPaginationModule,
    ImageUploadModule,
    ReactiveFormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [BookService,
    UserService,
    UploadImageService,
    AuthenticationService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

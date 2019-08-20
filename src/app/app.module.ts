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
import {HttpClientModule} from '@angular/common/http';


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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    NgxPaginationModule,
    ImageUploadModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [BookService,
    UserService,
    UploadImageService],
  bootstrap: [AppComponent]
})
export class AppModule {
}

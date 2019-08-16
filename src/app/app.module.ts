import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';

import { BookService} from './services/book.service';
import { UserService} from './services/user.service';
import {FormsModule} from '@angular/forms';

import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { GridBooksComponent } from './pages/grid-books/grid-books.component';
import {UploadImageService} from './services/uploadImage.service';
import { UploadImageComponent } from './upload-image/upload-image.component';
import {GrdFilterPipe} from './grd-fiter.pipe';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    AdminPageComponent,
    RegisterPageComponent,
    DashboardPageComponent,
    GridBooksComponent,
    UploadImageComponent,
    GrdFilterPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule
  ],
  providers: [BookService,
              UserService,
    UploadImageService],
  bootstrap: [AppComponent]
})
export class AppModule {
}

import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import { BookService} from './services/book.service';
import { UserService} from './services/user.service';
import { ForbiddenService} from './services/forbidden.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AdminPageComponent} from './pages/admin-page/admin-page.component';
import {DashboardPageComponent} from './pages/dashboard-page/dashboard-page.component';
import {GridBooksComponent} from './pages/grid-books/grid-books.component';
import {UploadImageService} from './services/uploadImage.service';
import {GrdFilterPipe} from './grd-fiter.pipe';
import {NgxPaginationModule} from 'ngx-pagination';

import {ImageUploadModule} from 'ng2-imageupload';
import { UploadBookComponent } from './admin-dashboard-books-table/upload-book/upload-book.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { BooksComponent } from './pages/dashboard-page/books/books.component';
import { AdminDashboardBooksTableComponent } from './admin-dashboard-books-table/admin-dashboard-books-table.component';
import {AuthenticationService} from './services/autentication.service';
import {HomeComponent} from './home/home.component';
import {JwtInterceptor} from './helpers/jwt.interceptor';
import {ErrorInterceptor} from './helpers/error.interceptor';
import { ForbiddenComponent } from './pages/forbidden/forbidden.component';
import {DialogModule} from '@syncfusion/ej2-angular-popups';
import { DialogConfirmComponent } from './services/dialog-confirm/dialog-confirm.component';
import {ConfirmationDialogService} from './services/dialog-confirm/dialog-confirm.service';
import { NavbarComponent } from './navbar/navbar.component';
import { BookDetailsComponent } from './admin-dashboard-books-table/book-details/book-details.component';
import {BookPageComponent} from './pages/book-page/book-page.component';
import {UserBookService} from './services/userBook.service';
import {BsDropdownModule, ModalModule, TooltipModule} from 'ngx-bootstrap';
import { UsersDashboardComponent } from './admin-dashboard-books-table/users-dashboard/users-dashboard.component';
import {UserDetailsComponent} from './admin-dashboard-books-table/user-details/user-details.component';
import {BorrowedBooksComponent} from './pages/borrowed-books/borrowed-books.component';
import {BookGridComponent} from './pages/grid-books/book-grid-icon/book-grid-icon.component';
import {DialogBannedService} from './services/dialog-banned/dialog-banned.service';
import {DialogBannedComponent} from './services/dialog-banned/dialog-banned.component';
import {BorrowListComponent} from './pages/borrow/borrow-list/borrow-list.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
// import { PreferredGenresPageComponent } from './pages/preferred-genres-page/preferred-genres-page.component';


import {DialogEditProfileComponent} from './services/dialog-edit-profile/dialog-edit-profile.component';
import {DialogEditProfileService} from './services/dialog-edit-profile/dialog-edit-profile.service';
import {ImageCropperModule} from 'ngx-image-cropper';
import {DialogLoginComponent} from './services/dialog-login-profile/dialog-login.component';
import {DialogLoginService} from './services/dialog-login-profile/dialog-login.service';
import {DialogRegisterComponent} from './services/dialog-register-profile/dialog-register.component';
import {DialogRegisterService} from './services/dialog-register-profile/dialog-register.service';
import {DialogForgotPasswordComponent} from './services/dialog-forgot-password/dialog-forgot-password.component';
import {DialogForgotPasswordService} from './services/dialog-forgot-password/dialog-forgot-password.service';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { PreferredGenresPageComponent } from './pages/preferred-genres-page/preferred-genres-page.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminPageComponent,
    DashboardPageComponent,
    GridBooksComponent,
    GrdFilterPipe,
    GridBooksComponent,
    UploadBookComponent,
    BooksComponent,
    HomeComponent,
    AdminDashboardBooksTableComponent,
    BookGridComponent,
    ForbiddenComponent,
    DialogConfirmComponent,
    NavbarComponent,
    BookDetailsComponent,
    BookPageComponent,
    UsersDashboardComponent,
    UserDetailsComponent,
    BorrowedBooksComponent,
    DialogBannedComponent,
    BorrowListComponent,
    NotFoundPageComponent,
    PreferredGenresPageComponent,
    DialogEditProfileComponent,
    NotFoundPageComponent,
    DialogLoginComponent,
    DialogRegisterComponent,
    DialogForgotPasswordComponent,

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
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    DialogModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
    ImageCropperModule,
    DragDropModule,
    DropDownsModule
  ],
  providers: [BookService,
    ForbiddenService,
    UserService,
    ConfirmationDialogService,
    UploadImageService,
    AuthenticationService,
    UserBookService,
    DialogBannedService,
    DialogEditProfileService,
    DialogLoginService,
    DialogRegisterService,
    DialogForgotPasswordService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [ DialogConfirmComponent,DialogBannedComponent,DialogEditProfileComponent,DialogLoginComponent, DialogRegisterComponent,DialogForgotPasswordComponent ],
})
export class AppModule {
}
